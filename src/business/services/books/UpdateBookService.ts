import { inject, injectable } from 'tsyringe';
import AppError from '@api/middlewares/AppError';
import { IBooksRepository } from '@business/interfaces/Books/IBooksRepository';
import { IUpdateBook } from '@business/interfaces/Books/IUpdateBook';
import { IBook } from '@business/interfaces/Books/IBook';

@injectable()
class UpdateBookService {
    constructor(
        @inject('BooksRepository')
        private booksRepository: IBooksRepository,
    ) {}
    public async execute({
        id,
        name,
        author,
        publisher_id,
        price,
        quantity,
    }: IUpdateBook): Promise<IBook> {
        const book = await this.booksRepository.findById(id);

        if (!book) {
            throw new AppError('Book not found.', 404);
        }

        const bookExists = await this.booksRepository.findByName(name);

        if (bookExists && name !== book.name) {
            throw new AppError('There is already one book with this name');
        }

        book.name = name;
        book.author = author;
        book.publisher.id = publisher_id;
        book.price = price;
        book.quantity = quantity;

        await this.booksRepository.save(book);

        return book;
    }
}

export default UpdateBookService;
