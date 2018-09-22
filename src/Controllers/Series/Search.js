import {
    Controller
} from '../Controller';
import {
    seriesServiceConfigSelector
} from '../../Selectors';
import {
    SeriesService
} from '../../Services';

export class Search extends Controller {

    constructor(...args){
        super(...args);

        this.seriesServiceMiddleware = this.seriesServiceMiddleware.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    applyMiddleware(router) {
        router.use(this.seriesServiceMiddleware);
        router.get('/', this.searchHandler);
        return router;
    }

    seriesServiceMiddleware(req, res, next) {
        const seriesServiceConfig = seriesServiceConfigSelector(res);
        res.locals.seriesService = new SeriesService(seriesServiceConfig);
        next();
    }

    searchHandler(req, res) {
        res.locals.seriesService.search(req.query).then(result => {
            res.json(
                this.toMercurioSearchResult(result.data)
            );
        });
    }

    toMercurioSearchResult(seriesData){
        return seriesData.map(serieData => ({
            id: this.idSelector(serieData),
            displayName: this.displayNameSelector(serieData),
        }));
    }

    idSelector(serieData){
        return serieData.field.id;
    }

    displayNameSelector(serieData){
        return `${serieData.dataset.title} - ${serieData.field.description}`;
    }
}
