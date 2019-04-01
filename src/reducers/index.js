import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
    currentUser: null,
    isLoading: true
};


const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

// Setting first channel state to null
const initialChannelState = {
    currentChannel: null
}

// reducer to switch betwen channels
const channel_reducer = (state = initialChannelState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload.currentChannel
            }
        default: return state;
    }
}

// combine reducers method creates an object that lets us combine reducer to user globally?
const rootReducer = combineReducers({
    user: user_reducer,
    channel: channel_reducer
});

export default rootReducer;