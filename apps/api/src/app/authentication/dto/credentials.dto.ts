import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
export class CredentialsDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
