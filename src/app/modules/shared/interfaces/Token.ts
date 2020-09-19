import { IUser } from './User';

export interface IToken {
    user : IUser,
    key : string
}