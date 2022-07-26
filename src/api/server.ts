import { app } from './app';

app.listen(3333, () => {
    console.log('\x1b[42m', 'Server started on port 3333');
});
