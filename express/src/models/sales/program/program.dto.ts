import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  description!: string;

  @IsNotEmpty()
  formId!: number;

  @IsNotEmpty()
  ownerId!: number;

  @IsNotEmpty()
  orgId!: number;
}