import { inject, injectable } from 'tsyringe';
import { IBooksRepository } from '@business/interfaces/Books/IBooksRepository';
import { IBook } from '@business/interfaces/Books/IBook';
import AppError from '@api/middlewares/AppError';
import { IPublishersRepository } from '@business/interfaces/Publishers/IPublishersRepository';
import { IRequestCreateBook } from '@business/interfaces/Books/IRequestCreateBook';

@injectable()
class CreateBookService {
    constructor(
        @inject('PublishersRepository')
        private publishersRepository: IPublishersRepository,

        @inject('BooksRepository')
        private booksRepository: IBooksRepository,
    ) {}

    public async execute({
        name,
        author,
        publisher_id,
        releaseDate,
        price,
        quantity,
    }: IRequestCreateBook): Promise<IBook> {
        const publisherExists = await this.publishersRepository.findById(
            publisher_id,
        );

        if (!publisherExists) {
            throw new AppError('Publisher not found.', 404);
        }

        const bookExists = await this.booksRepository.findByName(name);

        if (bookExists) {
            throw new AppError('There is already one book with this name');
        }

        const book = await this.booksRepository.create({
            name,
            author,
            publisher: publisherExists,
            releaseDate,
            price,
            quantity,
        });

        return book;
    }
}

export default CreateBookService;
