import Axios from 'axios';
import mongoose from 'mongoose';

export default {
    port: 3001,
    cors: true,
    db: {
        mongo: {
            mongoose,
            uri: 'mongodb://root:example@localhost:8081/mercurio'
        }
    },
    series:{
        services:{
            search:{
                http: Axios,
                searchEndpoint: 'http://apis.datos.gob.ar/series/api/search/'
            }
        }
    }
};
