export class Mercurio {
    
    constructor(express){
        this.express = express();

        this.express.get('/', function (req, res) {
            res.send('Hello World!');
        });
    }

    listen(...args){
        this.express.listen(...args);
    }
}
