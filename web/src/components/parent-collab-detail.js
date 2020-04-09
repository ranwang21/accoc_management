import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import '../styles/_parent-collab-detail.scss'
import { Divider } from '@material-ui/core'
const variables = require('../utilities/variables').variables

class ParentCollabDetail extends Component {
    render () {
        const both = this.props.both
        console.log(both)
        console.log(variables.role.collab)
        return (
            <div className='parent-collab-detail'>
                <div>
                    <fieldset>
                        <legend>Details</legend>
                        <div>
                            <div className='max row'>
                                <p>Adresse</p>
                                <p>{both.address}</p>
                            </div>
                            <div className='max row'>
                                <p>Courriel</p>
                                <p>{both.email}</p>
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
                            <div className='max row'>
                                <p>Un ou des enfant(s) de moins de 18ans</p>
                                <p>OUI / NON</p>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <legend>Membership</legend>
                        <div>
                            <div className='max row'>
                                <p>Statut</p>
                                <p>(est ou n'est pas) membre</p>
                            </div>
                            <div>
                                <p>Mode de paiement</p>
                                <p>texte texte texte</p>
                            </div>
                            <div>
                                <p>Carte membre</p>
                                <p>OUI / NON</p>
                            </div>
                            <div>
                                <p>Carte de remise</p>
                                <p>OUI / NON</p>
                            </div>
                        </div>
                    </fieldset>
                </div>
                {both.roleTitle !== variables.role.parent && (
                    <>
                        <div>
                            <fieldset>
                                <legend>Ses disponibilites</legend>
                                <div>
                                    <div>
                                        <p>LUNDI</p>
                                        <p>OUI / NON</p>
                                    </div>
                                    <div>
                                        <p>MARDI</p>
                                        <p>OUI / NON</p>
                                    </div>
                                    <div>
                                        <p>MERCREDI</p>
                                        <p>OUI / NON</p>
                                    </div>
                                    <div>
                                        <p>JEUDI</p>
                                        <p>OUI / NON</p>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <fieldset>
                                <legend>Ses interets</legend>
                                <div>
                                    <div className='max row'>
                                        <p>Collaborer au JM</p>
                                        <p>OUI / NON</p>
                                    </div>
                                    <div className='max row'>
                                        <p>Servir la collation</p>
                                        <p>OUI / NON</p>
                                    </div>
                                    <div className='max row'>
                                        <p>Animation de jeux - Preparation fetes</p>
                                        <p>OUI / NON</p>
                                    </div>
                                    <div className='max row'>
                                        <p>Accompagner les enfants a l'atelier</p>
                                        <p>OUI / NON</p>
                                    </div>
                                    <div className='max row'>
                                        <p>Preparer des collations</p>
                                        <p>OUI / NON</p>
                                    </div>
                                    <div className='max row'>
                                        <p>Accompagner les enfants sur internet</p>
                                        <p>OUI / NON</p>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </>
                )}
                {both.roleTitle !== variables.role.collab && (
                    <div>
                        <fieldset>
                            <legend>Informations Complementaires{both.roleTitle === variables.role.both && ' en tant que parent'}</legend>
                            <div>
                                <div className='max'>
                                    <p>Ses attentes</p>
                                    <p>texte texte texte texte texte texte texte texte texte</p>
                                </div>
                                <div className='max'>
                                    <p>Ses besoins</p>
                                    <p>texte texte texte texte texte texte texte texte texte</p>
                                </div>
                                <div className='max'>
                                    <p>Ses talents</p>
                                    <p>texte texte texte texte texte texte texte texte texte</p>
                                </div>
                                <div className='max'>
                                    <p>Servir la collation pour les enfants</p>
                                    <p>OUI / NON</p>
                                </div>
                                <div className='max'>
                                    <p>Organisation des fetes</p>
                                    <p>OUI / NON</p>
                                </div>
                                <div className='max'>
                                    <p>Accompagner les enfants lors des activites</p>
                                    <p>OUI / NON</p>
                                </div>
                                <div className='max'>
                                    <p>Participation a d'autres activites</p>
                                    <p>texte texte texte texte texte texte texte texte texte</p>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                )}
                {both.roleTitle !== variables.role.parent && (
                    <div>
                        <fieldset>
                            <legend>Informations Complementaires{both.roleTitle === variables.role.both && ' en tant que collaborateur'}</legend>
                            <div>
                                <div className='max'>
                                    <p>Motivations</p>
                                    <p>texte texte texte texte texte texte texte texte texte</p>
                                </div>
                                <div className='max'>
                                    <p>Experiences et Formations</p>
                                    <p>texte texte texte texte texte texte texte texte texte</p>
                                </div>
                                <div className='max'>
                                    <p>Commentaires</p>
                                    <p>texte texte texte texte texte texte texte texte texte</p>
                                </div>
                                <div className='max'>
                                    <p>Ou avoir entendu parler du besoin de collaborateur</p>
                                    <p>texte texte texte texte texte texte texte texte texte</p>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                )}
            </div>
        )
    }
}

export default withCookies(ParentCollabDetail)
