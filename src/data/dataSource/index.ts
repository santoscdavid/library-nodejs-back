import { DataSource } from 'typeorm';

import Publisher from '@business/models/Publisher';

import { CreatePublisher1659054375194 } from '../migrations/1659054375194-CreatePublisher';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'library-db',
    entities: [Publisher],
    migrations: { CreatePublisher1659054375194 },
});
