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

    constructor(...args) {
        super(...args);

        this.serializerMiddleware = this.serializerMiddleware.bind(this);
        this.createVisualizationHandler = this.createVisualizationHandler.bind(this);
    }

    applyMiddleware(router) {
        router.use(this.serializerMiddleware);
        router.use(this.createVisualizationHandler);
        return router;
    }

    serializerMiddleware(req, res, next) {
        res.locals.visualizationSerializer = this.visualizationSerializer();
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

    visualizationSerializer() {
        this._visualizationSerializer = this._visualizationSerializer || new VisualizationSerializer();
        return this._visualizationSerializer;
    }
}
