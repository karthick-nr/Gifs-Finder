// Set up your root reducer here...
import { combineReducers } from 'redux';
import gifsReducer from './gifsReducer';

const appReducer = combineReducers({
    gifsReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;