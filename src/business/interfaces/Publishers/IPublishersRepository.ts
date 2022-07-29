import { ICreatePublisher } from './ICreatePublisher';
import { IPublisher } from './IPublisher';

export interface IPublishersRepository {
    findByName(name: string): Promise<IPublisher | null>;
    findById(id: string): Promise<IPublisher | null>;
    findAll(): Promise<IPublisher[]>;
    create(data: ICreatePublisher): Promise<IPublisher>;
    save(publisher: IPublisher): Promise<IPublisher>;
    remove(publisher: IPublisher): Promise<void>;
}
