import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Product price',
    nullable: true,
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product slug',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product stock',
    nullable: true,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'Product sizes',
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    description: 'Product tags',
    isArray: true,
    nullable: true,
  })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({
    description: 'Product gender',
    examples: ['men', 'women', 'unisex'],
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    description: 'Product images',
    isArray: true,
  })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  images?: string[];
}
