import cors from 'cors';

import { Controller, Series, Visualizations } from './Controllers';


export class Mercurio extends Controller {
    
    constructor(express, config){
        super(express);
        this.config = config;

        this.configMiddleware = this.configMiddleware.bind(this);
    }

    applyMiddleware(app) {
        this.config.cors && app.use(cors());
        app.use(this.configMiddleware);
        app.use('/series', this.series);
        app.use('/visualizations', this.visualizations);
        return app;
    }

    configMiddleware(req, res, next){
        res.locals.config = this.config;
        next();
    }

    listen(...args){
        this.applyMiddleware(this.express()).listen(...args);
    }

    get series(){
        return this.makeRouter(Series);
    }

    get visualizations(){
        return this.makeRouter(Visualizations);
    }
}
