// @ts-check
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
import { AddSerieToVisualizationCommand } from './AddSerieToVisualizationCommand';

export class VisualizationsCommandStack extends Controller {

    applyMiddleware(router) {
        router.use(bodyParser.json());
        router.post('/', this.createVisualization);
        router.delete('/:visualizationId', this.deleteVisualization);
        router.put('/:visualizationId', this.addSerieToVisualization);
        return router;
    }

    get createVisualization() {
        return this.makeRouter(VisualizationsCreateCommand);
    }

    get deleteVisualization() {
        return this.makeRouter(VisualizationsDeleteCommand);
    }

    get addSerieToVisualization() {
        return this.makeRouter(AddSerieToVisualizationCommand);
    }
}
