import {Schema} from 'mongoose';

export const VisualizationSchema = new Schema({
    name: String,
    series: [String]
});
