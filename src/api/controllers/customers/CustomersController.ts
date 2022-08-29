import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCustomerService from '@business/services/customers/ListCustomerService';
import CreateCustomerService from '@business/services/customers/CreateCustomerService';
import UpdateCustomerService from '@business/services/customers/UpdateCustomerService';
import DeleteCustomerService from '@business/services/customers/DeleteCustomerService';

export default class CustomersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listCustomers = await container.resolve(ListCustomerService);

        const customers = await listCustomers.execute();

        return response.json(customers);
    }

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
