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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { PositiveIntPipe } from 'src/common/pipe/positive-int.pipe';
import { CreateProductDetailDto } from './dto/body/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/body/update-product-detail.dto';
import { GetAllProductDetailDto } from './dto/query/get-all-product-detail.dto';
import { ProductDetailService } from './product-detail.service';

@ApiBearerAuth()
@ApiTags('Catalog')
@UseGuards(AuthGuard)
@Controller('catalog')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @ApiOperation({ summary: 'Get Catalog Product By ID' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', PositiveIntPipe) id: number) {
    return await this.productDetailService.getById(id);
  }

  @ApiOperation({ summary: 'Get All Catalog Products' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllByIsHidden(@Query() query: GetAllProductDetailDto) {
    const { page = 1, size = 20, hidden = false } = query;
    return await this.productDetailService.getAllByIsHidden(page, size, hidden);
  }

  @ApiOperation({ summary: 'Create Catalog Detail' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return await this.productDetailService.create(createProductDetailDto);
  }

  @ApiOperation({ summary: 'Update Catalog Detail By ID' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateById(
    @Param('id', PositiveIntPipe) id: number,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ) {
    return await this.productDetailService.updateById(id, updateProductDetailDto);
  }

  @ApiOperation({ summary: 'Delete Catalog Detail By ID' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', PositiveIntPipe) id: number) {
    return await this.productDetailService.deleteById(id);
  }
}
