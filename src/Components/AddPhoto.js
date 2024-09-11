import React, { Component } from "react";

class AddPhoto extends Component {

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }
  handleSubmit(event){
    event.preventDefault();
    const imageLink = event.target.elements.link.value;
    const description = event.target.elements.description.value;
    const post = {
        id: Number(new Date()), 
        description: description,
        imageLink: imageLink,
    }

    if(description && imageLink){
        this.props.startAddingPost(post)
        // a Post gomb megnyomása után, az URL.t változtassa /-re
        // ezzel visszalépve a kezdőlapra
        this.props.history.push('/')
    }

  }  

  render() {
    return (
      <div>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="link" name="link"/>
            <input type="text" placeholder="Description" name="description"/>
            <button>Post</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddPhoto;
