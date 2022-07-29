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
        const publisher = await this.publishersRepository.findById(id);

        if (!publisher) {
            throw new AppError('Publisher not found.', 404);
        }

        return publisher;
    }
}

export default ShowPublisherService;
