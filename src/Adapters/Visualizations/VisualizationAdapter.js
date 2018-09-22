import defaultParsers from './Parsers';
import defaultSerializers from './Serializers';

export class VisualizationAdapter {

    constructor(parsers = defaultParsers, serializers = defaultSerializers) {
        this.parsers = parsers;
        this.serializers = serializers;
    }

    parse(thing) {
        return this.parsers
            .map(parser => new parser(thing))
            .find(parser => parser.canParse());
    }

    serialize(thing) {
        return this.serializers
            .find(serializer => serializer.canSerialize(thing))
            .serialize(thing);
    }
}
