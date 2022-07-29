import { inject, injectable } from 'tsyringe';
import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import AppError from '@api/middlewares/AppError';
import { IPublisher } from '@business/interfaces/Publishers/IPublisher';
import { IUpdatePublisher } from '@business/interfaces/Publishers/IUpdatePublisher';

@injectable()
class UpdatePublisherService {
    constructor(
        @inject('PublishersRepository')
        private publishersRepository: IPublishersRepository,
    ) {}
    public async execute({
        id,
        name,
        city,
    }: IUpdatePublisher): Promise<IPublisher> {
        const publisher = await this.publishersRepository.findById(id);

        if (!publisher) {
            throw new AppError('Product not found.');
        }

        const productExists = await this.publishersRepository.findByName(name);

        if (productExists && name !== publisher.name) {
            throw new AppError('There is already one product with this name');
        }

        publisher.name = name;
        publisher.city = city;

        await this.publishersRepository.save(publisher);

        return publisher;
    }
}

export default UpdatePublisherService;
