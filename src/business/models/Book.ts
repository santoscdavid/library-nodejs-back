import { IBook } from '@business/interfaces/Books/IBook';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Publisher from './Publisher';

@Entity('books')
class Book implements IBook {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Publisher)
    @JoinColumn({ name: 'publisher_id' })
    publisher: Publisher;

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
