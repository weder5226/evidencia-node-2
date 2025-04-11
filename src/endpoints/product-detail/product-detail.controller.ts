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
import { ProductDetailService } from './product-detail.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @ApiOperation({ summary: 'Get Catalog Product By ID' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string) {
    return this.productDetailService.getById(+id);
  }

  @ApiOperation({ summary: 'Get All Catalog Products' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllByIsHidden() {
    return this.productDetailService.getAllByIsHidden();
  }

  @ApiOperation({ summary: 'Create Catalog Detail' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.productDetailService.create(createProductDetailDto);
  }

  @ApiOperation({ summary: 'Update Catalog Detail By ID' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateById(@Param('id') id: string, @Body() updateProductDetailDto: UpdateProductDetailDto) {
    return this.productDetailService.updateById(+id, updateProductDetailDto);
  }

  @ApiOperation({ summary: 'Delete Catalog Detail By ID' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.productDetailService.deleteById(+id);
  }
}
