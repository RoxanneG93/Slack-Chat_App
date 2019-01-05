import * as actionTypes from '../actions/types';

const initialUserState = {
    currentUser: null,
    isLoading: true
};


const user_reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        default:
            return state;
    }
}