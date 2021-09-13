import {LOG_IN, LOG_OUT} from "./actions";

const initialState = {
    isLoggedIn: false,
    user: null,
    isLoading: true
};

function reducer(state=initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return {
                isLoggedIn: true,
                user: action.payload.user
            }

        case LOG_OUT:
            return {
                isLoggedIn: false,
                user: null
            }
        default:
            return state;
    }
}

export default reducer;
