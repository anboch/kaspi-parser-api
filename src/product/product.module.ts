import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParserService } from '../parser/parser.service';
import { ProductModel, ProductSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema }])],
  providers: [ProductService, ParserService],
  exports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema }])],
})
export class ProductModule {}
