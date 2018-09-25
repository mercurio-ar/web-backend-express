export class VisualizationsService {

    constructor({
        visualizationsRepository,
        seriesService
    }) {
        this.visualizationsRepository = visualizationsRepository;
        this.seriesService = seriesService;

        this.completeSeries = this.completeSeries.bind(this);
    }

    getVisualizations() {
        return this.visualizationsRepository
            .getVisualizations()
            .then(this.completeSeries);
    }

    /*
    [{id, name, series: [string]}] -> [{id, name, series: [serie]}]
    */
    completeSeries(visualizations) {
        const seriesIds = visualizations.reduce((prev, curr) => prev.concat(curr.series), []);

        return this.seriesService.getSeriesById(seriesIds)
            .then((series) => this._mapSeriesIds(visualizations, series));
    }

    _mapSeriesIds(visualizations, series) {
        return visualizations.map((visualization) => this._mapVisualizationSeries(visualization, series));
    }

    _mapVisualizationSeries(visualization, series) {
        const mapped = visualization.series.map((serieId) =>
            series.find((serie) =>
                serie.id == serieId
            ));

        return Object.assign({}, visualization.toObject(), {
            series: mapped
        });
    }

    createVisualizationWithSeries(seriesIds) {
        this._validateSeries(seriesIds);
        return this.visualizationsRepository
            .createVisualization(this._defaultName(), seriesIds)
            .then(this.completeSeries);
    }

    deleteVisualizations(visualizationsIds) {
        return this.visualizationsRepository.deleteVisualizationsById(visualizationsIds);
    }

    _defaultName() {
        return 'New Visualization';
    }

    _validateSeries(series) {
        const invalid = !!series.find(serie => typeof serie != 'string');
        if (invalid) {
            throw Error('Expected Array of string to create visualization');
        }
    }
}
