import {IsNotEmpty, IsOptional, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm";

export class CreateBarDto {
  @MinLength(2)
  @IsNotEmpty()
  @ApiProperty({ example: 'Nom bars', description: 'Nom du bars' })
  public name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Adresse', description: 'Adresse du bars' })
  public adresse: string;

  @IsOptional()
  @ApiProperty({ example: 'Description', description: 'Description du bars' })
  public description?: string;

  @IsOptional()
  @ApiProperty({ example: 'Telephone', description: 'Telephone du bars' })
  public telephone: string;

  @IsOptional()
  public note?: number;

  //@IsOptional()
  //public picture?: string;
  /*
  @IsOptional()
  public price?: number
   */
}
