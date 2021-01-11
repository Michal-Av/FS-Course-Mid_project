import React,{Component} from 'react'
import './Todos.css'


class TodosComp extends Component
{
  constructor()
  {
    super();
    this.state = {isCompleted: false ,  todo :{}}
  }

  componentDidMount()
  {
    this.setState({todo : this.props.todo})
  }


  // delete = () =>
  // {
  //   let id = this.props.user.id
  //   this.props.callbackDelete(id)
  // }

  markComp = () =>
  {
    let idTodo=this.props.todo.id
    // let obj = {id : this.props.user.id, name : this.state.name, email : this.state.email}
     this.props.callbackCompleted(idTodo)
  }

  // openData = () =>
  // {
  //   alert("open");
  //   this.props.callbacktodo
  // }

  render()
  {
    return(
      <div className={'card'} >
         Title  : {this.props.todo.title} <br/>
         <div className={"cardfill"}>
          <div className={"cardback"}>Completed  : {String(this.props.todo.completed)}</div>
          {!this.props.todo.completed && <div className={"cardcontinue"}><button className="button" onClick={this.markComp}>Mark Completed</button></div>}
         </div>
       <br />
    
      </div> 
    )
  }
}


export default TodosComp;