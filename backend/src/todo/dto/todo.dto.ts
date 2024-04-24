import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  pending: boolean;

  @IsDate()
  @IsOptional()
  estimatedTime: Date;

  @IsString()
  @IsOptional()
  notification: string;

  @IsString()
  @IsOptional()
  icon: string;
}

export class EditTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  estimatedTime: Date;

  @IsString()
  @IsOptional()
  notification: string;

  @IsString()
  @IsOptional()
  icon: string;
}
export class ChangeStatusDto {
  @IsBoolean()
  pending: boolean;
}
