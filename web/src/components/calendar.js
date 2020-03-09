import React, { Component } from 'react'
import { Calendar } from '@material-ui/pickers/views/Calendar/Calendar'

class CalendarD extends Component {
    constructor () {
        super()
        this.state = {
            date: new Date()
        }
    }

    handleDateChange (date) {
        this.setState({
            date: date
        })
    }
    ;
    render () {
        return (
            <div>
                <Calendar
                    firstDayOfWeek={1}
                    date={this.state.date}
                    onChange={(date, isFinish) => {}}
                    classes={{}}
                    utils={{}}
                />
            </div>
        )
    }
}

export default CalendarD
