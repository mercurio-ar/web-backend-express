import {
    Controller
} from '../../Controller';
import {
    visualizationsAdapterSelector,
    visualizationsServiceSelector
} from '../../../Selectors';

export class VisualizationsCreateCommand extends Controller {

    applyMiddleware(router) {
        router.use(this.createVisualizationHandler);
        return router;
    }

    createVisualizationHandler(req, res) {
        const seriesIds = visualizationsAdapterSelector(res).parse(req.body).seriesIds();
        visualizationsServiceSelector(res)
            .createVisualizationWithSeries(seriesIds)
            .then(vis => {
                res.json(
                    visualizationsAdapterSelector(res).serialize(vis)
                );
            });
    }
}
