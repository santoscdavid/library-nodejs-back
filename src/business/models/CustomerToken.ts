import { ICustumerToken } from '@business/interfaces/Customers/ICustomerToken';
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('customer_tokens')
class CustomerToken implements ICustumerToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    customer_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default CustomerToken;
