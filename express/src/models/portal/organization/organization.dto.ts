import { IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';

export class CreateOrgDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  subdomain!: string;

  @IsNotEmpty()
  owner!: User;
}
