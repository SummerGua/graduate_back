import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive() // 正数
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
