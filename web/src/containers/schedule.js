import React, { Component } from 'react'

class Schedule extends Component {
    constructor () {
        super()
        this.state = {
            schedules: []
        }
    }

    render () {
        console.log(this.state.schedules)
        return (
            <div>Component: SCHEDULE</div>
        )
    }
}

export default Schedule
