import { ICustomer } from './ICustomer';
import { ICreateCustomer } from './ICreateCustomer';

export interface ICustumerRepository {
    findByName(name: string): Promise<ICustomer | null>;
    findByEmail(email: string): Promise<ICustomer | null>;
    findById(id: string): Promise<ICustomer | null>;
    findAll(): Promise<ICustomer[]>;
    create(data: ICreateCustomer): Promise<ICustomer>;
    save(publisher: ICustomer): Promise<ICustomer>;
    remove(publisher: ICustomer): Promise<void>;
}
