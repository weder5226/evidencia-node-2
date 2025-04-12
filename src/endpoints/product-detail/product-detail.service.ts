import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { DuplicateException } from 'src/exception/duplicate.exception';
import { cleanNullFieldObj } from 'src/util/clean-null-field-obj';
import { CreateProductDetailDto } from './dto/body/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/body/update-product-detail.dto';

@Injectable()
export class ProductDetailService {
  constructor(private readonly db: DatabaseService) {}

  async getById(productId: number) {
    const productDet = await this.db.productDetail.findUnique({
      where: { productId },
      include: {
        product: {
          select: { name: true },
        },
      },
    });

    if (productDet == null)
      throw new NotFoundException('Catalog detail with the given ID does not exist');
    return productDet;
  }

  async getAllByIsHidden(page: number, size: number, isHidden: boolean) {
    const skip = (page - 1) * size;
    const take = size + 1;

    const productDetails = await this.db.productDetail.findMany({
      where: { isHidden },
      include: {
        product: {
          select: { name: true },
        },
      },
      omit: {
        isHidden: true,
      },
      orderBy: [{ product: { name: 'asc' } }, { productId: 'asc' }],
      skip,
      take,
    });

    const hasNext = productDetails.length > size;
    const hasPrevious = page > 1;
    const data = hasNext ? productDetails.slice(0, size) : productDetails;

    return { data, page, size, hasNext, hasPrevious };
  }

  async create(createProductDetailDto: CreateProductDetailDto) {
    const { productId } = createProductDetailDto;
    const product = await this.getAvailableNameByProductId(productId);

    const catalogProd = await this.db.productDetail.create({
      data: createProductDetailDto,
    });

    return { ...catalogProd, product };
  }

  async updateById(productId: number, updateProductDetailDto: UpdateProductDetailDto) {
    const data = cleanNullFieldObj(updateProductDetailDto);

    const catalogProd = await this.db.productDetail
      .update({
        where: { productId },
        data,
      })
      .catch((e) => {
        if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
          throw new NotFoundException('Catalog detail with the given ID does not exist');
        }
        throw e;
      });

    return catalogProd;
  }

  async deleteById(productId: number) {
    await this.db.productDetail.delete({ where: { productId } }).catch((e) => {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Catalog detail with the given ID does not exist');
      }
      throw e;
    });
  }

  private async getAvailableNameByProductId(productId: number) {
    const isExists = await this.db.productDetail.findUnique({
      where: { productId },
      select: { productId: true },
    });
    if (isExists != null) {
      throw new DuplicateException('A product detail with the given productId already exists');
    }

    const product = await this.db.product.findUnique({
      where: { id: productId },
      select: { name: true },
    });
    if (product == null) {
      throw new NotFoundException('Product with the given ID does not exist');
    }

    return product;
  }
}
