import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateCustomerAvatarService from '@business/services/customers/UpdateCustomerAvatarService';

export default class CustomerAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateAvatar = container.resolve(UpdateCustomerAvatarService);

        const user = updateAvatar.execute({
            customer_id: request.user.id,
            avatarFilename: request.file?.filename as string,
        });
        return response.json(instanceToInstance(user));
    }
}
