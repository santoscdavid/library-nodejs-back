import { ICustumerToken } from './ICustomerToken';

export interface ICustomerTokensRepository {
    findByToken(token: string): Promise<ICustumerToken | null>;
    generate(user_id: string): Promise<ICustumerToken>;
}
