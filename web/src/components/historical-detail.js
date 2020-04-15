import React, { Component } from 'react'
import { DialogTitle, DialogContent, Dialog, TableContainer, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core'
import { withCookies } from 'react-cookie'

class HistoricalDetail extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/historical-detail.json')
    }

    componentDidMount () {
        // console.log(this.props.actors)
    }

    renderRow () {
        const classRoom = this.props.classRoom
        return (
            <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={classRoom._id}>
                <TableCell> 1 </TableCell>
                <TableCell> 2 </TableCell>
                <TableCell> 3 </TableCell>
            </TableRow>
        )
    }

    render () {
        const lang = this.getLangFile()
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
                <DialogTitle id='scroll-dialog-title' className='title'>{this.props.classRoom.title}</DialogTitle>
                <DialogContent id='details-print' className='div-dialog'>

                    <TableContainer className='table-list'>
                        <Table stickyHeader aria-label='sticky table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {lang.lastname}
                                    </TableCell>
                                    <TableCell>
                                        {lang.firstname}
                                    </TableCell>
                                    <TableCell>
                                        {lang.presence}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody />
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        )
    }
}

export default withCookies(HistoricalDetail)
