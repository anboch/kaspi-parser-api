import { Controller, Get, Param } from '@nestjs/common';

import { KaspiIdDTO } from './common/dto/kaspi-id.dto';
import { ProductModel } from './product/product.model';
import { ProductService } from './product/product.service';

@Controller()
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Get('parse-product/:kaspiId')
  async parseProduct(
    @Param() { kaspiId }: KaspiIdDTO
  ): Promise<Pick<ProductModel, 'title' | 'price'>> {
    const parsedProduct = await this.productService.getInfoFromKaspi(kaspiId);
    await this.productService.saveInfoFromKaspi({ kaspiId, ...parsedProduct });
    return parsedProduct;
  }
}
