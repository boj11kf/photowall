import React/*,  { Component } */ from "react";
import ReactDOM from "react-dom";
import "./styles/stylesheet.css";
// nem feltétlen kompatibilisek az újabb verziók a régiekkel
// a tutorialban a 4.2.2-es verziót használja
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware} from "redux";
import rootReducer from "./redux/reducer";
import { Provider } from "react-redux";
import App from "./Components/app";
//import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

/* const store = createStore(
  rootReducer,
  /* preloadedState, composeEnhancers(applyMiddleware(...middleware))
); 
*/
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

///1.
//const tasks = ["take out the trash", "Shovel the driveway", "Walk the dog"];

/// Create elements with js
// ol = order list
/* const element = React.createElement(
  "ol",
  null,
  tasks.map((task, index) => React.createElement("li", {key: index}, task))
);
 */

/// create element with direct HTML code, kinda template literal

/* class List extends Component {
  render() {
    return (
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ol>
    );
  }
}
class Title extends Component {
  render() {
    return <h1>Task list</h1>;
  }
}

class Main extends Component {
  render(){
    return <div><Title/><List/></div>
  }
    
  
} */

///2.
// without const tasks array, it is more dinamic
/* class List extends Component {
  render() {
    return (
      <ol>
        {this.props.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ol>
    );
  }
}
class Title extends Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Title title = {["ToDos"]}/>
        <List tasks = {["Move the lawn", "walk the dog"]}/>
        <List tasks = {["Hose the driveway", "finish the laundry"]}/>
      </div>
    );
  }
} */

//ReactDOM.render(<Main />, document.getElementById("root"));
