import * as types from './../constants/actionTypes';
import api from './../api/searchApi';
/**
 * This method is used to handle gifs loading progress
 */
export function loadGifsInProgress() {
    return { type: types.LOAD_GIFS_INPROGRESS };
}
/**
 * This method is used to load gifs using lazy loading
 */
export function loadGifsLazyLoadingInProgress() {
    return { type: types.LOAD_GIFS_LAZYLOADING_INPROGRESS };
}
/**
 * This method is used to load gifs
 * @param  {array} - gifs - response from gifs api.
 */
export function loadGifsSuccess(gifs) {
    return { type: types.LOAD_GIFS_SUCCESS, gifs };
}
export function loadSearchSuggestionsSuccess(suggestions) {
    return { type: types.LOAD_SEARCH_SUGGESTIONS_SUCCESS, suggestions };
}
/**
 * This method is used to load all trending gifs
 * @param  {string} - queryString - search query string to indicate the api call to load the gifs.
 * @param  {int} - limit - no of gifs to be loaded in the api call.
 * @param  {boolean} - lazyLoad - indicate whether the loading is kind of on demand lazy loading.
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
 * This method is used to load all the gifs
 * @param  {string} - queryString - search query string to indicate the api call to load the gifs.
 * @param  {int} - limit - no of gifs to be loaded in the api call.
 * @param  {boolean} - lazyLoad - indicate whether the loading is kind of on demand lazy loading.
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

/**
 * This method is used to load all the gifs
 * @param  {string} - seachText - search query string to indicate the api call to load the suggestions.
 * @param  {string} - locale - string to indicate the search text language.
 */
export function loadSearchSuggestions(seachText, locale) {
    return function (dispatch) {
        return api.GetSearchSuggestions(seachText, locale).then(suggestions => {
            dispatch(loadSearchSuggestionsSuccess(suggestions.results));
        }).catch(error => {
            throw (error);
        });
    };
}