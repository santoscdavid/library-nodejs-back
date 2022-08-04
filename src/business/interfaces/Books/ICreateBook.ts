import { IPublisher } from '../Publishers/IPublisher';

export interface ICreateBook {
    name: string;
    author: string;
    publisher: IPublisher;
    releaseDate: Date;
    price: number;
    quantity: number;
}
