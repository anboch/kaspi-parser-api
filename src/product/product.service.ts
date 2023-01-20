import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ParserService } from '../parser/parser.service';
import { ProductDocument, ProductModel } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    private readonly parserService: ParserService,
    @InjectModel(ProductModel.name) private productModel: Model<ProductDocument>
  ) {}

  async getInfoFromKaspi(
    kaspiId: ProductModel['kaspiId']
  ): Promise<Pick<ProductModel, 'title' | 'price'>> {
    return this.parserService.parseFromKaspiByProductId(kaspiId);
  }

  async saveInfoFromKaspi({
    kaspiId,
    title,
    price,
  }: Pick<ProductModel, 'title' | 'price' | 'kaspiId'>) {
    const productForSave = new this.productModel({
      kaspiId,
      title,
      price,
      createdAt: Date.now(),
    });
    try {
      await productForSave.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
