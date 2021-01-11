import React,{Component} from 'react'
import './OtherData.css'

class OtherDataComp extends Component
{
  constructor()
  {
    super();
    this.state = {address : {}, street : '', city : '', zipcode : 0}
  }

  componentDidUpdate()
  {
    let address = {street : '', city : '', zipcode : 0}
  }

  render()
  {

    return(   
    <div className="show" >
        Street   : <input type="text" value={this.props.address.street} onChange={e => this.setState({street : e.target.value})} /> <br/>
        City{' '}: <input type="text" value={this.props.address.city} onChange={e => this.setState({city : e.target.value})} /> <br/>
        Zip Code : <input type="text" value={this.props.address.zipcode} onChange={e => this.setState({zipcode : e.target.value})} /> <br/>
      <br />
    </div>
    )
  }
}


export default OtherDataComp;