import development from './development';
import production from './production';
import testing from './testing';

const env = process.env.NODE_ENV;

let current;

switch (env) {
case 'development': {current = development; break;}
case 'production': {current = production; break;}
case 'testing': {current = testing; break;}
default: {current = development; break;}
}

export default Object.assign({}, current);
