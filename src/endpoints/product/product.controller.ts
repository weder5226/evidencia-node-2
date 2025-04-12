import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PositiveIntPipe } from 'src/common/pipe/positive-int.pipe';
import { CreateProductDto } from './dto/body/create-product.dto';
import { UpdateProductDto } from './dto/body/update-product.dto';
import { GetAllProductDto } from './dto/query/get-all-product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get Product By ID' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', PositiveIntPipe) id: number) {
    return await this.productService.getById(id);
  }

  @ApiOperation({ summary: 'Get All Products' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllByHasStock(@Query() query: GetAllProductDto) {
    const { page = 1, size = 20, available = true } = query;
    return await this.productService.getAllByHasStock(page, size, available);
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
  async updateById(
    @Param('id', PositiveIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateById(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete Product By ID' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', PositiveIntPipe) id: number) {
    return await this.productService.deleteById(id);
  }
}
