import {
    Controller,
} from '../../Controller';

import {
    visualizationsServiceSelector,
    visualizationsAdapterSelector,
} from '../../../Selectors';


export class GetCurrentUserVisualizationsCommand extends Controller {

    applyMiddleware(router) {
        router.use(this.handler);
        return router;
    }

    handler(req, res, next) {
        visualizationsServiceSelector(res)
            .getVisualizations()
            .then(result => {
                res.json(
                    visualizationsAdapterSelector(res).serialize(result)
                );
            })
            .catch(next);
    }
}
