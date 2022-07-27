import { DataSource } from 'typeorm';

import Publisher from '@business/models/Publisher';
import { CreatePublishers1658922932476 } from '@data/migrations/1658922932476-CreatePublishers';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'library-db',
    entities: [Publisher],
    migrations: { CreatePublishers1658922932476 },
});
