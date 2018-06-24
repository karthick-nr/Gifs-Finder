import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './textbox.scss';

/**
 * TextBox component is a standalone component used for creating a HTML text input with user options.
 */
class TextBox extends Component {
    /**
     * constructor function for the TextBox component where the initial state and props are defined.
     * @param  {object} - props - initial props for the TextBox component.
     * @return {object} - returns the TextBox component instance.
     */
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			dataSource: this.props.dataSource || [],
			openSuggestions: false
		};
		this.onChange = this.onChange.bind(this);
		this.selctionComplete = this.selctionComplete.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onDocumentClickHandler = this.onDocumentClickHandler.bind(this);
	}
	componentDidMount() {
		document.addEventListener("click", this.onDocumentClickHandler);
	}
	/**
     * This method handles the component props when props values are newly updated.
     * @return {object} returns updated props of the component before render method.
     */
	componentWillReceiveProps(nextProps) {
		if (nextProps.value != undefined && nextProps.value !== this.props.value) {
			this.setState({ value: nextProps.value });
		}
		if (nextProps.dataSource != undefined && nextProps.dataSource !== this.props.dataSource) {
			this.setState({ dataSource: nextProps.dataSource });
		}
	}

    /**
     * This method handles the component props and state update before the component unmounting on the React DOM.
     * @return null.
     */
	componentWillUnmount() {
		window.onscroll = null;
		document.removeEventListener("click", this.onDocumentClickHandler);
	}


    /**
     * This method handles the document Click functionality to hide the pop up when clicked outside it.
   	 * @param  {object} - e - event object from the element.
     * @return null.
     */
	onDocumentClickHandler(e) {
        let target = e.currentTarget ? e.currentTarget : e.target;
		if (target && target.classList && target.classList.value.indexOf("text-dropdown-container-list") == -1) {
			this.setState({
				openSuggestions: false
			});
		}
	}
	/**
 	* This method handles the onChange functionality of the Textbox component and set the component value in state and return to the user specified callback function.
 	* @param {object} - e - event object from the DOM for the particular textbox component.
  	* @return calback function.
 	*/
	onChange(e) {
		let target = e.currentTarget ? e.currentTarget : e.target;
		this.setState({
			value: target.value,
			openSuggestions: true
		}, () => {
			if (this.props.onChange)
				this.props.onChange(this.state.value);
		});
	}
	onFocus() {
		this.setState({
			openSuggestions: true
		});
	}
	selctionComplete(e) {
		this.setState({
			value: e,
			openSuggestions: false
		}, () => {
			if (this.props.onChange)
				this.props.onChange(this.state.value, true);
		});
	}
	/**
	 * This method handles the TextBox component rendering with the markup defined within the return statement.
	 * @return {object} return the React component content to React DOM.
	 */
	render() {
		return (
			<div id={this.props.id} className={"text-input-wrapper"}>
				<div className={"text-input-container"}>
					<input
						type="text" className={"text-input"}
						name={this.props.name}
						id={this.props.id} value={this.state.value}
						onChange={this.onChange}
						placeholder={this.props.placeHolder}
						onFocus={this.onFocus}
						onBlur={this.onBlur} />
					{this.props.enableSearchIcon &&
						<span className="search-icon" />
					}
				</div>
				{this.state.dataSource.length > 0 && this.state.openSuggestions &&
					<div className={"text-dropdown-container"}>
						<ul>
							{this.state.dataSource.map((a, i) => {
								return (
									<li className={"text-dropdown-container-list"} key={"autocomplete_" + i} onClick={() => this.selctionComplete(a)} >
										<span className="language-text">
											{a}
										</span>
									</li>
								);
							})
							}
						</ul>
					</div>
				}
			</div>
		);
	}
}

TextBox.propTypes = {
	name: PropTypes.string,
	id: PropTypes.string,
	placeHolder: PropTypes.string,
	onChange: PropTypes.func,
	locale: PropTypes.string,
	value: PropTypes.any,
	enableSearchIcon: PropTypes.bool,
	langKey: PropTypes.string,
	dataSource: PropTypes.array
};

export default TextBox;
