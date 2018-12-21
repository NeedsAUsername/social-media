function usersReducer(state = {
  loading: false,
  signingUp: false,
  creatingPost: false,
  usersList: [],
}, action) {
  console.log(action);
  if (action.error || (action.payload && action.payload.error)) {
    alert(JSON.stringify(action.error) || JSON.stringify(action.payload.error));
    return {
      ...state,
      loading: false,
      signingUp: false,
    };
  }

  switch(action.type) {
    case 'LOADING_USERS':
      return {...state, loading: true}

    case 'LOAD_USERS':
      return {...state, loading: false, usersList: action.payload}

    case 'LOADING_SIGN_UP':
      return {...state, signingUp: true}

    case 'SIGN_UP':
      alert('Signed Up successfully. Login now')
      return {...state, signingUp: false, usersList: [...state.usersList, action.payload]}

    case 'LOADING_CREATE_POST':
      return {...state, creatingPost: true}

    case 'CREATE_POST':
      let usersList = state.usersList.filter(user => user._id !== action.payload.id);
      return {...state, usersList: [ action.payload, ...usersList], creatingPost: false}

    default:
      return state;
  }
}
export default usersReducer;
