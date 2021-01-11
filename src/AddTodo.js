import React,{Component} from 'react'
import './Todos.css'


class AddTodoComp extends Component
{
  constructor()
  {
    super();
    this.state = {title: "" ,  todo :{}}
  }

  cancel = () =>
  {
    this.props.callbackCancel()
  }

  add = () =>
  {
    let newT= this.state.title;
    this.props.callbackAddTodo(newT)
  }


  render()
  {
    return(
    <div className={"cardAdd"}>
      <div className={"center"} >
         <div className={"cardfill"}>Title  : <input type="text" onChange={e => this.setState({title : e.target.value})} ></input></div><br/>
         <div className={"cardfill"}>
          <div className={"cardback"}><button className="button" onClick={this.cancel}>Cancel</button></div>
          <div className={"cardcontinue"}><button className="button" onClick={this.add}>Add</button></div>
         </div>
       <br />
    
      </div> 
    </div>
    )
  }
}


export default AddTodoComp;