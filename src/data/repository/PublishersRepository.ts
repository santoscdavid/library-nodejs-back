import { ICreatePublisher } from '@business/interfaces/Publishers/ICreatePublisher';
import { IPublisher } from '@business/interfaces/Publishers/IPublisher';
import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import Publisher from '@business/models/Publisher';
import { dataSource } from '@data/dataSource';
import { Repository } from 'typeorm';

export class PublishersRepository implements IPublishersRepository {
    private ormRepository: Repository<Publisher>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Publisher);
    }

    public async findByName(name: string): Promise<IPublisher | null> {
        const publisher = await this.ormRepository.findOneBy({ name });

        return publisher;
    }
    public async findById(id: string): Promise<IPublisher | null> {
        const publisher = await this.ormRepository.findOneBy({ id });

        return publisher;
    }
    public async findAll(): Promise<IPublisher[]> {
        const publishers = await this.ormRepository.find();

        return publishers;
    }
    public async create({ name, city }: ICreatePublisher): Promise<IPublisher> {
        const publisher = this.ormRepository.create({ name, city });

        await this.ormRepository.save(publisher);

        return publisher;
    }
    public async save(publisher: IPublisher): Promise<IPublisher> {
        await this.ormRepository.save(publisher);

        return publisher;
    }
    public async remove(publisher: IPublisher): Promise<void> {
        await this.ormRepository.remove(publisher);
    }
}
