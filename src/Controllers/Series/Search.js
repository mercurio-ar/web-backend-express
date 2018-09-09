import { Controller } from '../Controller';

export class Search extends Controller {

    applyMiddleware(router){
        router.get('/', function(req, res) {
            res.json({results: 'sarasa'});
        });
        return router;
    }
}
