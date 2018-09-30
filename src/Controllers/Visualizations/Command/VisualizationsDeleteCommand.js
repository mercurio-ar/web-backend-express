import {
    Controller,
} from '../../Controller';

import {
    visualizationsServiceSelector,
} from '../../../Selectors';


export class VisualizationsDeleteCommand extends Controller {

    applyMiddleware(router) {
        router.use('/:visualizationId', this.handler);
        return router;
    }
    
    handler(req, res) {
        const visualizationIds = req.params.visualizationId;
        visualizationsServiceSelector(res)
            .deleteVisualizations(visualizationIds)
            .then(() => {
                res.status(204).send();
            });
    }
}
