// @ts-check
import {
    Controller
} from '../../Controller';
import {
    visualizationsServiceSelector,
    visualizationsAdapterSelector,
} from '../../../Selectors';

export class AddSerieToVisualizationCommand extends Controller {

    applyMiddleware(router) {
        router.use('/:visualizationId', this.handler);
        return router;
    }

    handler(req, res, next) {
        const serieIds = visualizationsAdapterSelector(res).parse(req.body).seriesIds();
        const visualizationId = req.params.visualizationId;
        visualizationsServiceSelector(res)
            .addSeriesToVisualization(visualizationId, serieIds)
            .then(visualization => {
                res.json(
                    visualizationsAdapterSelector(res).serialize(visualization)
                );
            })
            .catch(next);
    }
}
