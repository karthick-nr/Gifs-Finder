import * as types from './../constants/actionTypes';
import api from './../api/searchApi';
/**
 * This method is used to handle work order loading progress
 */
export function loadGifsInProgress() {
    return { type: types.LOAD_GIFS_INPROGRESS };
}
/**
 * This method is used to load work order using lazy loading
 */
export function loadGifsLazyLoadingInProgress() {
    return { type: types.LOAD_GIFS_LAZYLOADING_INPROGRESS };
}
/**
 * This method is used to load work orders
 * @param  {array} - workOrders - response from workOrders api.
 */
export function loadGifsSuccess(gifs) {
    return { type: types.LOAD_GIFS_SUCCESS, gifs };
}
export function loadSearchSuggestionsSuccess(suggestions) {
    return { type: types.LOAD_SEARCH_SUGGESTIONS_SUCCESS, suggestions };
}
/**
 * This method is used to load all the work orders
 * @param  {string} - queryString - search query string to indicate the api call to load the work orders.
 * @param  {string} - authToken - authentication token from user response.
 * @param  {int} - limit - no of work orders to be loaded in the api call.
 * @param  {boolean} - lazyLoad - indicate whether the loading is kind of lazy loading.
 */
export function loadAllTrendingGifs(locale, limit, lazyLoad) {
    return function (dispatch) {
        if (!lazyLoad)
            dispatch(loadGifsInProgress());
        if (lazyLoad)
            dispatch(loadGifsLazyLoadingInProgress());
        return api.GetTendingGifs(locale, limit).then(gifs => {
            dispatch(loadGifsSuccess(gifs.results));
        }).catch(error => {
            throw (error);
        });
    };
}
/**
 * This method is used to load all the work orders
 * @param  {string} - queryString - search query string to indicate the api call to load the work orders.
 * @param  {string} - authToken - authentication token from user response.
 * @param  {int} - limit - no of work orders to be loaded in the api call.
 * @param  {boolean} - lazyLoad - indicate whether the loading is kind of lazy loading.
 */
export function loadAllGifs(queryString, locale, limit, lazyLoad) {
    return function (dispatch) {
        if (!lazyLoad)
            dispatch(loadGifsInProgress());
        if (lazyLoad)
            dispatch(loadGifsLazyLoadingInProgress());
        return api.GetGifs(queryString, locale, limit).then(gifs => {
            dispatch(loadGifsSuccess(gifs.results));
        }).catch(error => {
            throw (error);
        });
    };
}
export function loadSearchSuggestions(seachText, locale) {
    return function (dispatch) {
        return api.GetSearchSuggestions(seachText, locale).then(suggestions => {
            dispatch(loadSearchSuggestionsSuccess(suggestions.results));
        }).catch(error => {
            throw (error);
        });
    };
}