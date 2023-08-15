import logger from './logger';
import thunk from 'redux-thunk';

export const middleware = [thunk, logger];
