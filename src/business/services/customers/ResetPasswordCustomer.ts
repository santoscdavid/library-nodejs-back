import AppError from '@api/middlewares/AppError';
import { ICustomerTokensRepository } from '@business/interfaces/Customers/ICustomerTokensRepository';
import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import { IResetCustomerPassword } from '@business/interfaces/Customers/IResetCustomerPassword';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { userInfo } from 'os';
import { inject, injectable } from 'tsyringe';

@injectable()
class ResetPasswordCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustumerRepository,

        @inject('CustomerTokensRepositoy')
        private customerTokensRepository: ICustomerTokensRepository,
    ) {}

    public async execute({
        token,
        password,
    }: IResetCustomerPassword): Promise<void> {
        const customerToken = await this.customerTokensRepository.findByToken(
            token,
        );

        if (!customerToken) {
            throw new AppError('Customer Token does not exists');
        }

        const customer = await this.customersRepository.findById(
            customerToken.customer_id,
        );

        if (!customer) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = customerToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        customer.password = await hash(password, 8);

        await this.customersRepository.save(customer);
    }
}

export default ResetPasswordCustomerService;
