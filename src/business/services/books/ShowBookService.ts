import { inject, injectable } from 'tsyringe';
import { IShowBook } from '@business/interfaces/Books/IShowBook';
import AppError from '@api/middlewares/AppError';
import { IBook } from '@business/interfaces/Books/IBook';
import { IBooksRepository } from '@business/interfaces/Books/IBooksRepository';

@injectable()
class ShowBookService {
    constructor(
        @inject('BooksRepository')
        private booksRepository: IBooksRepository,
    ) {}

    public async execute({ id }: IShowBook): Promise<IBook> {
        const book = await this.booksRepository.findById(id);

        if (!book) {
            throw new AppError('Book not found.', 404);
        }

        return book;
    }
}

export default ShowBookService;
