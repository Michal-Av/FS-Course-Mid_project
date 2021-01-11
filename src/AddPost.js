import React,{Component} from 'react'
import './Todos.css'


class AddPostComp extends Component
{
  constructor()
  {
    super();
    this.state = {title: "" ,  body : "" }
  }


  cancel = () =>
  {
    this.props.callbackCancel()
  }

  add = () =>
  {
    let title= this.state.title;
    let body = this.state.body;
    this.props.callbackAddPost(title, body)
  }


  render()
  {
    return(
    <div className={"cardAdd"}>
      <div className={"center"} >
         <div className={"cardfill"}>Title  : <input type="text" onChange={e => this.setState({title : e.target.value})} ></input></div><br/>
         <div className={"cardfill"}>Body  : <input type="text" onChange={e => this.setState({body : e.target.value})} ></input></div><br/>
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


export default AddPostComp;