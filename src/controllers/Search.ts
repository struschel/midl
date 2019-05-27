import { Request, Response } from 'express';
import { db } from '../config';
import { ProductRepository } from '../repositories/ProductRepository';

const repository = new ProductRepository(db, 'products');

export const index = (req: Request, res: Response) => {

    res.render('search', {
        title: 'Zoeken',
        products: repository.find(),
    });

};

export const search = (req: Request, res: Response) => {
    res.render('search', {
        title: 'Zoeken',
        products: repository.search(req.body.name),
    });
};
