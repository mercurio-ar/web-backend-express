import { NotImplementedException } from '../Exceptions';

export class Controller {
    
    constructor(express){
        this.express = express;
    }

    applyMiddleware(){
        throw new NotImplementedException();
    }

    makeRouter(klass){
        return (new klass(this.express)).router;
    }

    get router(){
        return this.applyMiddleware(this.express());
    }
}
