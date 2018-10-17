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
import {
    AddSerieToVisualizationCommand
} from './AddSerieToVisualizationCommand';
import {
    VisualizationsUpdateCommand
} from './VisualizationsUpdateCommand';

export class VisualizationsCommandStack extends Controller {

    applyMiddleware(router) {
        router.use(bodyParser.json());
        router.post('/', this.createVisualization);
        router.delete('/:visualizationId', this.deleteVisualization);
        router.patch('/:visualizationId', this.updateVisualization);
        router.put('/:visualizationId', this.addSerieToVisualization);
        return router;
    }

    get createVisualization() {
        return this.makeRouter(VisualizationsCreateCommand);
    }

    get deleteVisualization() {
        return this.makeRouter(VisualizationsDeleteCommand);
    }

    get updateVisualization() {
        return VisualizationsUpdateCommand;
    }

    get addSerieToVisualization() {
        return this.makeRouter(AddSerieToVisualizationCommand);
    }
}
