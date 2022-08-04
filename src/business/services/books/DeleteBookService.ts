import { inject, injectable } from 'tsyringe';
import { IBooksRepository } from '@business/interfaces/Books/IBooksRepository';
import AppError from '@api/middlewares/AppError';
import { IDeleteBook } from '@business/interfaces/Books/IDeleteBook';

@injectable()
class DeleteBookService {
    constructor(
        @inject('BooksRepository')
        private booksRepository: IBooksRepository,
    ) {}

    public async execute({ id }: IDeleteBook): Promise<void> {
        const book = await this.booksRepository.findById(id);

        if (!book) {
            throw new AppError('Book not found.', 404);
        }

        await this.booksRepository.remove(book);
    }
}

export default DeleteBookService;
