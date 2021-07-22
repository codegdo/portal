import { IsNotEmpty } from 'class-validator';

export class CreateRegistrationInput {
  @IsNotEmpty()
  programId!: number;
}

export class CreateRegistrationDto {
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
}