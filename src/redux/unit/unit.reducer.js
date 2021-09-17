import {
    CREATEBOOKING
} from './unit.types';

const INITIAL_STATE = {
    unit: [],
    unitDetail: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATEBOOKING:
            return {
                ...state
            };
        default: return state;
    }
};

export default reducer;
