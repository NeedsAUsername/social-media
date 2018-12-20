export function createPost(input) {
  return (dispatch) => {
    dispatch({type: 'LOADING_CREATE_POST'});
    debugger
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      accepts: 'application/json',
      body: JSON.stringify(input)
    })
    .then(response => response.json())
    .then(post => {
      console.log(post)
    })
    .catch(error => {
      dispatch({
        type: "error", error: error
      })
    });
  }
}
