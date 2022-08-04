import { inject, injectable } from 'tsyringe';
import { IBooksRepository } from '@business/interfaces/Books/IBooksRepository';
import { IBook } from '@business/interfaces/Books/IBook';

@injectable()
class ListBooksService {
    constructor(
        @inject('BooksRepository')
        private booksRepository: IBooksRepository,
    ) {}

    public async execute(): Promise<IBook[]> {
        const books = await this.booksRepository.findAll();

        return books;
    }
}

export default ListBooksService;
