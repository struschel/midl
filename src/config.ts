import Database from 'better-sqlite3';
import { resolve } from 'path';

export const db = new Database(resolve(__dirname, '../database.db'), { fileMustExist: true });
