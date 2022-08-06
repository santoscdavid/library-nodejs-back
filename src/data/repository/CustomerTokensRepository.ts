import { Repository } from 'typeorm';
import { dataSource } from '@data/dataSource';

import CustomerToken from '@business/models/CustomerToken';
import { ICustomerTokensRepository } from '@business/interfaces/Customers/ICustomerTokensRepository';
import { ICustumerToken } from '@business/interfaces/Customers/ICustomerToken';

class CustomerTokensRepository implements ICustomerTokensRepository {
    private ormRepository: Repository<CustomerToken>;

    constructor() {
        this.ormRepository = dataSource.getRepository(CustomerToken);
    }

    public async findByToken(token: string): Promise<ICustumerToken | null> {
        const custumerToken = await this.ormRepository.findOneBy({ token });
        return custumerToken;
    }

    public async generate(customer_id: string): Promise<ICustumerToken> {
        const custumerToken = this.ormRepository.create({
            customer_id,
        });

        await this.ormRepository.save(custumerToken);

        return custumerToken;
    }
}

export default CustomerTokensRepository;
