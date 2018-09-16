export class VisualizationsService {

    constructor(visualizationsRepository){
        this.visualizationsRepository = visualizationsRepository;
    }

    getVisualizations() {
        return this.visualizationsRepository.getVisualizations();
    }
}
