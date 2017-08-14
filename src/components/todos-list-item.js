import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';


export default class TodosListItem extends React.Component {
    constructor(props){
      super(props);

      this.state={
        isEditing: false
      };
    }

    renderTaskSection(){
      const { task, isCompleted } = this.props;
      const taskStyle = {
        color: isCompleted ? 'lightgreen' : 'grey',
        cursor: 'pointer',
      };
      if (this.state.isEditing){
        return (
          <td>
            <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref ="editInput"/>
            </form>
          </td>
        );
      }
      return(
        <td style = {taskStyle}
          onClick={this.props.toggleTask.bind(this, task)}
        >
          {task}
        </td>
      );
    }
    renderActionSection(){
      if(this.state.isEditing){
        return(
          <td>
            <ButtonToolbar>
              <Button bsStyle="warning" bsSize="small" onClick={this.onSaveClick.bind(this)}>Save</Button>
              <Button bsStyle="info" bsSize="small" onClick={this.onCancelClick.bind(this)}>Cancel</Button>
              </ButtonToolbar>
          </td>
        );
      }
      return (
        <td>
          <ButtonToolbar>
          <Button bsStyle="info" bsSize="small" onClick={this.onEditClick.bind(this)}>Edit</Button>
          <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>          
          </ButtonToolbar>
        </td>
      );
    }
    //render the buttons
    render() {
      return (
              <tr>
                {this.renderTaskSection()}
                {this.renderActionSection()}
              </tr>
        );
    }
    onEditClick(){
      this.setState({isEditing: true});
    }
    onCancelClick(){
      this.setState({isEditing: false});
    }
    onSaveClick(event){
      event.preventDefault();

      const oldTask = this.props.task;
      const newTask =this.refs.editInput.value;
      this.props.saveTask(oldTask, newTask);
      this.setState({ isEditing: false});
    }
}
