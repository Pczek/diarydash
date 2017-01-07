import React, {
	Component,
	PropTypes,
} from 'react';

import {Editor, EditorState, RichUtils} from 'draft-js';
import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;
import Immutable from 'immutable';

const blockRenderMap = Immutable.Map({
	'unstyled': {
		element: 'p',
	}
});

class DDEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {editorState: EditorState.createEmpty()};
		this.focus = () => this.refs.editor.focus();
		this.logState = () => console.log(this.state.editorState.toJS());
		this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
	}

	componentDidMount() {
		this.focus();
	}


	customBindings(e) {
		console.log('e.keyCode', e.keyCode);
		if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
			return 'save';
		}
		if (e.keyCode === 68 /* `D` key */ && hasCommandModifier(e)) {
			return 'log';
		}
		return getDefaultKeyBinding(e);
	}

	handleKeyCommand(command) {
		console.log('command', command);
		if (command === 'log') {
			this.logState();
			return 'handled';
		}
		// const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
		// if (newState) {
		// 	this.onChange(newState);
		// 	return 'handled';
		// }
		return 'not-handled';
	}

	render() {
		const style = {
			lineHeight: "1.5", // The standard line height of 1.5 is considered ideal for setting body text
			borderLeftStyle: "solid",
			borderLeftWidth: "1px",
			borderLeftColor: "#eeeeee",
			paddingLeft: "0.5em",
		};
		return (
			<div style={style}>
				<Editor
					editorState={this.state.editorState}
					handleKeyCommand={this.handleKeyCommand}
					onChange={this.onChange}
					keyBindingFn={this.customBindings}
					blockRenderMap={blockRenderMap}
					ref="editor"
				/>
			</div>
		);
	}
}

DDEditor.propTypes = {};
DDEditor.defaultProps = {};

export default DDEditor;
