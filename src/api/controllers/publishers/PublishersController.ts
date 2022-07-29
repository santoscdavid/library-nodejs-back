import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListPublishersService from '@business/services/publishers/ListPublishersService';
import ShowPublisherService from '@business/services/publishers/ShowPublishersService';
import CreatePublisherService from '@business/services/publishers/CreatePublisherService';
import UpdatePublisherService from '@business/services/publishers/UpdatePublisherService';
import DeletePublisherService from '@business/services/publishers/DeletePublisherService';

export default class PublishersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listPublishers = await container.resolve(ListPublishersService);

        const publishers = await listPublishers.execute();

        return response.json(publishers);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showPublisher = container.resolve(ShowPublisherService);

        const publisher = await showPublisher.execute({ id });

        return response.json(publisher);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, city } = request.body;

        const createPublisher = container.resolve(CreatePublisherService);

        const publisher = await createPublisher.execute({
            name,
            city,
        });

        return response.status(201).json(publisher);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, city } = request.body;
        const { id } = request.params;

        const updatePublisher = container.resolve(UpdatePublisherService);

        const publisher = await updatePublisher.execute({
            id,
            name,
            city,
        });

        return response.json(publisher);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deletePublisher = container.resolve(DeletePublisherService);

        await deletePublisher.execute({ id });

        return response.json([]);
    }
}
