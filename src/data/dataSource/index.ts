import { DataSource } from 'typeorm';

import Publisher from '@business/models/Publisher';
import Book from '@business/models/Book';
import Customer from '@business/models/Customer';
import CustomerToken from '@business/models/CustomerToken';

import { CreatePublisher1659054375194 } from '../migrations/1659054375194-CreatePublisher';
import { CreateBooks1659220796991 } from '../migrations/1659220796991-CreateBooks';
import { AddPublisherIdToBook1659222899869 } from '../migrations/1659222899869-AddPublisherIdToBook';
import { CreateCustomer1659819359897 } from '../migrations/1659819359897-CreateCustomer';
import { CreateCustumerTokens1659823611720 } from '../migrations/1659823611720-CreateCustumerTokens';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'library-db',
    entities: [Publisher, Book, Customer, CustomerToken],
    migrations: {
        CreatePublisher1659054375194,
        CreateBooks1659220796991,
        AddPublisherIdToBook1659222899869,
        CreateCustomer1659819359897,
        CreateCustumerTokens1659823611720,
    },
});
