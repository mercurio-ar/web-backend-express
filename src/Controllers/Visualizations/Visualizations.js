import { Controller } from '../Controller';
import { VisualizationsService } from '../../Services';
import { VisualizationsRepository } from '../../Repositories';
import { mongoDbConfigSelector } from '../../Selectors';

export class Visualizations extends Controller {

    constructor(...args){
        super(...args);

        this.visualizationsRepositoryMiddleware = this.visualizationsRepositoryMiddleware.bind(this);
        this.visualizationsServiceMiddleware = this.visualizationsServiceMiddleware.bind(this);
        this.getVisualizationsHandler = this.getVisualizationsHandler.bind(this);
    }

    applyMiddleware(router) {
        router.use(this.visualizationsRepositoryMiddleware);
        router.use(this.visualizationsServiceMiddleware);
        router.get('/', this.getVisualizationsHandler);
        return router;
    }

    getVisualizationsHandler(req, res, next){
        this.visualizationsServiceSelector(res)
            .getVisualizations()
            .then(res.json)
            .catch(next);
    }

    visualizationsServiceSelector(res){
        return res.locals.visualizationsService;
    }

    visualizationsServiceMiddleware(req, res, next){
        res.locals.visualizationsService = new VisualizationsService(
            this.visualizationsRepositorySelector(res)
        );
        next();
    }

    visualizationsRepositorySelector(res){
        return res.locals.visualizationRepository;
    }

    visualizationsRepositoryMiddleware(req, res, next){
        const mongoConfig = mongoDbConfigSelector(res);
        const visualizationsRepository = new VisualizationsRepository(mongoConfig);
        visualizationsRepository.connect().then((repository) => {
            res.locals.visualizationRepository = repository;
            next();
        }).catch(
            next
        );
    }
}
