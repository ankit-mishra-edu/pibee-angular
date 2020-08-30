import { IUser } from './User';

export interface IAddress {
  user: IUser;
  city: string;
  state: string;
  street: string;
  zip_code: number;
}
