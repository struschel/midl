import bodyParser from 'body-parser';
import express from 'express';
import { join } from 'path';
import * as categoriesController from './controllers/Categories';
import * as homeController from './controllers/Home';
import * as searchController from './controllers/Search';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.init();
        this.routes();
    }

    private init(): void {
        this.app.set('view engine', 'ejs');
        this.app.set('views', join(__dirname, '../views'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private routes(): void {
        this.app.get('/', homeController.index);
        this.app.get('/categories', categoriesController.index);
        this.app.get('/categories/:name', categoriesController.category);
        this.app.get('/product/:id', categoriesController.product);
        this.app.post('/search/', searchController.search);
        // this.app.post('/search:name', searchController.search);
    }
}

export default new App().app;
