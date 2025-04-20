import { IsString, IsNumber, IsEnum, IsOptional, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ActivityType } from '../enum/clickup.enum';

export class CreateClickupDto {
    @IsString()
    @Length(1, 255)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    cycle: string;

    @Type(() => Number)
    @IsNumber()
    quantity: number;

    @IsEnum(ActivityType)
    type: ActivityType;

    @IsOptional()
    @IsString()
    listId?: string;
}
