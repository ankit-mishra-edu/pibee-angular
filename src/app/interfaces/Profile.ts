import { IAddress } from './Address';

export interface IProfile {
  user: number;
  bio: string;
  address: IAddress;
  birth_date: string;
  email_confirmed: string;
  image: string;
}
