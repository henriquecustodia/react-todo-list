import React, { Component } from 'react';
import { isEnterKey, noop } from './util';

export default class TodoItem extends Component {

    constructor(props) {
        super(props);

        this.onItemEdit = props.onItemEdit || noop;
        this.onDoneClick = props.onDoneClick || noop;

        this.enableEdition = this.enableEdition.bind(this);
        this.onSaveEdition = this.onSaveEdition.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onDone = this.onDone.bind(this);

        this.state = {
            isEditing: false,
            item: { ...props.item },
            title: props.item.title,
        };

        this.inputRef = React.createRef();
    }

    enableEdition() {
        this.setState({
            isEditing: true
        });

        setTimeout(() => {
            this.inputRef.current.focus();
        }, 25);
    }

    onSaveEdition(event) {
        if (!isEnterKey(event)) {
            return;
        }

        const title = event.target.value;

        if (!title) {
            return;
        }

        const mergedItem = { ...this.state.item, title }

        this.setState({
            title,
            isEditing: false,
            item: { ...mergedItem }
        });

        this.onItemEdit({ ...mergedItem });
    }

    onChange({ target }) {
        this.setState({
            title: target.value
        });
    }

    onBlur() {
        this.setState({
            isEditing: false
        });
    }

    onDone() {
        this.onDoneClick({ ...this.state.item });
    }

    render() {
        const titleElement = (() => {
            if (this.state.isEditing) {
                return (
                    <span className="todo-item-title">
                        <input ref={this.inputRef} value={this.state.title} onKeyDown={this.onSaveEdition} onBlur={this.onBlur} onChange={this.onChange} />
                    </span>
                );
            }

            return (
                <span className="todo-item-title" onClick={this.enableEdition}>
                    {this.state.title}
                </span>
            );
        })();

        return (
            <div className="todo-item">
                {titleElement}
                <div className="todo-item-action">
                    <button onClick={this.onDone} >Done</button>
                </div>
            </div>
        );
    }
}