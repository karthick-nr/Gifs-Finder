import ajax from 'superagent';
import { config } from './../../config';
import utils from './../utils/utils';

class API {
    static GetTendingGifs(locale, limit) {
        return new Promise(function (resolve, reject) {
            ajax.get(config.apiEndPoint + "trending?key=" + config.authKey + "&locale=" + locale + "&limit=" + (limit ? limit : 24) + "&anonid=" + utils.anonid() + "&media_filter=minimal")
                .end((error, response) => {
                    if (!error && response) {
                        resolve(response.body);
                    } else {
                        reject(error);
                    }
                });
        });
    }

    static GetSearchSuggestions(searchText, locale) {
        return new Promise(function (resolve, reject) {
            ajax.get(config.apiEndPoint + "autocomplete?tag=" + searchText + "&key=" + config.authKey + "&locale=" + locale + "&anonid=" + utils.anonid())
                .end((error, response) => {
                    if (!error && response) {
                        resolve(response.body);
                    } else {
                        reject(error);
                    }
                });
        });
    }

    /****************************************************************
     * This method is used to get the WorkOrders.
     * @param  {string} - authToken - authentication token from user response.
     * @param  {string} - queryString - selector to match the records in the api.
     * @param  {integer} - recordLimit - no of records to be returned from api.
     ****************************************************************/
    static GetGifs(queryString, locale, limit) {
        return new Promise(function (resolve, reject) {
            ajax.get(config.apiEndPoint + "search?key=" + config.authKey + "&locale=" + locale + "&limit=" + (limit ? limit : 24) + "&anonid=" + utils.anonid() + "&media_filter=minimal" + "&q=" + queryString)
                .end((error, response) => {
                    if (!error && response) {
                        resolve(response.body);
                    } else {
                        reject(error);
                    }
                });
        });
    }
}

export default API;
