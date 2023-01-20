import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { ProductModel } from '../product/product.model';

@Injectable()
export class ParserService {
  async parseFromKaspiByProductId(kaspiId: string): Promise<Pick<ProductModel, 'title' | 'price'>> {
    const url = `https://kaspi.kz/shop/p/c-${kaspiId}`;
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const parsedData = await page.evaluate(() => {
        const title = document.querySelector('.item__heading')?.textContent;
        const rawPrice = document.querySelector('.item__price-once')?.textContent;
        if (!title || !rawPrice) {
          throw new NotFoundException('PARSING_FROM_KASPI_FAILED');
        }
        return { title, price: Number(rawPrice.match(/\d/g)?.join('')) };
      });
      await browser.close();
      return parsedData;
    } catch (error) {
      throw new InternalServerErrorException('ERROR_WHILE_PARSING_FROM_KASPI');
    }
  }
}
