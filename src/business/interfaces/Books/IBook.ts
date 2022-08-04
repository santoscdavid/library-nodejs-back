import { IPublisher } from '../Publishers/IPublisher';

export interface IBook {
    id: string;
    name: string;
    author: string;
    publisher: IPublisher;
    releaseDate: Date;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}
