import React, { Component } from 'react';
import { isEnterKey, noop } from './util';

export default class TodoItem extends Component {

    get title() {
        return this.state.item.title;
    }

    constructor(props) {
        super(props);

        this.onItemEdit = props.onItemEdit || noop;
        this.onDoneClick = props.onDoneClick || noop;

        this.enableEdition = this.enableEdition.bind(this);
        this.onSaveEdition = this.onSaveEdition.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onDone = this.onDone.bind(this);

        this.state = {
            isEditing: false,
            item: { ...props.item }
        };

        this.inputRef = React.createRef();
    }

    enableEdition() {
        this.setState({
            isEditing: true
        });

        setTimeout(() => {
            debugger
            this.inputRef.current.focus();
        }, 25);
    }

    onSaveEdition(event) {
        debugger

        if (!isEnterKey(event)) {
            return;
        }

        const title = event.current.value;

        if (!title) {
            return;
        }

        this.setState({
            isEditing: false,
            item: { id: new Date().getTime(), title }
        });

        this.onItemEdit({ ...this.state.item });
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
                    <span className={"todo-item-title"} onClick={this.enableEdition}>
                        {this.title}
                    </span>
                );
            }

            return (
                <span className={"todo-item-title"}>
                    <input ref={this.inputRef} value={this.title} onKeyDown={this.onSaveEdition} onBlur={this.onBlur} />
                </span>
            );
        })();

        return (
            <div className={"todo-item"}>
                {titleElement}
                <div className={"todo-item-action"}>
                    <button onClick={this.onDone} >Done</button>
                </div>
            </div>
        );
    }
}