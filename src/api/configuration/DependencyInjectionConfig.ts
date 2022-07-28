import { container } from 'tsyringe';

import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import { PublishersRepository } from '@data/repository/PublishersRepository';

container.registerSingleton<IPublishersRepository>(
    'PublishersRepository',
    PublishersRepository,
);
