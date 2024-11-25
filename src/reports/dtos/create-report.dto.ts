import { IsLatitude, IsLongitude, IsNumber, IsString, Min, Max } from "class-validator";

export class CreateReportDto {
    @IsString()
    make: string
    
    @IsString()
    model: string;
    
    @IsNumber()
    @Min(1993)
    @Max(2050)
    year: number;
    
    @IsLongitude()
    lng: number;
    
    @IsLatitude()
    lat: number;
    
    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;
    
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
}