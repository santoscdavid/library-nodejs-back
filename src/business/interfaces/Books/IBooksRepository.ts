import { IBook } from './IBook';
import { ICreateBook } from './ICreateBook';

export interface IBooksRepository {
    findByName(name: string): Promise<IBook | null>;
    findById(id: string): Promise<IBook | null>;
    findAll(): Promise<IBook[]>;
    create(data: ICreateBook): Promise<IBook>;
    save(publisher: IBook): Promise<IBook>;
    remove(publisher: IBook): Promise<void>;
}
