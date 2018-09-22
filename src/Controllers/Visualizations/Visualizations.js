import {
    VisualizationsCommandStack
} from './Command';
import {
    Controller
} from '../Controller';
import {
    VisualizationsRepository
} from '../../Repositories';
import {
    VisualizationsService
} from '../../Services';
import {
    mongoDbConfigSelector,
    visualizationsRepositorySelector
} from '../../Selectors';
import {
    VisualizationAdapter
} from '../../Adapters';
import {
    VisualizationsQueryStack
} from './Query';


export class Visualizations extends Controller {

    applyMiddleware(router) {
        router.use(this.visualizationsRepositoryMiddleware);
        router.use(this.visualizationsServiceMiddleware);
        router.use(this.adapterMiddleware);
        router.use(this.visualizationsQueryStack);
        router.use(this.visualizationsCommandStack);
        return router;
    }

    adapterMiddleware(req, res, next) {
        res.locals.visualizationAdapter = new VisualizationAdapter();
        next();
    }

    get visualizationsCommandStack() {
        return this.makeRouter(VisualizationsCommandStack);
    }

    get visualizationsQueryStack() {
        return this.makeRouter(VisualizationsQueryStack);
    }

    visualizationsServiceMiddleware(req, res, next) {
        res.locals.visualizationsService = new VisualizationsService(
            visualizationsRepositorySelector(res)
        );
        next();
    }

    visualizationsRepositoryMiddleware(req, res, next) {
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
