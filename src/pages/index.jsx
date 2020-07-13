import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import styled from 'styled-components';
import Icon from 'react-icons-kit'
import { chevronLeft, chevronRight } from 'react-icons-kit/feather';
import { bell } from 'react-icons-kit/feather';

import Create from '../components/workspace/Create';
import workspaces from './workspace';
import Sidebar from '../components/sidebar'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            showCreateModal: false,

        }
    }
    componentDidMount() {
        /*
            1) fetch data of workspace into redux
            2) redirect to first selected workspace from redux we will load data 
            3) list of workspaces - user data 
            4) selected workspace/user settings - user data 
            5) global shortcuts - 
            6) notifications
            7) help docs / keyboard shortcust list 
        */
        this.props.history.push(`/${this.props.selectedWorkspace}`);
    }
    onSortEnd = (w) => {
        let { user } = this.props;
        user.workspaces = w;
        this.props.dispatch({ type: 'UPDATE_USER', user: user })
    }
    render() {
        return (
            <Wrapper>
                <Sidebar user={this.props.user} workspaces={this.props.workspaces} onSortEnd={this.onSortEnd} shouldCancelStart={this.shouldCancelStart} />
                <Container>
                    <div style={{ display: 'flex', padding: '0px 10px' }}>
                        <Icon icon={chevronLeft} style={{ padding: 10 }} onClick={this.props.history.goBack} />
                        <Icon icon={chevronRight} style={{ padding: 10 }} onClick={this.props.history.goForward} />
                        <div style={{ flex: 1 }} />
                        {/* {search} */}
                        <Icon icon={bell} style={{ padding: 10 }} onClick={() => { this.setState({ showCreateModal: !this.state.showCreateModal }) }} />
                    </div>
                    <Switch>
                        <Route component={workspaces} path={["/:wid", "/:wid/:sid", "/:wid/:sid/:cid"]} />
                    </Switch>
                </Container>
                {this.state.showCreateModal && <Create onClick={() => { this.setState({ showCreateModal: !this.state.showCreateModal }) }} />}
            </Wrapper>
        )
    }
}

const mapStateToProps = (state, ownprops) => {
    let selectedWorkspace = state.user.selectedWorkspace 
    if (state.workspaces && ownprops.match.params.wid && state.workspaces[ownprops.match.params.wid]) {
        selectedWorkspace = ownprops.match.params.wid;
    }
    return { user: state.user, workspaces: state.workspaces, selectedWorkspace: selectedWorkspace }
}

const Wrapper = styled.div`
    display:flex;
    flex:1;
    height:100%;
`

const Container = styled.div`
    display:flex;
    flex-direction:column;
    flex:1;
    height:100%;
`

export default connect(mapStateToProps)(Home)