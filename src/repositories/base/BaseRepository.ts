import { Database } from 'better-sqlite3';
import { Read } from '../interfaces/Read';
import { Write } from '../interfaces/Write';

export abstract class BaseRepository<T> implements Write<T>, Read<T> {
    public db: Database;
    private table: string;

    constructor(db: Database, table: string) {
        this.db = db;
        this.table = table;
    }

    public create(item: T): boolean {
        const query = `
        INSERT INTO ${this.table} (${Object.keys(item).join(',')})
        VALUES (${Object.keys(item).map((_) => '?').join(',')})`;
        const stmt = this.db.prepare(query);
        const result = stmt.run(Object.values(item));

        return !!result.changes;
    }

    public update(item: object, condition: object): boolean {
        const query = `
        UPDATE ${this.table}
        SET ${Object.keys(item).map((value) => `${value} = ? `).join(', ')}
        WHERE ${Object.keys(condition).map((value) => `${value} = ? COLLATE NOCASE`).join(' AND ')}`;
        const stmt = this.db.prepare(query);
        const result = stmt.run(Object.values(item), Object.values(condition));

        return !!result.changes;
    }

    public createOrUpdate(item: T): boolean {
        const query = `
        INSERT OR REPLACE INTO ${this.table} (${Object.keys(item).join(',')})
        VALUES (${Object.keys(item).map((_) => '?').join(', ')})`;
        const stmt = this.db.prepare(query);
        const result = stmt.run(Object.values(item));

        return !!result.changes;
    }

    public delete(condition: object): boolean {
        const query = `
        DELETE FROM ${this.table}
        WHERE ${Object.keys(condition).map((value) => `${value} = ? COLLATE NOCASE`).join(' AND ')}`;
        const stmt = this.db.prepare(query);
        const result = stmt.run(Object.values(condition));

        return !!result.changes;
    }

    public find(): T[] {
        const query = `SELECT * FROM ${this.table}`;
        const stmt = this.db.prepare(query);

        return stmt.all();
    }

    public findAllWhere(condition: object): T[] {
        const query = `
        SELECT * FROM ${this.table}
        WHERE ${Object.keys(condition).map((value) => `${value} = ? COLLATE NOCASE`).join(' AND ')}`;
        const stmt = this.db.prepare(query);

        return stmt.all(Object.values(condition));
    }

    public findOne(condition: object): T {
        const query = `
        SELECT * FROM ${this.table}
        WHERE ${Object.keys(condition).map((value) => `${value} = ? COLLATE NOCASE`).join(' AND ')}`;
        const stmt = this.db.prepare(query);

        return stmt.get(Object.values(condition));
    }
}
