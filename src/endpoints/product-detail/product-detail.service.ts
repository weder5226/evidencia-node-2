import { Injectable } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductDetailService {
  constructor(private readonly database: DatabaseService) {}

  getById(id: number) {
    return `This action returns a #${id} productDetail`;
  }

  getAllByIsHidden() {
    return `This action returns all productDetail`;
  }

  create(createProductDetailDto: CreateProductDetailDto) {
    return 'This action adds a new productDetail';
  }

  updateById(id: number, updateProductDetailDto: UpdateProductDetailDto) {
    return `This action updates a #${id} productDetail`;
  }

  deleteById(id: number) {
    return `This action removes a #${id} productDetail`;
  }
}
