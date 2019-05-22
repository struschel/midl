import fetch from 'node-fetch';
import { xml2json } from 'xml-js';
import { db } from '../config';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

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
            val.EAN ? val.EAN.trim() : val.EAN,
            val.Title ? val.Title.trim() : val.Title,
            val.Brand ? val.Brand.trim() : val.Brand,
            val.Shortdescription ? val.Shortdescription.trim() : val.Shortdescription,
            val.Fulldescription ? val.Fulldescription.trim() : val.Fulldescription,
            val.Image ? val.Image.trim() : val.Image,
            val.Weight ? val.Weight.trim() : val.Weight,
            val.Price ? val.Price.trim() : val.Price,
            val.Category ? val.Category.trim() : val.Category,
            val.Subcategory ? val.Subcategory.trim() : val.Subcategory,
            val.Subsubcategory ? val.Subsubcategory.trim() : val.Subsubcategory);
        repository.createOrUpdate(product);
    }
};
