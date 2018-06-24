import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import "./successribbon.scss";

/**
 * This ribbon is used to show success message
 */
class SuccessRibbon extends Component {
    /**
     * Initialise state and bind functions
     * @param {*} props - Initial props sent to component
     */
    constructor(props) {
        super(props);
        this.state = {
            showHideSuccessRibbon: false
        };
        this.hideRibbon = this.hideRibbon.bind(this);
    }

    /**
     * Updates component state whenever new props are received
     * @param {*} nextProps - Next set of props
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.showHideSuccessRibbon != undefined && nextProps.showHideSuccessRibbon !== this.props.showHideSuccessRibbon) {
            this.setState({
                showHideSuccessRibbon: nextProps.showHideSuccessRibbon
            });
        }
    }

    /**
     * Function for hiding ribbon
     */
    hideRibbon() {
        this.setState({
            showHideSuccessRibbon: false
        });
    }

    /**
     * This method handles the Success Ribbon component rendering with the markup defined within the return statement.
     * @return {object} return the React component content to React DOM.
     */
    render() {
        let { intl } = this.props;
        return (
            <div className={"save-ribbon-wrapper " + (this.state.showHideSuccessRibbon ? "show-success-ribbon" : "hide-success-ribbon")} >
                <div>
                    <span>{intl.formatMessage({ id: "copiedText" })}</span>
                    <span onClick={this.hideRibbon} className="success-ribbon-close">X</span>
                </div>
            </div>
        );
    }
}

SuccessRibbon.propTypes = {
    intl: intlShape.isRequired,
    showHideSuccessRibbon: PropTypes.bool
};

export default injectIntl(SuccessRibbon, { withRef: true });