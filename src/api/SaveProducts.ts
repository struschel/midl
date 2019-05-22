import fetch from 'node-fetch';
import { xml2json } from 'xml-js';
import { db } from '../config';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';
import { trim } from '../utilities/Utilities';

export const saveProducts = async () => {
    const data = await fetch('http://supermaco.starwave.nl/api/products');
    const res = await data.text();
    const body = xml2json(res, { compact: true, spaces: 4 });
    const json = JSON.parse(body).Products.Product;
    const products = json.reduce((acc: any, { _attributes: { Id }, ...rest }: any) => {
        const obj: any = {};
        for (const key of Object.keys(rest)) {
            obj[key] = rest[key]._text;
        }
        acc[Id] = obj;

        return acc;
    }, {});
    const repository = new ProductRepository(db, 'products');
    for (const [key, value] of Object.entries(products)) {
        const val: any = value;
        const product = new Product(
            key,
            trim(val.EAN),
            trim(val.Title),
            trim(val.Brand),
            trim(val.Shortdescription),
            trim(val.Fulldescription),
            trim(val.Image),
            trim(val.Weight),
            trim(val.Price),
            trim(val.Category),
            trim(val.Subcategory),
            trim(val.Subsubcategory)
        );
        repository.createOrUpdate(product);
    }
};