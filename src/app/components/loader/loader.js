import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './loader.scss';
import { injectIntl, intlShape } from 'react-intl';

/**
 * Loader component is a standalone component used for creating a Windows Loader like component with user options.
 */
class Loader extends Component {
	/**
	 * This method handles the Loader component rendering with the markup defined within the return statement.
	 * @return {object} return the React component content to React DOM.
	 */
	render() {
		let { intl } = this.props;
		return (
			<div id={this.props.id + "_loader"} className="loader-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="loader-inner-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="loader-icon" />
					<div className="loader-text" data-lang-key={this.props.langKey}>{intl.formatMessage({ "id": this.props.langKey })}</div>
				</div>
			</div>
		);
	}
}

Loader.propTypes = {
	id: PropTypes.string,
	intl: intlShape.isRequired,
	langKey: PropTypes.string
};

export default injectIntl(Loader, { withRef: true });