import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Photo(props) {
  const post = props.post;
  return (
    <figure className="figure">
      <Link to={`/single/${post.id}`}>
        <img className="photo" src={post.imageLink} alt={post.description} />
      </Link>
      <figcaption>
        <p> {post.description} </p>
      </figcaption>
      <div className="button-container">
        <button
          onClick={() => {
            props.startRemovingPost(props.index, post.id);
            props.history.push("/");
          }}
        >
          Remove
        </button>
        <Link className="button" to={`/single/${post.id}`}>
          <div className="comment-count">
            <div className="speech-bubble"> </div>
            {props.comments[post.id] ? props.comments[post.id].length : 0}
          </div>
        </Link>
      </div>
    </figure>
  );
}
//export default Photo;

// felsorolom kódszinten, hogy milyen property-k,
// (tag attribútumok) azok amik szerepelnek tageknél,
// és megadom azok typusát (object, func), fontosságát (isRequired)
Photo.propTypes = {
  post: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    posts: state,
  };
}
export default connect(mapStateToProps)(Photo);

/// ugyanaz csak osztályokkal

/*
import React, { Component } from "react";
 class Photo extends Component {
  render() {
    const post = this.props.post;
    return (
      <figure className="figure">
        <img className="photo" src={post.imageLink} alt={post.description} />
        <figcaption>
          <p> {post.description} </p>
        </figcaption>
        <div className="button-container">
        <button className="remove-button">Remove</button>
        </div>
      </figure>
    );
  }
} */
