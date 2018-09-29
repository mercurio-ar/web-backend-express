import {
    VisualizationSchema
} from '../../Schemas';

export class VisualizationsRepository {

    constructor({
        mongoose,
        uri
    }) {
        this.mongoose = mongoose;
        this.uri = uri;
    }

    connect() {
        return this.mongoose.connect(this.uri, {
            useNewUrlParser: true,
        }).then(() => {
            this.model = this.mongoose.model('Visualizations', VisualizationSchema);
            return arguments;
        });
    }

    disconnect() {
        this.mongoose.disconnect();
    }

    getVisualizations() {
        return this.model.find().exec();
    }

    createVisualization(name, series) {
        return this.model.create({
            name,
            series
        });
    }

    deleteVisualizationsById(visualizationsIds) {
        return this.model.deleteMany({
            _id: {
                $in: visualizationsIds
            }
        });
    }

    addSeriesToVisualizationById(visualizationId, seriesIds) {
        return this.model.findByIdAndUpdate(visualizationId, {
            $addToSet: {
                series: {
                    $each: seriesIds
                }
            }
        }, {
            new: true
        });
    }
}
