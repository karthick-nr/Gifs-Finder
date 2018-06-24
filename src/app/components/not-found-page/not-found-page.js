import React, { Component } from 'react';

import './not-found-page.scss';

/**
 * NotFoundPage component is a standalone component used for unMatched Route page for the application.
 */
class NotFoundPage extends Component {    
	/**
	 * This method handles the NotFound Page component rendering with the markup defined within the return statement.
	 * @return {object} return the React component content to React DOM.
	 */
    render() {
        return (<div className="error-page" />);
    }
}

export default NotFoundPage;