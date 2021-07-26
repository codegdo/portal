import { IsNotEmpty } from 'class-validator';

export class GetRegDto {
  @IsNotEmpty()
  orgId!: number;

  @IsNotEmpty()
  programId!: number;
}

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
