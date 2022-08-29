import { dataSource } from '@data/dataSource';
import { Repository } from 'typeorm';

import { ICustomer } from '@business/interfaces/Customers/ICustomer';
import Customer from '@business/models/Customer';
import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import { ICreateCustomer } from '@business/interfaces/Customers/ICreateCustomer';

export class CustomersRepository implements ICustumerRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Customer);
    }
    public async findByName(name: string): Promise<ICustomer | null> {
        const publisher = await this.ormRepository.findOneBy({ name });

        return publisher;
    }
    public async findByEmail(email: string): Promise<ICustomer | null> {
        const publisher = await this.ormRepository.findOneBy({ email });

        return publisher;
    }
    public async findById(id: string): Promise<ICustomer | null> {
        const publisher = await this.ormRepository.findOneBy({ id });

        return publisher;
    }
    public async findAll(): Promise<ICustomer[]> {
        const publisher = await this.ormRepository.find();

        return publisher;
    }
    public async create(data: ICreateCustomer): Promise<ICustomer> {
        const publisher = this.ormRepository.create(data);

        await this.ormRepository.save(publisher);

        return publisher;
    }
    public async save(publisher: ICustomer): Promise<ICustomer> {
        await this.ormRepository.save(publisher);

        return publisher;
    }
    public async remove(publisher: ICustomer): Promise<void> {
        await this.ormRepository.remove(publisher);
    }
}
