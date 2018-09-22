import {
    Controller
} from '../../Controller';
import {
    visualizationsServiceSelector,
    visualizationsAdapterSelector
} from '../../../Selectors';

export class VisualizationsDeleteCommand extends Controller {

    applyMiddleware(router) {
        router.use(this.deleteVisualizationsHandler);
        return router;
    }
    
    deleteVisualizationsHandler(req, res) {
        const visualizationIds = visualizationsAdapterSelector(res).parse(req.body).visualizationsIds();
        visualizationsServiceSelector(res)
            .deleteVisualizations(visualizationIds)
            .then(() => {
                res.status(204).send();
            });
    }
}
