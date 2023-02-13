import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCustomerService from '@business/services/customers/ListCustomerService';

export default class CustomersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listCustomers = await container.resolve(ListCustomerService);

        const customers = await listCustomers.execute();

        return response.json(customers);
    }
}
