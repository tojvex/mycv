import { Expose, Transform } from "class-transformer";

export class ReportDto {
    @Expose()
    id: number;
    @Expose()
    price: number;
    @Expose()
    lat: number;
    @Expose()
    lng: number;
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    mileage: number;
    @Expose()
    year: number;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;
}