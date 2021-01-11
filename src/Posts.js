import React,{Component} from 'react'
import './Todos.css'


class PostsComp extends Component
{
  constructor()
  {
    super();
    this.state = { post :{}}
  }

  componentDidMount()
  {
    this.setState({post : this.props.post})
  }

  render()
  {
    return(
      <div className={'card'} >
         Title  : {this.props.post.title} <br/>
         Body  : {this.props.post.body}
       <br />
    
      </div> 
    )
  }
}


export default PostsComp;