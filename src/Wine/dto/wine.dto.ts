export class createWineDTO {
  name: string;
  description?: string;
  year: number;
  price?: number;
  type: string;
  image: string;
  userId?: number;
}

export class updateWineDTO {
  name?: string;
  description?: string;
  year?: number;
  price?: number;
  type?: string;
  image: string;
}
