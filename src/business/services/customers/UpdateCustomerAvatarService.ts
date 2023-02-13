import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import uploadConfig from '@api/configuration/upload';

import { ICustomer } from '@business/interfaces/Customers/ICustomer';
import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import { IUpdateCustomerAvatar } from '@business/interfaces/Customers/IUpdateCustomerAvatar';

@injectable()
class UpdateCustomerAvatarService {
    constructor(
        @inject('CustumerRepository')
        private customerRepository: ICustumerRepository,
    ) {}

    public async execute({
        customer_id,
        avatarFilename,
    }: IUpdateCustomerAvatar): Promise<ICustomer> {
        const customer = await this.customerRepository.findById(customer_id);

        if (!customer) {
            throw new Error(`Customer not found`);
        }

        if (customer.avatar_url) {
            const customerAvatarFilePath = path.join(
                uploadConfig.directory,
                customer.avatar_url,
            );
            const customerAvatarFileExists = await fs.promises.stat(
                customerAvatarFilePath,
            );

            if (customerAvatarFileExists) {
                await fs.promises.unlink(customerAvatarFilePath);
            }
        }

        customer.avatar_url = avatarFilename;

        await this.customerRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerAvatarService;
