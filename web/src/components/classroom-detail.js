import React, { Component } from 'react'
import { Button, DialogTitle, DialogContent, Dialog, DialogActions, IconButton } from '@material-ui/core'
import { withCookies } from 'react-cookie'

class ClassroomDetail extends Component {
    render () {
        return (
            <Dialog
                className='dialog'
                open={this.props.open}
                onClose={this.props.onClose}
                scroll='paper'
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
                maxWidth='md'
                fullWidth
            >
                <h1>This is classroom detail</h1>
            </Dialog>
        )
    }
}

export default withCookies(ClassroomDetail)
