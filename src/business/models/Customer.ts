import { ICustomer } from '@business/interfaces/Customers/ICustomer';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

class Customer implements ICustomer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar_url: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}

export default Customer;
