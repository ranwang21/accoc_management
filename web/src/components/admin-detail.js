import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

class ParentCollabDetail extends Component {
    render () {
        const admin = this.props.admin
        return (
            <div className='admin-detail'>
                <fieldset>
                    <legend>Details</legend>
                    <div>
                        <div className='row'>
                            <p>Adresse</p>
                            <p>{admin.address}</p>
                        </div>
                        <div className='row'>
                            <p>Courriel</p>
                            <p>{admin.email}</p>
                        </div>
                        <div>
                            <p>Personal</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div>
                            <p>Work</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div>
                            <p>Home</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div>
                            <p>Emergency</p>
                            <p>(514) 820-5545</p>
                        </div>
                        <div className='row'>
                            <p>Statut du compte</p>
                            <p>VALIDE / INVALIDE</p>
                        </div>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default withCookies(ParentCollabDetail)
