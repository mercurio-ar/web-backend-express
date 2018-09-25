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
    VisualizationsService,
    SeriesService
} from '../../Services';
import {
    mongoDbConfigSelector,
    visualizationsRepositorySelector,
    seriesServiceSelector,
    seriesServiceConfigSelector,
    seriesAdapterSelector
} from '../../Selectors';
import {
    SeriesAdapter,
    VisualizationAdapter
} from '../../Adapters';
import {
    VisualizationsQueryStack
} from './Query';


export class Visualizations extends Controller {

    applyMiddleware(router) {
        router.use(this.seriesAdapterMiddleware);
        router.use(this.visualizationsAdapterMiddleware);
        router.use(this.visualizationsRepositoryMiddleware);
        router.use(this.seriesServiceMiddleware);
        router.use(this.visualizationsServiceMiddleware);
        router.use(this.visualizationsQueryStack);
        router.use(this.visualizationsCommandStack);
        return router;
    }

    seriesAdapterMiddleware(req, res, next) {
        res.locals.seriesAdapter = new SeriesAdapter();
        next();
    }

    visualizationsAdapterMiddleware(req, res, next) {
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
        res.locals.visualizationsService = new VisualizationsService({
            visualizationsRepository: visualizationsRepositorySelector(res),
            seriesService: seriesServiceSelector(res),
        });
        next();
    }

    seriesServiceMiddleware(req, res, next) {
        const seriesServiceConfig = seriesServiceConfigSelector(res);
        res.locals.seriesService = new SeriesService(Object.assign({},
            seriesServiceConfig, {
                seriesAdapter: seriesAdapterSelector(res)
            }
        ));
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
