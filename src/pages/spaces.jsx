import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Snippets from './snippets'
import SpacesList from '../components/workspace/SpacesList';
import api from '../api';

class Spaces extends React.Component {
    constructor() {
        super();
        this.resetState = {
            newSpaceModalIsOpen: false,
            newSpace: false,
            menuPopover: false,
            deleteSpaceModal: false,
            loading: true,
            loadingSpaces: true,
            workspace: {},
            spaces: []
        }

        this.state = { ...this.resetState, sortBy: 'latest' };

        this.container = React.createRef();
    }
    componentDidMount() {
        /*
             1) show list of spaces 
             2) select first space data into redux or from /:sid
             3) switch space data into redux
        */
        this.container.current.focus();
        const wid = this.props.match.params.wid;
        if (
            this.props.location.search.includes('collections') &&
            wid
        )
            // this.getWorkspaceByID(wid);
            this.getSpaces(wid);
    } 

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.wid !== this.props.match.params.wid) {
            const wid = this.props.match.params.wid;
            this.setState({ ...this.resetState }, () => {
                this.getSpaces(wid);
            });
        }
    }

    getSpaces = (wid) => {
        this.setState({ loading: true });
        api.getSpaces(wid).then(s => {
            this.setState({ spaces: s, loading: false });
        })
    }

    toggleNewSpaceModal = () => {
        this.setState((prevState) => ({
            newSpaceModalIsOpen: !prevState.newSpaceModalIsOpen,
        }));
    };

    render() {
        return (
            <Wrapper ref={this.container}>
                <Container>
                    <SpacesList spaces={this.props.spaces} />
                    <Switch>
                        <Route component={Snippets} path={["/:wid/:sid", "/:wid/:sid/:cid"]} />
                        <Route component={Snippets} path={"/:wid"} />
                    </Switch>
                </Container>
            </Wrapper>
        )
    }
}

Spaces.defaultProps = {
    spaces: [],
};

Spaces.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            sid: PropTypes.string,
            wid: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.shape({ search: PropTypes.string }).isRequired,
    space: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
    }),
    selectedSpace: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
    if (ownProps.match.params.sid && state.spaces) {
        return {
            ...ownProps,
            space: state.spaces[ownProps.match.params.sid],
            spaces: state.spaces || [],
            selectedSpace: ownProps.match.params.sid
        };
    } else {
        return { ...ownProps };
    }
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

export default connect(mapStateToProps)(Spaces)