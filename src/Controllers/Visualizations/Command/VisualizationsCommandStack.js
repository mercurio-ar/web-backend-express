import bodyParser from 'body-parser';

import {
    Controller
} from '../../Controller';
import {
    VisualizationsCreateCommand
} from './VisualizationsCreateCommand';

export class VisualizationsCommandStack extends Controller {

    applyMiddleware(router) {
        router.use(bodyParser.json());
        router.post('/', this.createVisualization);
        return router;
    }

    get createVisualization() {
        return this.makeRouter(VisualizationsCreateCommand);
    }
}
