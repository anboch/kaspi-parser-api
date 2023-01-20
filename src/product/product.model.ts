import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';

@Schema({ collection: collectionNames.PRODUCT })
export class ProductModel {
  _id: mongoId;

  @Prop({ required: true })
  title: string;

  @Prop()
  price: number;

  @Prop({ required: true, index: true })
  kaspiId: string;

  @Prop()
  createdAt: number;
}

export type ProductDocument = ProductModel & Document;
export const ProductSchema = SchemaFactory.createForClass(ProductModel);
