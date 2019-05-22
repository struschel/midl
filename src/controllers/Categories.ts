import { Request, Response } from 'express';
import { db } from '../config';
import { ProductRepository } from '../repositories/ProductRepository';

const repository = new ProductRepository(db, 'products');
export const index = (_: Request, res: Response) => {

    res.render('categories', {
        title: 'Categorieen',
        categories: repository.getCategories(),
    });

};

export const category = (req: Request, res: Response) => {

    res.render('category', {
        title: 'Categorie',
        name: req.params.name.charAt(0).toUpperCase() + req.params.name.replace(/-/g, ', ').slice(1),
        // tslint:disable-next-line: max-line-length
        products: repository.findAllWhere({ category: req.params.name.charAt(0).toUpperCase() + req.params.name.replace(/-/g, ', ').slice(1) }),
        id: req.params.Id,
    });

};

export const product = (req: Request, res: Response) => {

    res.render('product', {
        title: 'Product',
        product: repository.findOne({ id: req.params.id }),
        id: req.params.id,
    });

}