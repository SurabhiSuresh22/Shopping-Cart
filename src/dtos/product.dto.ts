import {IsAlphanumeric, IsNotEmpty, Length} from 'class-validator';

export class CreateProductDto {
    @IsAlphanumeric()
    @Length(9)
    productId: string; // alphanumberic length 9

    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    brandName: string;

    @IsNotEmpty()
    features: Array<string>
  }

  export class UpdateProductDto {
    @IsNotEmpty()
    features: Array<string>
  }