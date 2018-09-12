import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import * as localStore from './localStore'


class App extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoList: localStore.load('todoList') || []
    }
  }
  // componentDidMount() {
  //   localStore.save('todoList', this.state.todoList)
  // }

  render() {
    let todos = this.state.todoList.filter((item,index)=> !item.deleted).map((item,index) => {
      return ( 
        <li key={ index }>
          <TodoItem todo={item} 
          onToggle={this.toggle.bind(this)}
          onDelete={this.delete.bind(this)}/>
        </li>
      )
    })
    return (
      <div className="App">
            <h1>My To-todo-list</h1>
      <div className="inputWrapper">
      <TodoInput content={this.state.newTodo} 
                 onSubmit={this.addTodo.bind(this)}
                 onChange={this.changeTitle.bind(this)}
      />
      </div>
      <ol className="todoList">
          {todos}
      </ol>
      </div>
    )
  }
  addTodo(event) {
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
    localStore.save('todoList', this.state.todoList)
  }
  changeTitle(e){
      this.setState({
        newTodo: e.target.value,
        todoList: this.state.todoList
      })
      localStore.save('todoList', this.state.todoList)
  }
  toggle(e, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state) 
    localStore.save('todoList', this.state.todoList)
  }
  delete(event, todo){
    todo.deleted = true
    this.setState(this.state) 
    localStore.save('todoList', this.state.todoList)
  }
  

}

export default App;
 let id = 0
 function idMaker(){
  id += 1
  return id
}