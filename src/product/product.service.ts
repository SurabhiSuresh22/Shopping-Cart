import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: mongoose.Model<Product>
  ){}

  async getAllProducts(): Promise<Product[]> {
    let products = await this.productModel.find();
    return products; 
  }

  async getProductById(id: string) {
    let product = await this.productModel.find({productId: id});
    return product;
  }

  async getProductByBrand(brand: string) {
    let product = await this.productModel.find({brandName: brand});
    return product;
  }

  async createProduct(productInfo: CreateProductDto){
    let result = await this.productModel.create(productInfo);
    return result;
  }

  async updateProduct(id: string, productInfo: UpdateProductDto){
    return await this.productModel.findOneAndUpdate({productId: id}, productInfo, {upsert: true} )
  }

  async deleteProduct(id: string){
    return await this.productModel.findOneAndDelete({productId: id})
  }
}
