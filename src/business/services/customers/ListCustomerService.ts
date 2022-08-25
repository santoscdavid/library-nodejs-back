import { inject, injectable } from 'tsyringe';
import { ICostumerRepository } from '@business/interfaces/Customers/ICostumerRepository';
import { ICustomer } from '@business/interfaces/Customers/ICustomer';

@injectable()
class ListCustomerService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICostumerRepository,
    ) {}

    public async execute(): Promise<ICustomer[]> {
        const customers = this.customerRepository.findAll();

        return customers;
    }
}

export default ListCustomerService;
