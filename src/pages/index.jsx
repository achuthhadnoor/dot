import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Icon from 'react-icons-kit'
import { chevronLeft, chevronRight } from 'react-icons-kit/feather';
import { bell } from 'react-icons-kit/feather';

import Create from '../components/workspace/Create';
import Spaces from './spaces';
import Sidebar from '../components/sidebar'
import Api from '../api';

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
        this.container = React.createRef();
        const { wid, sid, cid } = this.props.match.params;
        Api.getSelectedWorkspaceData(this.props.dispatch, wid, sid, cid)
            .then(url => this.props.history.replace(url))
            .catch((e, url) => { alert(e); this.props.history.replace(url) })
    }

    onSortEnd = (w) => {
        let { user } = this.props;
        user.workspaces = w;
        this.props.dispatch({ type: 'UPDATE_USER', user: user })
    }
    render() {
        return (
            <Wrapper
                ref={this.container}
                tabIndex="-1"
                onKeyDown={(e) => {
                    e = e || window.e;
                    if (('key' in e && e.key === 'Escape') || e.keyCode === 27)
                        this.props.history.goBack();
                }}>
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
                        <Route component={Spaces} path={["/:wid", "/:wid/:sid", "/:wid/:sid/:cid"]} />
                    </Switch>
                </Container>
                {this.state.showCreateModal && <Create onClick={() => { this.setState({ showCreateModal: !this.state.showCreateModal }) }} />}
            </Wrapper>
        )
    }
}

Home.defaultProps = {
    wokspaces: [],
};

Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            wid: PropTypes.string,
        }).isRequired,
    }).isRequired,
    workspace: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
    }),
    workspaces: PropTypes.object,
    selectedWorkspace: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    workspace: state.workspaces[ownProps.match.params.wid],
    workspaces: state.workspaces || [],
    selectedWorkspace: ownProps.match.params.wid || state.user.selectedWorkspace,
    user: state.user
})

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