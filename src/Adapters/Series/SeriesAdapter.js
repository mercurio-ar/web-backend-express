import defaultParsers from './Parsers';


export class SeriesAdapter {

    constructor(parsers = defaultParsers){
        this.parsers = parsers;
    }

    parse(thing){
        return this.parsers.find((parser) => parser.canParse(thing)).parse(thing);
    }
}
