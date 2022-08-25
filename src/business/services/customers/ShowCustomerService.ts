import AppError from '@api/middlewares/AppError';
import { inject, injectable } from 'tsyringe';
import { ICostumerRepository } from '@business/interfaces/Customers/ICostumerRepository';
import { ICustomer } from '@business/interfaces/Customers/ICustomer';
import { IShowCustomer } from '@business/interfaces/Customers/IShowCustomer';

@injectable()
class ShowCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICostumerRepository,
    ) {}

    public async execute({ customer_id }: IShowCustomer): Promise<ICustomer> {
        const customer = await this.customersRepository.findById(customer_id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;
    }
}

export default ShowCustomerService;
