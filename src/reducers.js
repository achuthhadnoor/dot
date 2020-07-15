export default (previousState = {}, action) => {
  if (action.type === "UPDATE_USER") {
    return { ...previousState, user: { ...action.user },workspaces : {...action.user.workspaces} };
  } else if (action.type === "UPDATE_WORKSPACES") { 
    return { ...previousState, workspaces: { ...action.workspaces } };
  } else if (action.type === "UPDATE_SPACES") {
    return { ...previousState, spaces: { ...action.spaces } };
  } else if (action.type === "UPDATE_SNIPPETS") { 
    return { ...previousState, snippets: { ...action.snippets } };
  } else if (action.type === "UPDATE_ALL_DATA") { 
    return { ...previousState, spaces:{...action.spaces[0]},snippets: { ...action.snippets[0] } };
  }else return previousState;
};
