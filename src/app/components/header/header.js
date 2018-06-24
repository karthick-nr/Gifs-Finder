import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './header.scss';
/**
 * Header component is a standalone component used for creating a HTML Header component with dynamic user defined options.
 */
class Header extends Component {
    /**
     * constructor function for the Header component where the initial state and props are defined.
     * @param  {object} - props - initial props for the Header component.
     * @return {object} - returns the Header component instance.
     */
    constructor(props) {
        super(props);
        this.state = {
            locale: this.props.locale,
            language: this.props.language
        };
        this.languageHandler = this.languageHandler.bind(this);
    }

    /**
     * This method handles the component props when props values are newly updated.
     * @param  {object} - nextProps - next set of props for the Checkbox component.
     * @return {object} returns updated props of the component before render method.
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.locale != this.props.locale) {
            this.setState({
                locale: nextProps.locale
            });
        }
        if (nextProps.language != this.props.language) {
            this.setState({
                locale: nextProps.language
            });
        }
    }
    /**
     * This method handles the setting the language from the component.
     * @param  {object} - e - event object from the element.
     * @return callback function.
     */
    languageHandler(e) {
        this.setState({
            locale: e.locale,
            language: e.language
        }, () => {
            if (this.props.handleLanguageChange)
                this.props.handleLanguageChange({ locale: this.state.locale, language: this.state.language });
        });
    }
	/**
	 * This method handles the Header component rendering with the markup defined within the return statement.
	 * @return {object} return the React component content to React DOM.
	 */
    render() {
        return (
            <div className="header-container">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <a id="Logo" className="logo-icon" href="/" />
                    </div>
                    <div id="applicationName" className="col-lg-8 col-md-8 col-sm-8 col-xs-8" data-lang-key="applicationName">
                        <span className="application-text-logo" />
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 language-select-wrapper">
                        {this.props.languages.length > 0 &&
                            <ul>
                                {this.props.languages.map((a, i) => {
                                    return (
                                        <li key={"lang_sel_" + i} >
                                            <a onClick={() => this.languageHandler({ locale: a.locale, language: a.language })}>
                                                <span className="language-text">
                                                    {a.text}
                                                </span>
                                                {i !== (this.props.languages.length - 1) &&
                                                    <span>
                                                        {" | "}
                                                    </span>
                                                }
                                            </a>
                                        </li>
                                    );
                                })
                                }
                            </ul>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    locale: PropTypes.string,
    language: PropTypes.string,
    languages: PropTypes.array,
    handleLanguageChange: PropTypes.func
};

export default Header;