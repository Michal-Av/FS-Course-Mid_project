import React,{Component} from 'react'
import './Users.css'


class AddUserComp extends Component
{
  constructor() 
  {
    super();
    this.state = {name: "" ,  email : "" }
  }


  cancel = () =>
  {
    this.props.callbackCancel()
  }

  add = () =>
  {
    let name= this.state.name;
    let email = this.state.email;
    let address = {street : '', city : '', zipcode : 0}
    this.props.callbackAddUser(name, email, address)
  }


  render()
  {
    return(
      <div > 
         Name  : <input type="text" onChange={e => this.setState({name : e.target.value})} /> <br/><br/>
         Email  : <input type="text" onChange={e => this.setState({email : e.target.value})} /> <br/>
       <br />
      <div className={"footer"}>
        <div  className={"leftCard"}>
        <button className={"continue"} onClick={this.cancel}>Cancel</button>
        <button className={"continue"} onClick={this.add}>Add</button> 
      </div>
      </div>
      <br />
    
      </div>
    )
  }
}
export default AddUserComp;