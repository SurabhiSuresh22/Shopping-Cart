import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from 'src/schemas/product.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: []
})
export class ProductModule {}
