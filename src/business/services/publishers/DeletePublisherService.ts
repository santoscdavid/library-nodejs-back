import AppError from '@api/middlewares/AppError';
import { inject, injectable } from 'tsyringe';
import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import { IDeletePublisher } from '@business/interfaces/Publishers/IDeleteProduct';

@injectable()
class DeletePublisherService {
    constructor(
        @inject('PublishersRepository')
        private publishersRepository: IPublishersRepository,
    ) {}

    public async execute({ id }: IDeletePublisher): Promise<void> {
        const publisher = await this.publishersRepository.findById(id);

        if (!publisher) {
            throw new AppError('Product not found.');
        }

        await this.publishersRepository.remove(publisher);
    }
}

export default DeletePublisherService;
