import _posts from "../data/posts";
import { combineReducers } from "redux";

// const commentReducer = function comments(state=[], action)
// state={} -> nem tömböt vesz át, hanem object-et
function comments(state = {}, action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      if (!state[action.postId]) {
        // object esetén a syntax szögletes zárójel használata :[]
        // object property-t így tudunk megadni
        // [action.postId] -> object property, ha kulcsként akarunk használni vmit
        // [action.comment] -> array
        return { ...state, [action.postId]: [action.comment] };
      } else {
        return {
          ...state,
          [action.postId]: [...state[action.postId], action.comment]
        };
      }

    case 'LOAD_COMMENTS': return action.comments
    default:
      return state;
  }
}
// const postReducer = function posts(state = renderedPosts, action)
function posts(state = _posts, action) {
  switch (action.type) {
    // slice(mettől, meddig ami már nincs benne)
    // slice(mettől a végéig)
    case 'REMOVE_POST':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    case 'ADD_POST':
      return [...state, action.post];

    case 'LOAD_POSTS': return action.posts;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ posts, comments });

export default rootReducer;
