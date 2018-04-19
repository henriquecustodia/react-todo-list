import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import Storage from './storage';

import './App.css';

export default class App extends Component {

  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.onItemsChange = this.onItemsChange.bind(this);

    this.state = {
      items: Storage.getItems() || []
    };
  }

  onSubmit(item) {
    const items = [...this.state.items, item];
    
    Storage.setItems(items);
    
    this.setState({
      items: items
    });
  }

  onItemsChange(items) {

    Storage.setItems(items);
    
    this.setState({
      items: items
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Todo List Using React</h1>
        <TodoInput onSubmit={this.onSubmit}></TodoInput>
        <TodoList items={this.state.items} onItemsChange={this.onItemsChange}></TodoList>
      </div>
    );
  }
}
