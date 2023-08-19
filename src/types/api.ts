import { TOrder } from '../types/order';
import { TIngedient } from '../types/ingredient';
import { TUser } from './user';

export interface IResponse extends Response {
    success: boolean;
    refreshToken: string;
    accessToken: string;
}
export interface IOrderResponse extends IResponse {
    order: TOrder
}

export interface IIngredientResponse extends IResponse {
    data: Array<TIngedient>
}

export interface IError extends Error {
    message: string;
}

export type ICustomHeaders = HeadersInit & {
    authorization?: string | null;
}

export interface IOptions extends RequestInit {
    headers: ICustomHeaders;
}

export interface IUserResponse extends IResponse{
    user: TUser;
    accessToken: string;
    refreshToken: string;
}
