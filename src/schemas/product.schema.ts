import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop()
  productId: string;

  @Prop()
  productName: string ;

  @Prop()
  brandName: string;

  @Prop()
  features: Array<string>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
