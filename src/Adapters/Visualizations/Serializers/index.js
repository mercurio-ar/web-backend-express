import {
    VisualizationSerializer as VS,
} from './VisualizationSerializer';
import {
    VisualizationsSerializer as VSS,
} from './VisualizationsSerializer';

export const VisualizationSerializer = VS;
export const VisualizationsSerializer = VSS;

export default [
    VisualizationSerializer,
    VisualizationsSerializer,
];
