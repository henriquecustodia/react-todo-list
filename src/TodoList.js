import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { noop } from './util.js';

function isSameItems(nextItems, prevItems) {
    if (nextItems.length !== prevItems.length) {
        return false;
    }

    if (nextItems.length === 0 && prevItems.length === 0) {
        return true;
    }

    return nextItems.every((item, i) => {
        return prevItems[i] && prevItems[i].id === item.id;
    });
}

export default class TodoList extends Component {

    constructor(props) {
        super(props);

        this.onItemsChange = props.onItemsChange || noop;

        this.onDone = this.onDone.bind(this);
        this.onItemEdit = this.onItemEdit.bind(this);

        console.log('todo list constructor', props.items)

        this.state = {
            items: props.items ? [...props.items] : []
        }
    }

    componentDidUpdate(nextProps, prevProps) {
        console.log('todo list', nextProps.items)
        if (isSameItems(nextProps.items, prevProps.items)) {
            return;
        }

        console.log('componentDidUpdate', nextProps, prevProps)
        this.setState({
            items: [...nextProps.items]
        })
    }

    onDone(item) {
        const includedItems = this.state.items.filter(_ => _.id !== item.id);

        this.onItemsChange(includedItems);

        // this.setState({
        //     items: includedItems
        // });
    }

    onItemEdit(item) {
        const newItems = this.state.items.map(_ => {
            if (_.id === item.id) {
                return item;
            }

            return _;
        });

        this.onItemsChange(newItems);

        // this.setState({
        //     items: newItems
        // });
    }

    render() {
        const todoItems = this.state.items.map((item) => (
            <TodoItem
                key={item.id}
                item={item}
                onDoneClick={this.onDone}
                onItemEdit={this.onItemEdit}
            ></TodoItem>
        ));

        return (
            <div className={"todo-list"}>
                {todoItems}
            </div>
        );

    }

}
