import { IPublisher } from '../Publishers/IPublisher';

export interface IRequestCreateBook {
    name: string;
    author: string;
    publisher_id: string;
    releaseDate: Date;
    price: number;
    quantity: number;
}
