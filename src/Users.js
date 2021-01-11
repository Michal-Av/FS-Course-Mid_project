import React,{Component} from 'react'
import OtherDataComp from './OtherData';
import './Users.css'

class UsersComp extends Component
{
  constructor()
  {
    super();
    this.state = {isOver: false, isChosen : false, name : "" , email : ""}
  }

  componentDidMount()
  {
    this.setState({name : this.props.user.name, email : this.props.user.email})
  }


  show = () =>
  {
    if(this.state.isOver===false)
      this.setState({isOver : true})
  }

  hide = () =>
  {
    if(this.state.isOver)
      this.setState({isOver : false})
  
  }

  delete = () =>
  {
    let id = this.props.user.id
    this.props.callbackDelete(id)
  }

  update = (data) =>
  {
    let obj = {id : this.props.user.id, name : this.state.name, email : this.state.email,
       address: data}
    this.props.callbackUpdate(obj)
  }

  openData = () =>
  {
  
  if(this.props.open && !this.state.isChosen)  //open
   {
    this.setState({isChosen : false});
   }
   else{ 
    if(this.state.isChosen)
    {
      this.setState({isChosen : false});
    }
    if(!this.state.isChosen)
    {
      this.setState({isChosen : true});
      
    }
    let id = this.props.user.id
    this.props.callbackData(id,this.state.isChosen)}
  // }
}

  closeData = () =>
  {
    this.setState({isChosen : false});
  }

  render()
  {
    let styleName="redStyle";
    if(this.props.notcompleted.includes(this.props.user.id))
    {   
      styleName = "redStyle"
    }
    else
    {
      styleName = "greenStyle"
    }

    let fillStyle="redStyle";
    if(this.props.notcompleted.includes(this.props.user.id))
    {   
      fillStyle = "redfillStyle"
    }
    else
    {
      fillStyle = "greenfillStyle"
    }

    return(
        
      <div className={this.state.isChosen ? fillStyle : styleName}  > 
         <div>
           {/* <input type="button" value="X" onClick={this.closeData} /> */}
         <div onClick={this.openData} >ID : {this.props.user.id}<br/></div></div>
         Name  : <input type="text" value={this.state.name} onChange={e => this.setState({name : e.target.value})} /> <br/>
         Email  : <input type="text" value={this.state.email} onChange={e => this.setState({email : e.target.value})} /> <br/>
       <br />
      <div className={"footer"}>
        <button className={"back"} onClick={this.hide} onMouseOver={this.show}>Other Data</button> {'  '}
        {this.state.isOver && <div> <br/> <OtherDataComp callbackdata={data => this.update(data)} address={this.props.user.address} /> <br/> </div>}
        <button className={"continue"} onClick={this.update}>Update</button>
        <button className={"continue"} onClick={this.delete}>Delete</button> 
      </div>
      <br />
    
      </div>
    )
  }
}


export default UsersComp;