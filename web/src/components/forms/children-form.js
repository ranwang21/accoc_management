import React, { Component } from 'react'

class ChildrenForm extends Component {
    render () {
        return (
            <>
                <div>
                    <h1>Fiche d'inscription {this.props.nbre}</h1>
                </div>
            </>
        )
    }
}

export default ChildrenForm
