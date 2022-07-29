import { app } from './app';
import { dataSource } from '@data/dataSource';

dataSource.initialize().then(() => {
    const server = app.listen(3333, () => {
        console.log(
            '\x1b[32m',
            `

            Server started on port 3333 🚀

            `,
        );
    });
});
