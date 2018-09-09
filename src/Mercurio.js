import { Controller, Series } from './Controllers';

export class Mercurio extends Controller {
    
    applyMiddleware(app) {
        app.use('/series', this.series);
        return app;
    }

    listen(...args){
        this.applyMiddleware(this.express()).listen(...args);
    }

    get series(){
        return this.makeRouter(Series);
    }
}
