import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert (props) {
    return <MuiAlert elevation={0} variant='filled' {...props} />
}
class Snack extends Component {
    constructor (props) {
        super(props)
        this.state = {
            show: false
        }
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
    }

    componentDidMount () {
        this.setState({
            show: this.props.show
        })
    }

    componentDidUpdate (prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                show: !prevProps.show
            })
        }
    }

    handleCloseSnack (event) {
        this.setState({
            show: false
        })
    }

    render () {
        const message = this.props.message ? this.props.message : 'message snack is not set'
        const severity = this.props.severity ? this.props.severity : 'info'
        return (
            <>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.show}
                    onClose={this.handleCloseSnack}
                    autoHideDuration={3000}
                >
                    <Alert severity={severity}>{message}</Alert>
                </Snackbar>
            </>
        )
    }
}

export default Snack
