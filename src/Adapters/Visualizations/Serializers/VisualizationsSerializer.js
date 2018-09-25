import {
    VisualizationSerializer,
} from './';

export class VisualizationsSerializer {

    static canSerialize(things) {
        return things.reduce((prev, curr) => {
            return prev && VisualizationSerializer.canSerialize(curr);
        }, true);
    }

    static serialize(visualizations) {
        return visualizations
            .map(visualization => VisualizationSerializer.serialize(visualization));
    }
}
