import { dataSource } from '@data/dataSource';
import { Repository } from 'typeorm';
import Book from '@business/models/Book';
import { IBooksRepository } from '@business/interfaces/Books/IBooksRepository';
import { IBook } from '@business/interfaces/Books/IBook';
import { ICreateBook } from '@business/interfaces/Books/ICreateBook';

export class BooksRepository implements IBooksRepository {
    private ormRepository: Repository<Book>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Book);
    }

    public async findByName(name: string): Promise<IBook | null> {
        const Book = await this.ormRepository.findOneBy({ name });

        return Book;
    }
    public async findById(id: string): Promise<IBook | null> {
        const book = await this.ormRepository.findOneBy({ id });

        return book;
    }
    public async findAll(): Promise<IBook[]> {
        const books = await this.ormRepository.find();

        return books;
    }
    public async create(data: ICreateBook): Promise<IBook> {
        const book = this.ormRepository.create(data);

        await this.ormRepository.save(book);

        return book;
    }
    public async save(book: IBook): Promise<IBook> {
        await this.ormRepository.save(book);

        return book;
    }
    public async remove(book: IBook): Promise<void> {
        await this.ormRepository.remove(book);
    }
}
