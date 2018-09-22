import {
    Controller
} from '../../Controller';
import {
    visualizationsSerializerSelector,
    visualizationsServiceSelector
} from '../../../Selectors';
import {
    VisualizationSerializer
} from '../../../Serializers';

export class VisualizationsCreateCommand extends Controller {

    applyMiddleware(router) {
        router.use(this.serializerMiddleware);
        router.use(this.createVisualizationHandler);
        return router;
    }

    serializerMiddleware(req, res, next) {
        res.locals.visualizationSerializer = new VisualizationSerializer();
        next();
    }

    createVisualizationHandler(req, res) {
        const seriesIds = visualizationsSerializerSelector(res).parse(req.body).seriesIds();
        visualizationsServiceSelector(res)
            .createVisualizationWithSeries(seriesIds)
            .then(vis => {
                res.json(vis);
            });
    }
}
