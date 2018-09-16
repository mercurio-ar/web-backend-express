import { Controller } from '../Controller';
import { VisualizationsService } from '../../Services';

export class Visualizations extends Controller {

    constructor(...args){
        super(...args);

        this.visualizationsServiceMiddleware = this.visualizationsServiceMiddleware.bind(this);
        this.getVisualizationsHandler = this.getVisualizationsHandler.bind(this);
    }

    applyMiddleware(router) {
        router.use(this.visualizationsServiceMiddleware);
        router.get('/', this.getVisualizationsHandler);
        return router;
    }

    getVisualizationsHandler(req, res){
        res.json(
            this.visualizationsServiceSelector(res).getVisualizations()
        );
    }

    visualizationsServiceSelector(res){
        return res.locals.visualizationsService;
    }

    visualizationsServiceMiddleware(req, res, next){
        res.locals.visualizationsService = new VisualizationsService();
        next();
    }
}
