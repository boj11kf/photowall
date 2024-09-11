import { database } from "../database/config";

export function startAddingPost(post) {
  return (dispatch) => {
    return database
      .ref("posts")
      .update({ [post.id]: post })
      .then(() => {
        dispatch(addPost(post));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}



export function startLoadingPost() {
  return (dispatch) => {
    // once() : egy specified eventre vár, akkor egyszer meghívódik,
    // de többé nem figyel
    // on(): bármilyen változás történik az adatbázisban meghívódik,
    // így lesz real-time
    // then() : csak akkor hívódik meg, ha az előtte lévő
    // pont-operátor előtti részek sikeresen lefutottak
    // snapshot : a posts array összes eleme, minden gyerek ami a posts-hoz tartozik
    // childSnapshot : a posts egy eleme
    return database
      .ref("posts")
      .once("value")
      .then((snapshot) => {
        let posts = [];
        snapshot.forEach((childSnapshot) => {
          posts.push(childSnapshot.val());
        });
        dispatch(loadPosts(posts))
      }).catch((error) => {
        console.log(error);
      });
  };
}

export function startRemovingPost(index, id) {
 
  const updates = {
   [`posts/${id}`]: null,
   [`comments/${id}`]: null
  }
  /* this specifies the paths that we want to update to null 
  (basically delete)
  we're navigating to the post with id we clicked remove on, 
  as well as the comments belonging to that post, with 
  that same id. */ 
   
   return (dispatch) => {
   return database.ref().update(updates).then(() => {
   dispatch(removePost(index))
   }).catch((error) => {
   console.log(error)
   })
   }
  }
   
  /*finally, we're updating the database from its root node, such
  that it navigates to the posts path, as well as the comments
   path, and  sets them to null ! (in other words, deletes both
  of them). 
  After deleting the post and its comments from the database,
  like always, we're updating
  the ui by dispatching an action to our reducer 
  inside of .then() */ 

export function removingScaleFromHover(){
  var div = document.querySelector("figure")
  div.style.transform = div.style.transform.replace(/scale\([0-9|\.]*\)/, 'scale(' + 1 + ')')
}

export function startAddingComment(comment, postId){
  return (dispatch) => {
    return database.ref(`comments/${postId}`).push(comment).then(() => {
      dispatch(addComment(comment, postId))
    }).catch((error) => {
      console.log(error);
    });
  }
}

export function startLoadingComments() {
  return (dispatch) => {
    // hierarhia:
    // photowall
    //  - posts
    //    - post ID
    //      - descption
    //      - id
    //      - link
    //    - post ID
    //    - post ID
    //  - comments
    //    - post ID
    //      - comment ID : "komment"
    //      - comment ID : "value"
    //      - comment ID : "string"
    // lekérem a comments "mappa" value-it (ez a snapshot, a post ID-k)
    // végig iterálok a snapshot elemein (ez a childSnapshot, 
    // a comment ID-k)
    // egy kommentnek, tehát childSnapshotnak a kulcsa (.key) a POST ID amihez tartozik
    // kommentek[postID-adik eleme] = kommentek értékeinek összegével egy objektumként
    return database.ref("comments").once("value").then((snapshot) => {
      let comments = {}
      snapshot.forEach((childSnapshot) => {
        comments[childSnapshot.key] = Object.values(childSnapshot.val())
      })
      dispatch(loadComments(comments))
    })
  }
}

export function loadComments(comments) {
  return {
    type: 'LOAD_COMMENTS',
    comments
  }
}

// deklarálás ugyanazt jelenti mind a két esetben
// ha a váltotó neve megegyeztik, a paraméterben kapottal,
// akkor így lehet egyszerűsíteni. (index: index helyett post)
// remove
export function removePost(index) {
  return {
    type: "REMOVE_POST",
    index: index,
  };
}

// adding post
export function addPost(post) {
  return {
    type: "ADD_POST",
    post,
  };
}

export function addComment(comment, postId) {
  return {
    type: "ADD_COMMENT",
    comment,
    postId,
  };
}

export function loadPosts(posts) {
    return {
        type: 'LOAD_POSTS',
        posts
    }
}



// mikor törlünk egy post-ot, akkor az csak a posts node-ról törlődik
// a comments node-ban még marad rá hivatkozás
/* 
export function startRemovingPost(index, id){
  return (dispatch) => {
    return database.ref(`posts/${id}`).remove().then(() => {
      dispatch(removePost(index))
    }).catch((error) => {
      console.log(error);
    });
  }
}

 */