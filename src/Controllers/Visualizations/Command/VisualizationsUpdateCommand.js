import {
    visualizationsServiceSelector,
    visualizationsAdapterSelector
} from '../../../Selectors';

export function VisualizationsUpdateCommand(req, res) {
    const id = req.params.visualizationId;
    const visualization = visualizationsAdapterSelector(res).parse(req.body).visualization();
    visualizationsServiceSelector(res)
        .updateVisualization(Object.assign({}, visualization, {
            id
        }))
        .then(vis => {
            res.json(
                visualizationsAdapterSelector(res).serialize(vis)
            );
        });
}
