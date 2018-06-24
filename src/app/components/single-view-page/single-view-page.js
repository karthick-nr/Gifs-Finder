import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import './single-view-page.scss';

/**
 * SingleViewPage component is a standalone component used for Landing page for the application.
 */
class SingleViewPage extends Component {
    /**
     * constructor function for the SingleViewPage component where the initial state and props are defined.
     * @param  {object} - props - initial props for the SingleViewPage component.
     * @return {object} - returns the SingleViewPage component instance.
     */
    constructor(props) {
        super(props);
        this.onImageClicked = this.onImageClicked.bind(this);
    }
    onImageClicked(e) {
        e.preventDefault();
        return false;
    }
    render() {
        let { intl } = this.props;
        return (
            <div className={"search-result-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12"}>
                {this.props.selectedGif &&
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <span> {intl.formatMessage({ "id": "searchGifText" }, { searchGifText: this.props.gifURL.split("-").splice(0, this.props.gifURL.split("-").length - 2).join(" ").charAt(0).toUpperCase() + this.props.gifURL.split("-").splice(0, this.props.gifURL.split("-").length - 2).join(" ").substr(1).toLowerCase() })}</span>
                        </div>
                        <figure className="gif-single-view-item" style={{ top: "0px" }}>
                            <a onClick={this.onImageClicked}>
                                <div size="tinygif" className="gif-wrapper">
                                    <img className="gif-image" src={this.props.selectedGif.media[0].tinygif.url}
                                        style={{
                                            backgroundColor: "#272c2a",
                                            height: "200px",
                                            width: "200px"
                                        }} />
                                </div>
                            </a>
                        </figure>
                    </div>
                }
            </div>
        );
    }
}

SingleViewPage.propTypes = {
    locale: PropTypes.string,
    intl: intlShape.isRequired,
    selectedGif: PropTypes.object,
    gifURL: PropTypes.string
};

export default injectIntl(SingleViewPage);