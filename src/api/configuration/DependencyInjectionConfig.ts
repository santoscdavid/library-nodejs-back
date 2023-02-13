import { container } from 'tsyringe';

import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import { PublishersRepository } from '@data/repository/PublishersRepository';

import { IBooksRepository } from '@business/interfaces/Books/IBooksRepository';
import { BooksRepository } from '@data/repository/BooksRepository';

import { ICustumerRepository } from '@business/interfaces/Customers/ICustumerRepository';
import { CustomersRepository } from '@data/repository/CustomersRepository';

import { ICustomerTokensRepository } from '@business/interfaces/Customers/ICustomerTokensRepository';
import CustomerTokensRepository from '@data/repository/CustomerTokensRepository';

container.registerSingleton<IPublishersRepository>(
    'PublishersRepository',
    PublishersRepository,
);

container.registerSingleton<IBooksRepository>(
    'BooksRepository',
    BooksRepository,
);

container.registerSingleton<ICustumerRepository>(
    'CustomersRepository',
    CustomersRepository,
);

container.registerSingleton<ICustomerTokensRepository>(
    'CustomerTokensRepository',
    CustomerTokensRepository,
);
