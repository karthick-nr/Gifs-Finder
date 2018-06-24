import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './app/components/App';
import SearchPage from './app/components/search-page/search-page';
import NotFoundPage from './app/components/not-found-page/not-found-page';

export default (
    <Route path="/" history={browserHistory} component={App} >
        <IndexRoute component={SearchPage} />
        <Route path="gifs/:gifURL" component={SearchPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);