import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import './single-view-page.scss';
import TextBox from './../textbox/textbox';
import SuccessRibbon from './../successribbon/successribbon';

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
        this.state = {
            showHideSuccessRibbon: false
        };
        this.onImageClicked = this.onImageClicked.bind(this);
        this.copyToClipBoadCompleted = this.copyToClipBoadCompleted.bind(this);
    }

    /**
     * This method handles the URL copy to clipboard functionality.
     * @return null.
     */
    copyToClipBoadCompleted() {
        let textInput = document.getElementById("shareInput");
        textInput.select();
        document.execCommand("copy");
        this.setState({
            showHideSuccessRibbon: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    showHideSuccessRibbon: false
                });
            }, 3000);
        });
    }


    /**
     * This method handles the click event on the particular gif.
     * @param {e} -  value - event object from the component.
     * @return null.
     */
    onImageClicked(e) {
        e.preventDefault();
        return false;
    }
    /**
     * This method handles the Single View Page component rendering with the markup defined within the return statement.
     * @return {object} return the React component content to React DOM.
     */
    render() {
        let { intl } = this.props;
        return (
            <div className={"col-lg-12 col-md-12 col-sm-12 col-xs-12"}>
                {this.props.selectedGif &&
                    <React.Fragment>
                        <div className={"col-lg-6 col-md-6 col-sm-6 col-xs-12 column-6-wrapper"}>
                            <figure className="gif-single-view-item" style={{ top: "0px" }}>
                                <a onClick={this.onImageClicked}>
                                    <div size="tinygif" className="gif-wrapper">
                                        <img className="gif-image" src={this.props.selectedGif.media[0].gif.url}
                                            style={{
                                                backgroundColor: "#272c2a"
                                            }} />
                                    </div>
                                </a>
                            </figure>
                        </div>
                        <div className={"col-lg-6 col-md-6 col-sm-6 col-xs-12 column-6-wrapper"}>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 properties-fields">
                                <label data-lang-key="extraSupportBarsText">{intl.formatMessage({ id: "titleText" }) + " :"}</label>
                                <div id="customer-buildinggrid">{this.props.selectedGif.title}</div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 properties-fields">
                                <label data-lang-key="extraSupportBarsText">{intl.formatMessage({ id: "createdOn" }) + " :"}</label>
                                <div id="customer-buildinggrid">{new Intl.DateTimeFormat(this.props.locale.replace("_", "-"), {
                                    year: 'numeric', month: 'long', day: 'numeric',
                                    hour: 'numeric', minute: 'numeric', hour12: false
                                }).format(new Date(this.props.selectedGif.created))}</div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 properties-fields">
                                <label data-lang-key="extraSupportBarsText">{intl.formatMessage({ id: "dimensionsText" }) + " :"}</label>
                                <div id="customer-buildinggrid">{this.props.selectedGif.media[0].gif.dims.join("x")}</div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 properties-fields">
                                <label data-lang-key="extraSupportBarsText">{intl.formatMessage({ id: "sharesText" }) + " :"}</label>
                                <div id="customer-buildinggrid">{this.props.selectedGif.shares}</div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 properties-fields">
                                <label data-lang-key="extraSupportBarsText">{intl.formatMessage({ id: "gifUrlText" }) + " :"}</label>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <TextBox ref="shareInput" id="shareInput" name="shareInput"
                                    langKey="shareInput"
                                    enableSearchIcon={false}
                                    value={window.location.href}
                                    enableCopyToClipBoard={true}
                                    readOnly={true} />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button id={"download_gif_btn"}
                                    className={"button-wrapper"}
                                    onClick={this.copyToClipBoadCompleted}>
                                    {intl.formatMessage({ id: "copyText" })}
                                </button>
                                <a className={"button-wrapper"} href={(this.props.selectedGif.media[0].gif.url + "?itemid=" + this.props.selectedGif.id + "&download=true").replace("media.", "media1.")}
                                    download="true" target="_blank">{intl.formatMessage({ id: "downloadText" })}</a>
                            </div>
                        </div>
                    </React.Fragment>
                }
                <SuccessRibbon locale={this.props.locale}
                    showHideSuccessRibbon={this.state.showHideSuccessRibbon} />
            </div>
        );
    }
}

SingleViewPage.propTypes = {
    locale: PropTypes.string,
    intl: intlShape.isRequired,
    selectedGif: PropTypes.object,
    gifURL: PropTypes.string,
    copyToClipBoadCompleted: PropTypes.func
};

export default injectIntl(SingleViewPage);