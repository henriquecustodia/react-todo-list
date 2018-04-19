import React, { Component } from 'react';
import { noop, isEnterKey } from './util';

export default class TodoInput extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = props.onSubmit || noop;

        this.onChange = this.onChange.bind(this);
        this.onEnter = this.onEnter.bind(this);

        this.state = {
            text: ''
        }
    }

    _clearInput() {
        this.setState({
            text: ''
        });
    }

    onEnter(event) {
        if (!isEnterKey(event)) {
            return;
        }

        this.onSubmit({
            id: new Date().getTime(),
            title: this.state.text
        });
    }

    onChange({ target }) {
        const text = target.value

        if (!text) {
            return;
        }

        this.setState({
            text
        });
    }

    render() {
        return (
            <div className="todo-input">
                <input type="text"
                    placeholder="Adicione uma tarefa"
                    value={this.state.text}
                    onChange={this.onChange}
                    onKeyDown={this.onEnter}
                />
            </div>
        );
    }

}
