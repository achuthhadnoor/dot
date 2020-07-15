import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather';
import { NavLink } from 'react-router-dom';

class SpacesList extends React.Component {

    componentDidMount() {
        /*
             1) show list of spaces 
             2) select first space data into redux or from /:sid
             3) switch space data into redux
        */ 
    }
    render() {
        const spaces = [];
        for(var key in this.props.spaces){
            spaces.push(this.props.spaces[key])
            console.log(spaces)
        }
        return (
            <Wrapper>
                <Container>
                    <Icon icon={plus} /> Add a Space
                   <ul >
                        {
                              spaces &&  spaces.map((s, i) => <li key={`space-${i}`} index={i}>
                                                                <NavLink 
                                                                to={`/${this.props.workspaceid}/${s.id}`} 
                                                                 activeStyle={{ background: "rgba(0,0,0,.4)",padding:'10px' }}
                                                                 >{s.title}</NavLink>
                              </li>
                                                                 )
                        }
                    </ul>
                </Container>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state, ownprops) => { 
    return ({
    spaces: state.spaces,
    workspaceid : ownprops.workspace
})}

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

export default connect(mapStateToProps)(SpacesList)