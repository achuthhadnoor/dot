import React from 'react'
import { Switch, Route } from 'react-router-dom'
import snippets from './snippets'
class spaces extends React.Component { 
    /* 
            1) show list of snippets
            2) select first snippet data into redux or from /:cid
            3) switch snippet data into redux
            4) create space 
    */
    render() {
        return (
            <div>
                spaces
                <Switch>
                    <Route component={snippets} path={"/:wid/:sid/:cid"} />
                </Switch>
            </div>
        )
    }
}
export default spaces