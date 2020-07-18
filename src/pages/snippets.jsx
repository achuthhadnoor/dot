import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import styled from 'styled-components';
import Snippet from './snippet' 

class Snippets extends React.Component {

    componentDidMount() {
        /*
             1) show list of spaces 
             2) select first space data into redux or from /:sid
             3) switch space data into redux
        */
    }
    render() {
        return (
            <Wrapper>
                <Container> 
                    <Switch>
                        <Route component={Snippet} path={"/:wid/:sid/:cid"} /> 
                    </Switch>
                </Container>
            </Wrapper>
        )
    }
}

Snippets.defaultProps = {
    spaces: [],
};

Snippets.propTypes = {
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
    if (ownProps.match.params.cid && state.snippets) {
        return {
            ...ownProps,
            snippet: state.snippets[ownProps.match.params.cid],
            snippets: state.snippets || [],
            selectedSpace: ownProps.match.params.cid
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

export default connect(mapStateToProps)(Snippets)