import { Controller, Delete, Get, Param, Patch, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { ProductService } from './product.service';
import { Product } from 'src/schemas/product.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/dtos/user.dto';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(
    @Param('id') id: string
  ){
    return this.productService.getProductById(id);
  }

  @Get(':brandName')
  getProductByBrand(
    @Param('brandName') brand: string
  ){
    return this.productService.getProductByBrand(brand);
  }

  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard())
  createProduct(
    @Body() productInfo : CreateProductDto
  ){
    return this.productService.createProduct(productInfo);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() productInfo: UpdateProductDto
  ){
    return this.productService.updateProduct(id, productInfo)
  }
  
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @HttpCode(204)
  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return this.productService.deleteProduct(id)
  }

}
