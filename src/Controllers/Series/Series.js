import { Controller } from '../Controller';
import { Search } from './Search';

export class Series extends Controller {

    applyMiddleware(router){
        router.use('/search', this.search);
        return router;
    }

    get search(){
        return this.makeRouter(Search);
    }
}
