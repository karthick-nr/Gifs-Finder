import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import * as searchActions from "../../actions/gifsActions";
import './search-page.scss';
import TextBox from './../textbox/textbox';
import Loader from './../loader/loader';
import SingleViewPage from './../single-view-page/single-view-page';

/**
 * WorkOrders component class is created to display the Work orders based on the Work Orders response generated.
 */
class SearchPage extends Component {
    /**
     * constructor function for the SearchPage component where the initial state and props are defined.
     * @param  {object} - props - initial props for the SearchPage component.
     * @return {object} - returns the SearchPage component instance.
     */
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchLimit: 24
        };
        this.completeTextSearch = this.completeTextSearch.bind(this);
        this.onImageClicked = this.onImageClicked.bind(this);
    }
    /**
     * This method handles the component props and state update before the initial component mounting on the React DOM.
     * @return {object} returns updated props and state of the component before render method.
     */
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.loadAllTrendingGifs(this.props.locale, this.state.searchLimit);
        window.onscroll = () => {
            if (this.state.searchLimit < 48 && this.props.gifs && this.props.gifs.length >= this.state.searchLimit && (window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
                this.setState({ searchLimit: this.state.searchLimit + 24 }, () => {
                    if (this.state.searchText == "")
                        this.props.actions.loadAllTrendingGifs(this.props.locale, this.state.searchLimit, true);
                    else
                        this.props.actions.loadAllGifs(this.state.searchText, this.props.locale, this.state.searchLimit, true);
                });
            }
        };
    }

	/**
     * This method handles the component props when props values are newly updated.
     * @return {object} returns updated props of the component before render method.
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.gifs != undefined && nextProps.gifs !== this.props.gifs) {
            this.setState({ gifs: nextProps.gifs });
        }
    }
    /**
     * This method handles the component props and state update before the component unmounting on the React DOM.
     * @return null.
     */
    componentWillUnmount() {
        window.onscroll = null;
    }

    /**
     * This method handles the search textbox typing completed functionality.
     * @param {object} -  value - event object from the component.
     * @return null.
     */
    completeTextSearch(value, suggestionSelcted) {
        if (value != "") {
            this.setState({ searchText: value, searchLimit: suggestionSelcted ? 24 : this.state.searchLimit }, () => {
                if (value != "") {
                    if (suggestionSelcted)
                        this.props.actions.loadAllGifs(this.state.searchText, this.props.locale, this.state.searchLimit);
                    else
                        this.props.actions.loadSearchSuggestions(this.state.searchText, this.props.locale);
                }
            });
        }
    }
    onImageClicked(e) {
        let target = e.currentTarget ? e.currentTarget : e.target;
        e.preventDefault();
        browserHistory.push(target.getAttribute("data-href"));
        return false;
    }
    /**
     * This method handles the Work Orders component rendering with the markup defined within the return statement.
     * @return {object} return the React component content to React DOM.
     */
    render() {
        let { intl } = this.props;
        let top = 0;
        return (
            <div className="search-page-wrapper">
                <div className="search-page-container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 search-box-wrapper">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <TextBox ref="searchBox" id="searchBox" name="searchBox"
                                    langKey="searchText"
                                    placeHolder={intl.formatMessage({ "id": "searchText" })}
                                    enableSearchIcon={true} value={this.state.searchText}
                                    onChange={this.completeTextSearch}
                                    dataSource={this.props.searchSuggestions} />
                            </div>
                        </div>
                        {!this.props.routeParams.gifURL &&
                            <div className={"search-result-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12"}>
                                {!this.props.gifsLoading &&
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <span> {intl.formatMessage({ "id": "searchCategoryText" }, { searchQuery: this.state.searchText != "" ? this.state.searchText : "Trending" })}</span>
                                    </div>
                                }
                                {!this.props.gifsLoading && this.props.gifs && this.props.gifs.length > 0 &&
                                    <div className="gif-list-wrapper">
                                        <div className="column-wrapper">
                                            {this.props.gifs.map((a, i) => {
                                                let t = top;
                                                top += 200;
                                                return (
                                                    <figure key={"gifs_figure_" + i} className="gif-list-item" style={{ top: t + "px" }}>
                                                        <a onClick={this.onImageClicked} data-href={"/gifs/" + a.itemurl.replace("https://tenor.com/view/", "")}>
                                                            <div size="tinygif" className="gif-wrapper">
                                                                <img className="gif-image" src={a.media[0].tinygif.url}
                                                                    style={{
                                                                        backgroundColor: "#272c2a",
                                                                        height: "200px",
                                                                        width: "280px"
                                                                    }} />
                                                            </div>
                                                        </a>
                                                    </figure>
                                                );
                                            })
                                            }
                                        </div>
                                    </div>
                                }
                                {this.props.gifsLoading &&
                                    <div className="searchpage-loader-wrapper">
                                        <Loader id="wo-loader" langKey={(this.props.gifsLoading ? "loadingText" : "loadingMoreText")} />
                                    </div>
                                }
                            </div>
                        }
                        {this.props.routeParams.gifURL && this.props.gifs && this.props.gifs.length > 0 &&
                            <div className={"search-result-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12"}>
                                <SingleViewPage gifURL={this.props.routeParams.gifURL} selectedGif={this.props.gifs.filter((a) => { return a.id = this.props.routeParams.gifURL.split("-")[this.props.routeParams.gifURL.split("-").length - 1]; })[0]} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
SearchPage.propTypes = {
    locale: PropTypes.string,
    intl: intlShape.isRequired,
    gifs: PropTypes.array,
    actions: PropTypes.object.isRequired,
    gifsLoading: PropTypes.bool,
    gifsLazyLoading: PropTypes.bool,
    searchSuggestions: PropTypes.array,
    routeParams: PropTypes.object
};

function mapStateToProps(state) {
    return {
        gifs: state.gifsReducer.gifs,
        gifsLoading: state.gifsReducer.gifsLoading,
        gifsLazyLoading: state.gifsReducer.gifsLazyLoading,
        searchSuggestions: state.gifsReducer.searchSuggestions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(searchActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(injectIntl(SearchPage, { withRef: true }));