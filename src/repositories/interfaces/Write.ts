export interface Write<T> {
    create(item: T): boolean;
    update(item: object, condition: object): boolean;
    createOrUpdate(item: T): boolean;
    delete(condition: object): boolean;
}
