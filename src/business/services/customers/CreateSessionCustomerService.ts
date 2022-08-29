import AuthConfig from '@api/configuration/AuthConfig';
import AppError from '@api/middlewares/AppError';
import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import Customer from '@business/models/Customer';
import { compare } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import { inject } from 'tsyringe';

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    customer: Customer;
    token: string;
}

class CreateSessionCustomerService {
    constructor(
        @inject('UsersRepository')
        private customersRepository: ICustumerRepository,
    ) {}
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const customer = await this.customersRepository.findByEmail(email);

        if (!customer) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordConfirmed = await compare(password, customer.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const token = sign({}, AuthConfig.jwt.secret as Secret, {
            subject: customer.id,
            expiresIn: AuthConfig.jwt.expiresIn,
        });

        return {
            customer,
            token,
        };
    }
}

export default CreateSessionCustomerService;
