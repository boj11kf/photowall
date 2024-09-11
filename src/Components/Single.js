import React, { Component } from "react";
import Photo from "./Photo";
import Comments from "./Comments";

class Single extends Component {
  render() {
    const { match, posts } = this.props;
    const id = Number(match.params.id);
    const post = posts.find((post) => post.id === id);
    // megnézzzük, hogy a logikai művelet előtti érték undefined-e
    // ha igen, akkor létrehozunk egy üres array-t
    // ha nem, akkor a comments megkapja a valós értéket
    // a lényeg tehát, hogy a comments ne lehessen undefined
    const comments = this.props.comments[id] || [];
    const index = this.props.posts.findIndex((post) => post.id === id);

    if (this.props.loading === true) {
      return <div className="loader">...loading</div>;
    } else if (post) {
      return (
        <div className="single-photo">
          <Photo
            post={post}
            {...this.props}
            index={index} /*disable click function helyett, a Photo komponensben a Link to= "/"-el kezdődjön fixen*/
          />
          <Comments
            startAddingComment={this.props.startAddingComment}
            comments={comments}
            id={id}
          />
        </div>
      );
    } else {
      return <h1>...no post found </h1>
    }
  }
}

export default Single;
