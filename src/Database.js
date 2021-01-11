import React,{Component} from 'react'
import axios from 'axios';
import './Database.css'
import TodosComp from './Todos'
import PostsComp from './Posts'
import UsersComp from './Users'
import AddTodoComp from './AddTodo';
import AddPostComp from './AddPost'
import AddUserComp from './AddUser'

class DatabaseComp extends Component
{
  constructor()
  {
    super();
    this.state = {searchLine: "", users : [] , userId : 0 , isDataShowed : false, cardtodoShow: true, 
                   cardpostShow : true, addNewUser : false, counter : 0,
                   todos : [] , posts : [] , isComplete : [], todosUser : [], postsUser : []}
  }

   componentDidMount()
   {
     console.log('Component mount');
      axios.get("https://jsonplaceholder.typicode.com/users/")
      .then(resp =>  this.setState({users : resp.data}))

      axios.get("https://jsonplaceholder.typicode.com/todos/")
      .then(resp =>  this.setState({todos : resp.data}))

      axios.get("https://jsonplaceholder.typicode.com/posts/")
      .then(resp =>  this.setState({posts : resp.data}))
    
   }
  
   componentDidUpdate(prevProps,prevState)
   {
    let userTodos= this.state.todos.filter(x => x.completed === false);
    var itemsDup = userTodos.map(i => i.userId);
    //console.log(itemsDup);
    let items = itemsDup.filter((value, index)=>itemsDup.indexOf(value)===index)
    if(prevState.isComplete === this.state.isComplete)
    {
        this.setState({isComplete : items}) ;
        //console.log(this.state.isComplete)
    } 
   }
  /************Users************* */
  update = (new_user) =>
  {
    let newUsers=this.state.users
    var user = newUsers.find(x => x.id === new_user.id);
    if (user) 
    {
       user.name = new_user.name;
       user.email = new_user.email;
       //user.address = new_user.address;
    }
    console.log("update!")
    this.setState({users : newUsers})
  }

  delete = (id_user) =>
  {
    let newUsers=this.state.users
    newUsers.forEach((element,index) => {
      if(element.id === id_user)
      var deletedItem = newUsers.splice(index,1);
      this.setState({users : newUsers })
    });
  }

  openAddUser = () =>
  {
    this.setState({isDataShowed : false, addNewUser : true})
  }

  addUser = (name, email, address) =>
  {
    let newId = this.state.users.length+1;
    let obj = {id : newId, name : name, email : email, address : address}
    this.state.users.push(obj);
    this.setState({addNewUser : false})
  }

  canceluser = () =>
  {
    this.setState({addNewUser : false})
  }

  openData = (id_user,flag) => 
  { 
    if(!flag)
    {
      this.setState({isDataShowed : true, userId : id_user })
      let userTodos= this.state.todos.filter(x => x.userId === id_user);
      this.setState({todosUser : userTodos});
      let userPosts= this.state.posts.filter(x => x.userId === id_user);
      this.setState({postsUser : userPosts});
    }
    else this.setState({isDataShowed : false, userId : id_user })
  }
  /************Todos************* */
  todocompleted =(id_todo)=>
  {
    let newTodo=this.state.todos
    var todo = newTodo.find(x => x.id === id_todo);
    if (todo) 
    {
       todo.completed=true;
    }
   this.setState({todos : newTodo})
  }
  openTodo = () =>
  {
    this.setState({cardtodoShow : false})
  }
  addTodo = (title) =>
  {
    let newId= this.state.todos.length+1;
    console.log(newId);
        // this.state.userId
    let obj= {userId : this.state.userId, id : newId, title : title, completed : false }
    console.log(obj)
    this.state.todos.push(obj);
    this.state.todosUser.push(obj);
    this.setState({cardtodoShow : true})//close add window
  }

  canceltodo =() =>
  {
    this.setState({cardtodoShow : true})
  }
   /************Posts************* */
  openPost = () =>
  {
    this.setState({cardpostShow : false})
  }

  addPost = (title,body) =>
  {
    let newId= this.state.posts.length+1;
    //console.log(newId);
        // this.state.userId
    let obj= {userId : this.state.userId, id : newId, title : title, body : body }
    //console.log(obj)
    this.state.posts.push(obj);
    this.state.userPosts.push(obj);
    this.setState({cardpostShow : true})
  }
  
  cancelpost =() =>
  {
    this.setState({cardpostShow : true})
  }
  render()
  { 
    let todo_items = this.state.todosUser.map((item,index) =>
    {
      return <div key={index}> <TodosComp todo={item} callbackCompleted={data => this.todocompleted(data)}/>  <br/></div>      
    })

    let post_items = this.state.postsUser.map((item,index) =>
    {
      return <div key={index}> <PostsComp post={item}/>  <br/></div>      
    })
    
    let user_items = this.state.users.map((item,index) =>
    {
      if(this.state.searchLine.length < 2)
      {
      return <div key={index}> <UsersComp open={this.state.isDataShowed} user={item} notcompleted={this.state.isComplete}
                                  callbackDelete={data => this.delete(data)}
                                  callbackUpdate={data => this.update(data)}   
                                  callbackData={(data,show) => this.openData(data,show)} />
                                  <br/></div>  
                                      
    }
      else if(item.name.includes(this.state.searchLine) || item.email.includes(this.state.searchLine))
      {
        return <div key={index}><UsersComp  open={this.state.isDataShowed} user={item} notcompleted={this.state.isComplete}
                                  callbackDelete={data => this.delete(data)}
                                  callbackUpdate={data => this.update(data)}   
                                  callbackData={(data,counter) => this.openData(data,counter)} />
                                  <br/></div>  
      } 
      else return null;
    })
  
    return (
      <div className="container">
        <div className="left">
          <div className="center">
          <div  className={"cardfill"}>
            <div className={"cardback"}><input type="text" onChange={e => this.setState({searchLine : e.target.value})} /></div>
            <div className={"cardcontinue"}><input className="button" type="button" value="Add" onClick={this.openAddUser}></input></div>
          </div>
          <br/>
          {user_items}
          <br/>
          </div>
        </div>
        {this.state.isDataShowed && <div>
          {this.state.cardtodoShow ? (<div>
          <div className="title"><br/>
            <div  className={"cardfill"}>
              <div className={"cardback"}>Todos - User {this.state.userId}</div>
              <div className={"cardcontinue"}><input className="button" type="button" value="Add" onClick={this.openTodo}></input></div>
            </div>
          </div>
          <br/>
          <div className="right">
            <div className="center">
            {todo_items}
            </div>
            </div>
          </div>) : 
          (<div> 
            <br/>
            <div className={"title"}>New Todos - User {this.state.userId}</div><br/>
            <div className={"right"}>
            <div className="center">
              <AddTodoComp callbackAddTodo={data => this.addTodo(data)} callbackCancel={this.canceltodo} />
            </div>
            </div>
          </div>)}
          {this.state.cardpostShow ? (<div>
            <div className="title"><br/>
            <div  className={"cardfill"}>
              <div className={"cardback"}>Posts - User {this.state.userId}</div>
              <div className={"cardcontinue"}><input className="button" type="button" value="Add" onClick={this.openPost}></input></div>
            </div>
          </div>
          <br/>
        <div className="right">
          <div className="center">
          {post_items}
          </div>
        </div>
        </div>) : 
          (<div> 
            <br/>
            <div className={"title"}>New Post - User {this.state.userId}</div><br/>
            <div className={"right"}>
            <div className="center">
              <AddPostComp callbackAddPost={(title,body) => this.addPost(title,body)} callbackCancel={this.cancelpost} />
            </div>
            </div>
          </div>)}
        </div>}
        {this.state.addNewUser && <div> 
            <br/><br/><br/><br/><br/>
            <div className={"title"}>Add New User</div><br/>
            <div className={"right"}>
            <div className={"center"}>
              <AddUserComp callbackAddUser={(name,email,address) => this.addUser(name,email,address)} callbackCancel={this.canceluser} />
            </div>
            </div>
          </div>}
      </div>
    ) 
  }
}

export default DatabaseComp;