import React from 'react';
import TodosList from './todos-list';
import CreateTodo from './create-todos';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

const todos =[
{
  task:'Learn React',
  isCompleted: false
},
{
  task: 'Go for a run',
  isCompleted: true
}
];

export default class App extends React.Component {
constructor(props) {
  super(props);
  this.state ={
      todos          //todos: todos with ES6 the same
  };
}
    render() {
        const headStyle = {
           color: 'violet',
        };
        return (
            <div style={headStyle} >
            <Jumbotron>
                <Grid>
                <h1>MY LIST</h1>
                <CreateTodo todos={this.state.todos } createTask={this.createTask.bind(this)} />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                 />
                 </Grid>
            </Jumbotron>
            </div>
        );
    }
    toggleTask(task) {
      const foundTodo =_.find(this.state.todos, todo => todo.task === task);
      foundTodo.isCompleted =!foundTodo.isCompleted;
      this.setState({ todos: this.state.todos });
    }
    createTask(task) {
      this.state.todos.push({
        task,
        isCompleted:false
      });
      this.setState({ todos: this.state.todos});

    }
    saveTask(oldTask, newTask) {
      const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
      foundTodo.task = newTask;
      this.setState({ todos: this.state.todos });
    }
    deleteTask(taskToDelete) {
      _.remove(this.state.todos, todo => todo.task === taskToDelete);
      this.setState({ todos: this.state.todos});
    }
}
