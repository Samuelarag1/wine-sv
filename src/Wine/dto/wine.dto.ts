export class createWineDTO {
  name: string;
  description?: string;
  year: number;
  price?: number;
  type: string;
  image: string;
  userId?: number;
  grape?: string;
}

export class updateWineDTO {
  name?: string;
  description?: string;
  year?: number;
  price?: number;
  grape?: string;
  type?: string;
  image: string;
}
