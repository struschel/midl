export interface Read<T> {
    find(): T[];
    findOne(condition: object): T;
    findAllWhere(condition: object): T[];
}
