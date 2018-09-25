import Axios from 'axios';
import mongoose from 'mongoose';

export default {
    port: 3001,
    cors: true,
    db: {
        mongo: {
            mongoose,
            uri: 'mongodb://root:example@localhost:27017/admin'
        }
    },
    services: {
        series: {
            baseUrl: 'http://apis.datos.gob.ar/',
            http: Axios,
        }
    },
};
