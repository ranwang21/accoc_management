import React, { Component } from 'react'
import { Container } from '@material-ui/core'

class Footer extends Component {
    render () {
        return (
            <Container className='footer' maxWidth={false}>
                <div className='adresse'>
                    <h2>La maison d'aurore</h2>
                    <div>
                        <h3>Adresse: </h3>
                        <ul>
                            <li>4816, rue Garnier (coin Gilford)</li>
                            <li>H2J 4B4</li>
                            <li>Montreal, Quebec</li>
                            <li>CANADA</li>
                        </ul>
                    </div>
                </div>
                <div className='map'>Map</div>
                <div className='contact'>Contact</div>
            </Container>
        )
    }
}

export default Footer
