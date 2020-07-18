import React from 'react'
import styled from 'styled-components'

import Icon from 'react-icons-kit'

import { grid, helpCircle, plus } from 'react-icons-kit/feather'
import { NavLink } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';

export default ({ workspaces, user, onSortEnd }) => {
    var spaces = [];
    for (var key in workspaces) { if (workspaces[key]) { spaces.push(workspaces[key]) } } 
    return (
        <Wrapper>
            <NavLink to="/" className="options" >
                <Icon icon={grid} />
            </NavLink>

            <Items>
                <ReactSortable
                    list={spaces}
                    setList={onSortEnd}
                    style={{ display: 'flex', flexDirection: "column" }}
                >
                    {spaces && spaces.map((workspace, index) => (
                        <Item
                            key={`item-${index}`}
                            index={index}
                            to={"/" + workspace.id}
                            style={{ textTransform: 'uppercase' }}
                            activeStyle={{ background: "rgba(0,0,0,.4)" }}
                        >{workspace.title.slice(0, 2)}</Item>
                    ))}
                </ReactSortable>
                <Item to="/create"><Icon icon={plus} /></Item>
            </Items>
            <Item to="/"><img src={user.photoURL} height="32px" width="32px" style={{ borderRadius: '25px' }} alt="U" /></Item>
            <Item to="/settings">
                <Icon icon={helpCircle} />
            </Item>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    height:100%;
    flex-direction:column;
    text-align:center;
    .options{
        padding:10px;
    } 
    .avatar{
        height:20px;
        width:20px;
        border-radius:10px;
        background:#555;
        display:block;
    }
`

const Items = styled.div` 
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center; 
`
const Item = styled(NavLink)`
    padding:10px; 
    margin:5px 0px 
`