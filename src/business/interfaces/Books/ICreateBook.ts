import { IPublisher } from '../Publishers/IPublisher';

export interface ICreateBook {
    publisher: IPublisher;
    id: string;
    name: string;
    author: string;
    releaseDate: Date;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}
