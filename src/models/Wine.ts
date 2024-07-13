import { IMUser } from './User';
export interface IMWines {
  id: number;
  name: string;
  description: string;
  year: number;
  price: number;
  type: string;
  user?: IMUser[];
}
