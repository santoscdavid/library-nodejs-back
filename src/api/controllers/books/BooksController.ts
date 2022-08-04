import CreateBookService from '@business/services/books/CreateBookService';
import DeleteBookService from '@business/services/books/DeleteBookService';
import ListBooksService from '@business/services/books/ListBooksService';
import ShowBookService from '@business/services/books/ShowBookService';
import UpdateBookService from '@business/services/books/UpdateBookService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class BooksController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listBooks = await container.resolve(ListBooksService);

        const book = await listBooks.execute();

        return response.json(book);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showBook = container.resolve(ShowBookService);

        const book = await showBook.execute({ id });

        return response.json(book);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, author, publisher_id, releaseDate, price, quantity } =
            request.body;

        const createBook = container.resolve(CreateBookService);

        const publisher = await createBook.execute({
            name,
            author,
            publisher_id,
            releaseDate,
            price,
            quantity,
        });

        return response.status(201).json(publisher);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, author, publisher_id, releaseDate, price, quantity } =
            request.body;

        const updateBook = container.resolve(UpdateBookService);

        const book = await updateBook.execute({
            id,
            name,
            author,
            publisher_id,
            releaseDate,
            price,
            quantity,
        });

        return response.json(book);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteBook = container.resolve(DeleteBookService);

        await deleteBook.execute({ id });

        return response.json([]);
    }
}
