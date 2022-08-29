import AppError from '@api/middlewares/AppError';
import { inject, injectable } from 'tsyringe';
import { compare, hash } from 'bcryptjs';
import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import { ICustomer } from '@business/interfaces/Customers/ICustomer';
import { IUpdateCustomer } from '@business/interfaces/Customers/IUpdateCustomer';

@injectable()
class UpdateCustomerService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustumerRepository,
    ) {}

    public async execute({
        customer_id,
        name,
        email,
        password,
        old_password,
    }: IUpdateCustomer): Promise<ICustomer> {
        const customer = await this.customerRepository.findById(customer_id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        const customerUpdateEmail = await this.customerRepository.findByEmail(
            email,
        );

        if (customerUpdateEmail && customerUpdateEmail.id !== customer_id) {
            throw new AppError(
                'There is already one customer with this email.',
            );
        }

        if (password && !old_password) {
            throw new AppError('Old password is required');
        }

        if (password && old_password) {
            const checkOldPassword = await compare(
                old_password,
                customer.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Old password does not match');
            }

            customer.password = await hash(password, 8);
        }

        customer.name = name;
        customer.email = email;

        await this.customerRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;
