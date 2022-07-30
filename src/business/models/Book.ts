import { IBook } from '@business/interfaces/Books/IBook';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
class Book implements IBook {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    releaseDate: Date;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default Book;
