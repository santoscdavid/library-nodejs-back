import AppError from '@api/middlewares/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import { ICustomer } from '@business/interfaces/Customers/ICustomer';
import { ICreateCustomer } from '@business/interfaces/Customers/ICreateCustomer';
import { hash } from 'bcryptjs';

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustumerRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: ICreateCustomer): Promise<ICustomer> {
        const emailExists = await this.customerRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const customer = await this.customerRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return customer;
    }
}

export default CreateCustomerService;
