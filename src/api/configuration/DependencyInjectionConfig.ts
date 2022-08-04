import { container } from 'tsyringe';

import { PublishersRepository } from '@data/repository/PublishersRepository';
import { BooksRepository } from '@data/repository/BooksRepository';

import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import { IBooksRepository } from '@business/interfaces/Books/IBooksRepository';

container.registerSingleton<IPublishersRepository>(
    'PublishersRepository',
    PublishersRepository,
);

container.registerSingleton<IBooksRepository>(
    'BooksRepository',
    BooksRepository,
);
