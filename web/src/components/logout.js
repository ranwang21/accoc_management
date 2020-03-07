import React, { Component } from 'react'
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import LogOutIcon from '@material-ui/icons/PowerSettingsNewOutlined'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(0, 0, 0, 0.8)'
        },
        secondary: {
            main: 'rgb(1, 144, 147)'
        }
    }
})

class LogoutButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            show: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    handleClickOpen () {
        this.setState({
            show: true
        })
    }

    handleClose () {
        this.setState({
            show: false
        })
    }

    handleConfirm () {
        this.setState({
            show: false
        })
        this.props.handleConfirmEvent()
    }

    render () {
        const langFile = this.props.lang
        return (
            <>
                <ThemeProvider theme={theme}>
                    <IconButton className='logout' onClick={this.handleClickOpen}>
                        <p className='text'>{langFile.logOutText}</p>
                        <LogOutIcon />
                    </IconButton>
                    <Dialog
                        open={this.state.show}
                        onClose={this.handleClose}
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                    >
                        <DialogTitle id='alert-dialog-title'>{langFile.modal.title}</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color='primary'>
                                {langFile.modal.cancel}
                            </Button>
                            <Button onClick={this.handleConfirm} color='primary' autoFocus>
                                {langFile.modal.confirm}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>
            </>
        )
    }
}

export default LogoutButton
