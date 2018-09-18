import defaultParsers from './Parsers';

export class VisualizationSerializer {
    
    constructor(parsers){
        this.parsers = parsers || defaultParsers;
    }

    parse(thing){
        return this.parsers.map(parser => new parser(thing)).find(parser => parser.canParse());
    }
}
