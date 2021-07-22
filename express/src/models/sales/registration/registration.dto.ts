import { IsNotEmpty } from 'class-validator';

export class CreateRegDto {
  @IsNotEmpty()
  regNumber!: string;

  @IsNotEmpty()
  programId!: number;

  @IsNotEmpty()
  formId!: number;

  @IsNotEmpty()
  ownerId!: number;

  @IsNotEmpty()
  orgId!: number;

  @IsNotEmpty()
  createdBy!: string;

  @IsNotEmpty()
  updatedBy!: string;
}