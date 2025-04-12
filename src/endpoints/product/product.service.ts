import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { DuplicateException } from 'src/exception/duplicate.exception';
import { cleanNullFieldObj } from 'src/util/clean-null-field-obj';
import { CreateProductDto } from './dto/body/create-product.dto';
import { UpdateProductDto } from './dto/body/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly db: DatabaseService) {}

  async getById(id: number) {
    const product = await this.db.product.findUnique({
      where: { id },
    });

    if (product == null) throw new NotFoundException('Product with the given ID does not exist');
    return product;
  }

  async getAllByHasStock(page: number, size: number, hasStock: boolean) {
    const skip = (page - 1) * size;
    const take = size + 1;

    const where: Prisma.ProductWhereInput = hasStock
      ? { quantityStock: { gt: 0 } }
      : { quantityStock: { equals: 0 } };

    const products = await this.db.product.findMany({
      where,
      orderBy: [{ name: 'asc' }, { id: 'asc' }],
      skip,
      take,
      omit: { version: true },
    });

    const hasNext = products.length > size;
    const hasPrevious = page > 1;
    const data = hasNext ? products.slice(0, size) : products;

    return { data, page, size, hasNext, hasPrevious };
  }

  async create(createProductDto: CreateProductDto) {
    const { name, quantityStock } = createProductDto;

    if (await this.existsByNameIgnoreCase(name)) {
      throw new DuplicateException('Name is already in use by another product');
    }

    return await this.db.product.create({
      data: { name, quantityStock },
    });
  }

  async updateById(id: number, updateProductDto: UpdateProductDto) {
    const { name, quantityStock } = cleanNullFieldObj(updateProductDto);

    const p = await this.db.product.findUnique({
      where: { id },
      select: { name: true, version: true },
    });

    if (p == null) {
      throw new NotFoundException('Product with the given ID does not exist');
    }
    if (name != null && name !== p.name && (await this.existsByNameIgnoreCase(name))) {
      throw new DuplicateException('New name is already in use by another product');
    }

    const product = await this.db.product
      .update({
        where: { id, version: p.version },
        data: { name, quantityStock, version: { increment: 1 } },
        omit: { version: true },
      })
      .catch((e) => {
        if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
          throw new ConflictException(
            'The product was modified by another process before completion, please try again',
          );
        }
        throw e;
      });

    return product;
  }

  async deleteById(id: number) {
    await this.db.product.delete({ where: { id } }).catch((e) => {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Product with the given ID does not exist');
      }
      throw e;
    });
  }

  private async existsByNameIgnoreCase(name: string) {
    const obj = await this.db.product.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
      select: { id: true },
    });

    return obj != null;
  }
}
