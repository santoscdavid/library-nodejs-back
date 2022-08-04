import { DataSource } from 'typeorm';

import Publisher from '@business/models/Publisher';
import Book from '@business/models/Book';

import { CreatePublisher1659054375194 } from '../migrations/1659054375194-CreatePublisher';
import { CreateBooks1659220796991 } from '../migrations/1659220796991-CreateBooks';
import { AddPublisherIdToBook1659222899869 } from '../migrations/1659222899869-AddPublisherIdToBook';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'library-db',
    entities: [Publisher, Book],
    migrations: {
        CreatePublisher1659054375194,
        CreateBooks1659220796991,
        AddPublisherIdToBook1659222899869,
    },
});
