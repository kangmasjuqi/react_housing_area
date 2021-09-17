import { combineReducers } from 'redux';
import unitReducer from './unit/unit.reducer';

const rootReducer = combineReducers({
    unit: unitReducer
});

export default rootReducer;
