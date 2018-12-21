export function createPost(userId, input) {
  return (dispatch) => {
    dispatch({type: 'LOADING_CREATE_POST'});
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      accepts: 'application/json',
      body: JSON.stringify({userId: userId, post: input})
    })
    .then(response => response.json())
    .then(posts => {
      console.log(posts);
      dispatch({
        type: 'CREATE_POST',
        payload: posts
      })
    })
    .catch(error => {
      dispatch({
        type: "error", error: error
      })
    });
  }
}
