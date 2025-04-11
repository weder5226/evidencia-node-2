import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get Product By ID' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string) {
    return this.productService.getById(+id);
  }

  @ApiOperation({ summary: 'Get All Products' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllByHasStock() {
    return this.productService.getAllByHasStock();
  }

  @ApiOperation({ summary: 'Create Product' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Update Product By ID' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateById(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateById(+id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete Product By ID' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.productService.deleteById(+id);
  }
}
