import { Controller } from '../Controller';
import { VisualizationsService } from '../../Services';
import { VisualizationsRepository } from '../../Repositories';
import { mongoDbConfigSelector } from '../../Selectors';
import { VisualizationsQueryStack } from './Query';
import { visualizationsRepositorySelector } from '../../Selectors';

export class Visualizations extends Controller {

    applyMiddleware(router) {
        router.use(this.visualizationsRepositoryMiddleware);
        router.use(this.visualizationsServiceMiddleware);
        router.use(this.visualizationsQueryStack);
        return router;
    }

    get visualizationsQueryStack() {
        return this.makeRouter(VisualizationsQueryStack);
    }

    visualizationsServiceMiddleware(req, res, next){
        res.locals.visualizationsService = new VisualizationsService(
            visualizationsRepositorySelector(res)
        );
        next();
    }

    visualizationsRepositoryMiddleware(req, res, next){
        const mongoConfig = mongoDbConfigSelector(res);
        const visualizationsRepository = new VisualizationsRepository(mongoConfig);
        visualizationsRepository.connect().then(() => {
            res.locals.visualizationRepository = visualizationsRepository;
            next();
        }).catch(
            next
        );
    }
}
