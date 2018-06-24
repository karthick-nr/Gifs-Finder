import * as types from './../constants/actionTypes';

export default function gifsReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_GIFS_SUCCESS:
            return Object.assign({}, state, {
                gifs: action.gifs,
                gifsLoading: false,
                gifsLazyLoading: false
            });
        case types.LOAD_GIFS_INPROGRESS:
            return Object.assign({}, state, {
                gifsLoading: true
            });
        case types.LOAD_GIFS_LAZYLOADING_INPROGRESS:
            return Object.assign({}, state, {
                gifsLazyLoading: true
            });
        case types.LOAD_SEARCH_SUGGESTIONS_SUCCESS:
            return Object.assign({}, state, {
                searchSuggestions: action.suggestions
            });
        default:
            return state;
    }
}