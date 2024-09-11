import React, { Component } from "react";
import PhotoWall from "./PhotoWall";
import AddPhoto from "./AddPhoto";
import { Route, Link } from "react-router-dom";
import Single from "./Single"

class Main extends Component {

  state = { loading: true}

  componentDidMount(){
    this.props.startLoadingPost().then(() => {
      this.setState({loading: false})
    })
    this.props.startLoadingComments()
  }

/*   componentDidMount(){
    this.props.removePost(1)
    // a dispatchelt sornál az import sem ír "never read" hibát
    // this.props.dispatch(removePost(1))
  } */

  render() {
    return (
      <div>
        <h1>
          <Link to="/">Photowall</Link>
        </h1>

        <Route
          // path: ebben az esetben, megjelenít minden
          // olyan oldalt, ami /-el kezdődik (tartalmaz?!)
          // exact path: ebben az esetben, csak azt
          // amely konkrétan ezzel a címmel rendelkezik
          exact
          path="/"
          render={() => (
            <div>
              
              {/* A két Photowall sor között a különbség
              1.) this.props.posts  -> egzaktan megmondja mivel egyenő, mit ér el
              2.) ...this.props     -> a photowall-on keresztül a Photo minden
              Main-beli props-ot elér */}
              {/* <PhotoWall posts = {this.props.posts}/> */}
              <PhotoWall {...this.props}/>
            </div>
          )}
        />
        <Route
          path="/AddPhoto"
          render={(/*{  history  }*/) => (
            <AddPhoto
              {...this.props}
              /* onHistory={history} */
            />
          )}
        />

        <Route path={"/single/:id"} render={(params) => (
          // fontos a sorrend, előbb mindig a ...this
          // aztán a többi
          <Single loading={this.state.loading} {...this.props} {...params} />
        )}/>
      </div>
    );
  }
}

export default Main;

// API kérések esetén
// első futáskor még üres a database, így lefut ugyan a render(),
// de nem ír ki semmit, majd ComponenDidMount(), amiben setteljük
// a database-ünket a SimulateFetchFromDatabase() return értékével
/* function SimulateFetchFromDatabase() {
  return [
    {
      id: "0",
      description: "beautiful landscape",
      imageLink:
        "https://image.jimcdn.com/app/cms/image/transf/none/path/sa6549607c78f5c11/image/i4eeacaa2dbf12d6d/version/1490299332/most-beautiful-landscapes-in-europe-lofoten-european-best-destinations-copyright-iakov-kalinin.jpg" +
        "3919321_1443393332_n.jpg",
    },
    {
      id: "1",
      description: "Aliens???",
      imageLink:
        "https://s3.india.com/wp-content/uploads/2017/12/rocket.jpg",
    },
    {
      id: "2",
      description: "On a vacation!",
      imageLink:
        "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/08/24/104670887-VacationExplainsTHUMBWEB.1910x1000.jpg",
    },
  ]
} */

/// A bind() megértéséhez.
// binddal elérhetjük, hogy egy metódust úgy futtassunk le, mintha az a bind(obj) pareméterében
// megadott obj metódusa lenne.
/* this.x = 1; // "this" here is the global window object in browser 
const obj = { 
 x: 100, 
 getX: function () { return this.x; } 
}; 
console.log(obj.getX()); // 100 
const retrieveX = obj.getX; // the function gets invoked at the global scope

console.log(retrieveX()); // 1

// Create a new function with 'this' bound to obj 
// global variable 'x' with obj's property 'x' are two separate entities 
const boundGetX = retrieveX.bind(obj); 
console.log(boundGetX()); // 100 */
