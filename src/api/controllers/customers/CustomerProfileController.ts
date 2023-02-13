import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '@business/services/customers/CreateCustomerService';
import DeleteCustomerService from '@business/services/customers/DeleteCustomerService';
import UpdateCustomerService from '@business/services/customers/UpdateCustomerService';

export default class CustomersProfileController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createCustomer = container.resolve(CreateCustomerService);

        const customer = await createCustomer.execute({
            name,
            email,
            password,
        });

        return response.status(201).json(customer);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, email, password, old_password } = request.body;

        const updateCustomer = container.resolve(UpdateCustomerService);

        const customer = await updateCustomer.execute({
            customer_id: id,
            name,
            email,
            password,
            old_password,
        });

        return response.json(customer);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteCustomer = container.resolve(DeleteCustomerService);

        await deleteCustomer.execute({ id });

        return response.json([]);
    }
}
