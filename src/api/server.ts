import { app } from './app';
import { dataSource } from '@data/dataSource';
import { consoleColor, serverStarted } from './configuration/StarterConfig';

dataSource.initialize().then(() => {
    const server = app.listen(process.env.PORT || 3333, () => {
        console.log(consoleColor, serverStarted);
    });
});
