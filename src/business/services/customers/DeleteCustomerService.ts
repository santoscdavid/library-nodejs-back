import AppError from '@api/middlewares/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import { IDeletePublisher } from '@business/interfaces/Publishers/IDeleteProduct';

@injectable()
class DeleteCustomerService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustumerRepository,
    ) {}

    public async execute({ id }: IDeletePublisher): Promise<void> {
        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        await this.customerRepository.remove(customer);
    }
}

export default DeleteCustomerService;
