import { IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';

export class CreateOrgDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  hostname!: string;

  @IsNotEmpty()
  owner!: User;
}
