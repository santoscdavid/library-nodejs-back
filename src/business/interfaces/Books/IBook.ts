import { IPublisher } from '../Publishers/IPublisher';

export interface IBook {
    id: string;
    publisher: IPublisher;
    name: string;
    author: string;
    releaseDate: Date;
    price: number;
    created_at: Date;
    updated_at: Date;
}
