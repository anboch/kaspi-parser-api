import { IsNumberString } from 'class-validator';

export class KaspiIdDTO {
  @IsNumberString()
  kaspiId: string;
}
