export default (previousState = {}, action) => {
    if (action.type === "UPDATE_USER") {
        const { user } = action;
        return { ...previousState, user, workspaces : user.workspaces};
    } else if (action.type === "UPDATE_WORKSPACES") { 
        return { ...previousState, workspaces: { ...action.workspaces } };
    } else if (action.type === "UPDATE_SPACES") {
        return { ...previousState, spaces: { ...action.spaces } };
    } else if (action.type === "UPDATE_SNIPPETS") {
        return { ...previousState, snippets: { ...action.snippets } };
    } else if (action.type === "UPDATE_ALL_DATA") {
        const { spaces, snippets } = action;
        return { ...previousState, spaces, snippets };
    } else return previousState;
};
