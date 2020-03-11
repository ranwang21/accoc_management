import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'

import '../styles/_classroom.scss'

class ClassRoom extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/classroom.json')
    }

    render () {
        const lang = this.getLangFile()

        return (
            <div className='classroom'>
                <div className='classroom-title'>
                    {/* TODO: dynamically change classroom number with props */}
                    <h3>{lang.classRoomName}</h3>
                </div>
                <List component='nav' aria-label='main mailbox folders'>
                    <ListItem button>
                        <ListItemText primary='Mr. Bean' />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary='Ms. Brown' />
                    </ListItem>
                </List>
                <div>
                    <h3>{lang.presented}</h3>
                    {/* TODO */}
                    <p className='child-number'>6</p>
                </div>
                <div>
                    <h3>{lang.absent}</h3>
                    {/* TODO */}
                    <p className='child-number'>10</p>
                </div>
                <Button variant='outlined' color='primary' href='#outlined-buttons'>
                    {lang.seeDetail}
                </Button>
            </div>
        )
    }
}

export default ClassRoom
