import {
    Controller
} from '../Controller';
import {
    seriesSearchServiceConfigSelector
} from '../../Selectors';
import {
    SeriesSearchService
} from '../../Services';

export class Search extends Controller {

    constructor(...args){
        super(...args);

        this.searchServiceMiddleware = this.searchServiceMiddleware.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    applyMiddleware(router) {
        router.use(this.searchServiceMiddleware);
        router.get('/', this.searchHandler);
        return router;
    }

    searchServiceMiddleware(req, res, next) {
        const searchServiceConfig = seriesSearchServiceConfigSelector(res);
        res.locals.searchService = new SeriesSearchService(searchServiceConfig);
        next();
    }

    searchHandler(req, res) {
        res.locals.searchService.search(req.query).then(result => {
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
