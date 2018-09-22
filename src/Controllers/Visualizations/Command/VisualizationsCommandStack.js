import bodyParser from 'body-parser';

import {
    Controller
} from '../../Controller';
import {
    VisualizationsCreateCommand
} from './VisualizationsCreateCommand';
import {
    VisualizationsDeleteCommand
} from './VisualizationsDeleteCommand';

export class VisualizationsCommandStack extends Controller {

    applyMiddleware(router) {
        router.use(bodyParser.json());
        router.post('/', this.createVisualization);
        router.delete('/', this.deleteVisualization);
        return router;
    }

    get createVisualization() {
        return this.makeRouter(VisualizationsCreateCommand);
    }

    get deleteVisualization() {
        return this.makeRouter(VisualizationsDeleteCommand);
    }
}
