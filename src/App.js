import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

import './App.css';

export default class App extends Component {

  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
    this.onItemsChange = this.onItemsChange.bind(this);

    this.state = {
      items: []
    };
  }

  onSubmit(item) {
    this.setState({
      items: [...this.state.items, item]
    });

    setTimeout(() => {
      console.log('timeout', this.state.items);
    }, 100)
  }

  onItemsChange(items) {
    this.setState({
      items: items
    });
  }

  render() {
    console.log('render app', this.state.items);
    
    return (
      <div>
        <TodoInput onSubmit={this.onSubmit}></TodoInput>
        <TodoList items={this.state.items} onItemsChange={this.onItemsChange}></TodoList>
      </div>
    );
  }
}
