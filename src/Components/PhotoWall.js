import React from "react";
import Photo from "./Photo";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// anchor tag, hred attribute
function PhotoWall(props) {
  return (
    <div>
      {/*Link: kattintásra a linkhez fűzi a to attribútum értékét (odanavigál) */}
      <Link
        className="addIcon"
        //onClick={props.onNavigate}
        to="/AddPhoto"
      ></Link>
      <div className="photo-grid">
        {props.posts
          .sort(function (x, y) {
            return y.id - x.id;
          })
          .map((post, index) => (
            <Photo
              key={post.id}
              post={post} {...props}
              index={index}
            />
          ))}
      </div>
    </div>
  );
}

PhotoWall.propTypes = {
  posts: PropTypes.array.isRequired, 
};

/// ugyanaz csak osztályokkal
/* 
import React, { Component } from "react";
class PhotoWall extends Component {
    render() {
      return (
        <div className="photo-grid">
          {this.props.posts.map((post, index) => (
            <Photo key={index} post={post} />
          ))}
        </div>
      );
    }
  } */
export default PhotoWall;
