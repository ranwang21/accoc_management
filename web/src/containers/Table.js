import React, { Component } from 'react'
import TableListMenu from '../components/table-list-menu'
import TableListContainer from '../components/table-list-container'
// import ClassRoomList from '../components/classroom-list'
import '../styles/_table.scss'

class Table extends Component {
    constructor () {
        super()
        this.state = {
            actorSelected: 'children'
        }
        this.onActorSelected = this.onActorSelected.bind(this)
    }

    onActorSelected (event, name) {
        this.setState({
            actorSelected: name
        })
    }

    render () {
        // const lang = this.getLangFile()
        return (
            <div className='table'>
                <TableListMenu lang={this.props.lang} userType={this.props.userType} selected={this.state.actorSelected} handleActorSelected={this.onActorSelected} />
                <TableListContainer lang={this.props.lang} />
                {/* <ClassRoomList lang={this.props.lang} userType={this.props.userType} /> */}
            </div>
        )
    }
}

export default Table
