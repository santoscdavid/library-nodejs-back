import AppError from '@api/middlewares/AppError';
import { inject, injectable } from 'tsyringe';
import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import { IPublisher } from '@business/interfaces/Publishers/IPublisher';
import { ICreatePublisher } from '@business/interfaces/Publishers/ICreatePublisher';

@injectable()
class CreatePublisherService {
    constructor(
        @inject('PublishersRepository')
        private publishersRepository: IPublishersRepository,
    ) {}

    public async execute({
        name,
        city,
    }: ICreatePublisher): Promise<IPublisher> {
        const publisherExists = await this.publishersRepository.findByName(
            name,
        );

        if (publisherExists)
            throw new AppError('There is already one publisher with this name');

        const publisher = await this.publishersRepository.create({
            name,
            city,
        });

        return publisher;
    }
}

export default CreatePublisherService;
