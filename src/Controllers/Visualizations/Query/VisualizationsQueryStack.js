import {
    Controller,
} from '../../Controller';

import {
    GetCurrentUserVisualizationsCommand,
} from './GetCurrentUserVisualizationsCommand';


export class VisualizationsQueryStack extends Controller {

    applyMiddleware(router) {
        router.get('/', this.getCurrentUserVisualizations);
        return router;
    }

    get getCurrentUserVisualizations() {
        return this.makeRouter(GetCurrentUserVisualizationsCommand);
    }
}
