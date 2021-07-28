import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  emailAddress!: string;

  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  roleId!: number;

  @IsNotEmpty()
  orgId!: number;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  emailAddress!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class ResendUserTokenDto {
  @IsString()
  @IsNotEmpty()
  username!: string;
}

export class FilterUserDto {
  @IsOptional()
  search!: string;
}
