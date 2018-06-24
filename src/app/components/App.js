// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import en_Messages from './../../translations/en_GB';
import de_Messages from './../../translations/de_DE';
import { config } from './../../config';
import Header from "./header/header";

addLocaleData([...de]);

/**
 * App component is a standalone component which the application start file.
 */
class App extends Component {
    /**
     * constructor function for the App component where the initial state and props are defined.
     * @param  {object} - props - initial props for the App component.
     * @return {object} - returns the App component instance.
     */
    constructor(props) {
        super(props);
        this.state = {
            locale: config.locale,
            language: config.language
        };
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }
	/**
 	* This method handles language change functionality in the header component and update the component state, this method is the callback passed to Header componenet.
 	* @param {object} - newState - event object from the DOM for the particular element.
  	* @return boolean.
 	*/
    handleLanguageChange(e) {
        this.setState({
            language: e.language,
            locale: e.locale
        });
    }

	/**
	 * This method handles the App component rendering with the markup defined within the return statement.
	 * @return {object} return the React component content to React DOM.
	 */
    render() {
        let messages;
        switch (this.state.locale) {
            case 'en_GB':
                messages = en_Messages;
                break;
            case 'de_DE':
                messages = de_Messages;
                break;
        }
        if (window.Intl) {
            return (
                <IntlProvider locale={this.state.language} messages={messages}>
                    <div className="gif-finder-wrapper">
                        <Header handleLanguageChange={this.handleLanguageChange} locale={this.state.locale} languages={config.languages} language={this.state.language} />
                        {React.Children.map(this.props.children, (child) => { return React.cloneElement(child, { locale: this.state.locale }); })}
                    </div>
                </IntlProvider>
            );
        } else {
            return null;
        }
    }
}

App.propTypes = {
    children: PropTypes.object
};

export default App;