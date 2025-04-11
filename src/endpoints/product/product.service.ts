import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly database: DatabaseService) {}

  getById(id: number) {
    return `This action returns a #${id} product`;
  }

  getAllByHasStock() {
    return 'This action gets all products';
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  updateById(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  deleteById(id: number) {
    return `This action removes a #${id} product`;
  }
}
