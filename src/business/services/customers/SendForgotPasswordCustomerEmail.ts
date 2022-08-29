import path from 'path';
import { inject, injectable } from 'tsyringe';
import AppError from '@api/middlewares/AppError';
import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import { ICustomerTokensRepository } from '@business/interfaces/Customers/ICustomerTokensRepository';
import { ISendForgotPasswordCustomerEmail } from '@business/interfaces/Customers/ISendForgotPasswordCustomerEmail';
import EtherealMail from '@api/configuration/mail/EtherealMail';

@injectable()
class SendForgotPasswordCustomerEmailService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustumerRepository,

        @inject('CustomerTokensRepositoy')
        private customerTokensRepository: ICustomerTokensRepository,
    ) {}

    public async execute({
        email,
    }: ISendForgotPasswordCustomerEmail): Promise<void> {
        const customer = await this.customersRepository.findByEmail(email);
        if (!customer) throw new AppError('Customer does not exists');

        const { token } = await this.customerTokensRepository.generate(
            customer.id,
        );

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'api',
            'configuration',
            'mail',
            'forgot_password.hbs',
        );

        await EtherealMail.sendEmail({
            to: { name: customer.name, email: customer.email },
            subject: 'Livraria - Recuperação da senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: customer.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordCustomerEmailService;
