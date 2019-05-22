import { Product } from '../entities/Product';
import { BaseRepository } from './base/BaseRepository';

export class ProductRepository extends BaseRepository<Product> {
    public getCategories(): Product[] {
        const query = `
        SELECT DISTINCT category
        FROM products`;
        const stmt = this.db.prepare(query);

        return stmt.all();
    }
}


