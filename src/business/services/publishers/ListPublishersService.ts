import { inject, injectable } from 'tsyringe';
import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import { IPublisher } from '@business/interfaces/Publishers/IPublisher';

@injectable()
class ListPublishersService {
    constructor(
        @inject('PublishersRepository')
        private publishersRepository: IPublishersRepository,
    ) {}

    public async execute(): Promise<IPublisher[]> {
        const publishers = await this.publishersRepository.findAll();

        return publishers;
    }
}

export default ListPublishersService;
