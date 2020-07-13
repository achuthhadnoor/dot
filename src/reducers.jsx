export default (previousState = {}, action) => {
  if (action.type === "UPDATE_USER") {
    return { ...previousState, user: { ...action.user } };
  } else if (action.type === "UPDATE_WORKSPACES") { 
    return { ...previousState, workspaces: { ...action.workspaces } };
  } else if (action.type === "UPDATE_SPACES") {
    return { ...previousState, spaces: { ...action.spaces } };
  } else if (action.type === "UPDATE_SNIPPETS") { 
    return { ...previousState, snippets: { ...action.snippets } };
  } else if (action.type === "DELETE_TAG") {
  } else if (action.type === "REMOVE_FOLDER") {
      
  } else return previousState;
};
