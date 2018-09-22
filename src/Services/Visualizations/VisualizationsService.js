export class VisualizationsService {

    constructor(visualizationsRepository) {
        this.visualizationsRepository = visualizationsRepository;
    }

    getVisualizations() {
        return this.visualizationsRepository.getVisualizations();
    }

    createVisualizationWithSeries(series) {
        this._validateSeries(series);
        return this.visualizationsRepository
            .createVisualization(this._defaultName(), series);
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
