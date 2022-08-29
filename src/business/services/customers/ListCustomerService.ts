import { inject, injectable } from 'tsyringe';
import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import { ICustomer } from '@business/interfaces/Customers/ICustomer';

@injectable()
class ListCustomerService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustumerRepository,
    ) {}

    public async execute(): Promise<ICustomer[]> {
        const customers = this.customerRepository.findAll();

        return customers;
    }
}

export default ListCustomerService;
