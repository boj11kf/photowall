import Main from "./Main";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux'

// * jelentése: mindent abból a .js-ből
import * as actions from '../redux/actions'
import {withRouter} from 'react-router'


// a reducer.js metódusai által mentett aktuális állapotok mentésére
function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
  };
}


function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch);
}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

export default App;
