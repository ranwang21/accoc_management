import React, { Component } from 'react'
import TableListMenu from '../components/table-list-menu'
import TableListContainer from '../components/table-list-container'
// import ClassRoomList from '../components/classroom-list'
import '../styles/_table.scss'

class Table extends Component {
    render () {
        // const lang = this.getLangFile()
        return (
            <div className='table'>
                <TableListMenu lang={this.props.lang} userType={this.props.userType} />
                <TableListContainer lang={this.props.lang} />
                {/* <ClassRoomList lang={this.props.lang} userType={this.props.userType} /> */}
            </div>
        )
    }
}

export default Table
