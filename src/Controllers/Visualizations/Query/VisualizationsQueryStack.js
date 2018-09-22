import {
    Controller,
} from '../../Controller';
import {
    visualizationsServiceSelector,
    visualizationsAdapterSelector,
} from '../../../Selectors';

export class VisualizationsQueryStack extends Controller {

    applyMiddleware(router) {
        router.get('/', this.getVisualizationsHandler);
        return router;
    }

    getVisualizationsHandler(req, res, next) {
        visualizationsServiceSelector(res)
            .getVisualizations()
            .then(result => {
                res.json(
                    visualizationsAdapterSelector(res)
                        .serialize(result)
                );
            })
            .catch(next);
    }
}
