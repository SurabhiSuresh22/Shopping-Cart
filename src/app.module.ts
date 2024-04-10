import { Module, ValidationPipe } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config"
import { ProductModule } from './product/product.module';
import config from "config/config";
import { APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(config.mongoDBConnectionString,  {
      dbName: "ShoppingCart"
    }),
    ProductModule,
    AuthModule
  ],
  controllers: [],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
