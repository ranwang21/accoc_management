import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
const variables = require('../utilities/variables').variables

class ParentCollabDetail extends Component {
    render () {
        const both = this.props.both
        return (
            <div className='parent-collab-detail'>
                <fieldset>
                    <legend>Details</legend>
                    <div>
                        <div className='row'>
                            <p>Adresse</p>
                            <p>{both.address}</p>
                        </div>
                        <div className='row'>
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
                        <div className='row print-to-remove'>
                            <p>Un ou des enfant(s) de moins de 18ans</p>
                            <p>OUI / NON</p>
                        </div>
                    </div>
                </fieldset>
                <fieldset className='print-to-remove'>
                    <legend>Membership</legend>
                    <div>
                        <div className='row'>
                            <p>Statut</p>
                            <p>(est ou n'est pas) membre</p>
                        </div>
                        <div className='row'>
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
                {both.roleTitle !== variables.role.parent && (
                    <>
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
                        <fieldset className='print-to-remove'>
                            <legend>Ses interets</legend>
                            <div>
                                <div className='row'>
                                    <p>Collaborer au JM</p>
                                    <p>OUI / NON</p>
                                </div>
                                <div className='row'>
                                    <p>Servir la collation</p>
                                    <p>OUI / NON</p>
                                </div>
                                <div className='row'>
                                    <p>Animation de jeux - Preparation fetes</p>
                                    <p>OUI / NON</p>
                                </div>
                                <div className='row'>
                                    <p>Accompagner les enfants a l'atelier</p>
                                    <p>OUI / NON</p>
                                </div>
                                <div className='row'>
                                    <p>Preparer des collations</p>
                                    <p>OUI / NON</p>
                                </div>
                                <div className='row'>
                                    <p>Accompagner les enfants sur internet</p>
                                    <p>OUI / NON</p>
                                </div>
                            </div>
                        </fieldset>
                    </>
                )}
                {both.roleTitle !== variables.role.collab && (
                    <fieldset className='print-to-remove'>
                        <legend>Informations Complementaires{both.roleTitle === variables.role.both && ' en tant que parent'}</legend>
                        <div>
                            <div className='row'>
                                <p>Servir la collation pour les enfants</p>
                                <p>OUI / NON</p>
                            </div>
                            <div className='row'>
                                <p>Organisation des fetes</p>
                                <p>OUI / NON</p>
                            </div>
                            <div className='row'>
                                <p>Accompagner les enfants lors des activites</p>
                                <p>OUI / NON</p>
                            </div>
                            <div className='max'>
                                <p>Participation a d'autres activites</p>
                                <p>texte texte texte texte texte texte texte texte texte</p>
                            </div>
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
                        </div>
                    </fieldset>
                )}
                {both.roleTitle !== variables.role.parent && (
                    <fieldset className='print-to-remove'>
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
                )}
            </div>
        )
    }
}

export default withCookies(ParentCollabDetail)
