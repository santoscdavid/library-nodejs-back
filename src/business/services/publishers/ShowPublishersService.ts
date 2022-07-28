import { inject, injectable } from 'tsyringe';
import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import { IShowPublisher } from '@business/interfaces/Publishers/IShowPublisher';
import { IPublisher } from '@business/interfaces/Publishers/IPublisher';
import AppError from '@api/middlewares/AppError';

@injectable()
class ShowPublisherService {
    constructor(
        @inject('PublishersRepository')
        private publishersRepository: IPublishersRepository,
    ) {}

    public async execute({ id }: IShowPublisher): Promise<IPublisher> {
        const product = await this.publishersRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        return product;
    }
}

export default ShowPublisherService;
