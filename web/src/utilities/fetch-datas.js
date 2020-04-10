'use-strict'

const HOST = 'https://maison-aurore-api.herokuapp.com'
const jwt = require('jwt-simple')
const secret = 'xxx'
// TOKEN Encoder and decoder
const decodeData = (token) => {
    return jwt.decode(token, secret)
}

const encodeData = (value) => {
    return jwt.encode(value, secret)
}

const validateEmail = (email) => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return !!mailformat.test(email)
}

const authLogin = (email, password, callBack) => {
    const userToSend = {
        email: email,
        password: password
    }
    fetch(HOST + '/auth/login', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToSend)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            callBack(data)
        })
}

const logOutUser = () => {
    fetch(HOST + '/auth/logout', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
        })
}

const getCurrentUser = (token, callBack) => {
    fetch(HOST + '/auth/user', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetch(HOST + '/roles/' + data.data.id_role, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })
                    .then(response => response.json())
                    .then(data2 => {
                        callBack(token, data, data2.data.title)
                    })
            } else {
                callBack(data, '')
            }
        })
}

const addUser = (params, callBack) => {
    fetch(HOST + '/roles', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + params.token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const find = data.data.filter(role => role.title === params.role_title)
                if (find[0]) {
                    const user = {
                        id_role: find[0]._id,
                        first_name: params.first_name,
                        last_name: params.last_name
                    }

                    fetch(HOST + '/users', {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + params.token
                        },
                        body: JSON.stringify(user)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                const userLogin = {
                                    id_user: data.data._id,
                                    email: params.email,
                                    password: params.password,
                                    is_active: params.is_active
                                }

                                fetch(HOST + '/logins', {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + params.token
                                    },
                                    body: JSON.stringify(userLogin)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        callBack(data.success)
                                    })
                            }
                        })
                } else callBack(false)
            } else callBack(false)
        })
}

const registerSaveUser = (user, userLogin, callBack) => {
    fetch(HOST + '/users', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userLogin = {
                    id_user: data.data._id
                }
                fetch(HOST + '/logins', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userLogin)
                })
                    .then(response => response.json())
                    .then(data => {
                        callBack(data.success, userLogin.id_user)
                    })
            }
        })
}

const saveChildren = (children, callBack) => {
    fetch(HOST + '/users', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(children)
    })
        .then(response => response.json())
        .then(data => {
            callBack(data.success)
        })
}

const getRolesAndDays = (callBack) => {
    fetch(HOST + '/roles')
        .then(response => response.json())
        .then(dataRoles => {
            fetch(HOST + '/days')
                .then(response => response.json())
                .then(dataDays => {
                    callBack(dataRoles.data, dataDays.data)
                })
        })
}

const deleteLogin = (token, idLogin, callBack) => {
    fetch(HOST + '/logins/' + idLogin, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
        })
}

const getImage = (token, id, callBack) => {
    fetch(HOST + '/users/' + id + '/photo', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            callBack(data)
        })
}

const getAddressFromGoogle = () => {
    const API_KEY = 'AIzaSyCeyah5EQEjXMmGTgWi1lTQyORN4n4Wil0'
    const input = '5217+Trans+island'
    fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/output?input=' + input + '&key=' + API_KEY)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

const getAllUsers = (token, callBack) => {
    fetch(HOST + '/roles', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(dataRoles => {
            fetch(HOST + '/logins', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => response.json())
                .then(dataLogins => {
                    fetch(HOST + '/users', {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            const dataUsers = []
                            for (let i = 0; i < data.data.length; i++) {
                                const user = data.data[i]
                                const login = dataLogins.data.filter(dl => dl.id_user === user._id)
                                const role = dataRoles.data.filter(dr => dr._id === user.id_role)
                                user.idLogin = login[0] ? login[0]._id : null
                                user.isValid = login[0] ? login[0].is_active : null
                                user.email = login[0] ? login[0].email : null
                                let img = null
                                fetch(HOST + '/users/'+ user._id +'/photo', {
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + token
                                    }
                                })
                                    .then(response => response.json())
                                    .then(dataImage => {
                                        if(dataImage.success){
                                            img = dataImage.data
                                            user.img = img
                                            user.id_classroom = user.id_classroom ? user.id_classroom : '12345'
                                            dataUsers.push({...user, roleTitle: role[0].title })
                                        }
                                        callBack(dataUsers)
                                    })
                            }
                        })
                })
        })
}

const generateUsers = () => {
    const roles = require('./variables').variables.roles

    const restChildren = {
        id_role: roles.children,
        photo: 'no-photo.jpg',
        id_parent: null,
        garde: [
            {question: 'garde', response: 'All'},
            {question: 'gardeParentOption', response: null},
            {question: 'gardeOtherOption', response: null}
        ],
        school_info: [
            {question: 'school', response: 'Ecole Nom'},
            {question: 'schoolLevel', response: 'Secondaire 2'},
            {question: 'adlRegister',response: 1},
            {question: 'redouble', response: false},
            {question: 'lastRedoubleLevel', response: null},
            {question: 'registerReason', response: "La raison de l'inscription "},
            {question: 'evaluation', response: false},
            {question: 'daycareService', response: true},
            {question: 'daycareServiceYesName', response: 'Sandrine H.'},
            {question: 'daycareServiceYesPhone', response: '(514) 666-8989'}
        ],
        medical_info: [
            {question: 'ramq', response: true},
            {question: 'expiration', response: '02/2022'},
            {question: 'allergies', response: 'Liste des allergies'},
            {question: 'drug', response: 'Liste des medicaments'},
            {question: 'othersInfos', response: 'Autres Informations...'}
        ],
        authorization: [
            {question: 'autorisationPapper', response: true},
            {question: 'autorisationInternet', response: false}
        ]
    }

    const restParentCollaborater = {
        photo: 'no-photo.jpg',
        id_role: roles.collab_parent,
        contact: [{ title: 'home', phone: '(514) 300-9410'}, { title: 'work', phone: null}, { title: 'personal', phone: '(418) 854-4512'}, { title: 'emergency', phone: null}],
        has_child: true, is_subscribed: true,
        membership: [
            {question: "membership", response: "membership_becomeMember"},
            {question: "memberCard", response: null},
            {question: "discountCard", response: true},
            {question: "paymentMethod", response: "Carte de Crédit"}
        ],
        school_info: [],
        medical_info: [],
        authorization: [],
        isValid: false,
        password: 'parent_collab123...',
        involvement: [
            {
                question: "snacks",
                response: "false"
            },
            {
                question: "talents",
                response: "Implications Texte Implications Texte Implications…tions Texte Implications Texte Implications Texte"
            },
            {
                question: "support",
                response: "true"
            },
            {
                question: "organization",
                response: "true"
            },
            {
                question: "otherInvolvement",
                response: "Participer Texte Participer Texte Participer Texte…articiper Texte Participer Texte Participer Texte"
            }
        ],
        expectation: "Attentes Texte Attentes Texte Attentes Texte Attentes Texte Attentes Texte Attentes Texte",
        need: "Besoins Texte Besoins Texte Besoins Texte Besoins Texte Besoins Texte Besoins Texte Besoins Texte",
        question: [
            {question: "Question 1 here", response: "Response 1 here"},
            {question: "Question 2 here", response: "Response 2 here"}
        ],
        comment: "Comments here",
        experience: "Experience here",
        motivation: "Motivation here"
    }

    const restParent = {
        photo: 'no-photo.jpg',
        id_role: roles.parent,
        contact: [{ title: 'home', phone: '(514) 363-7840'}, { title: 'work', phone: '(514) 820-5545'}, { title: 'personal', phone: null}, { title: 'emergency', phone: null}],
        has_child: true, is_subscribed: true,
        membership: [
            {question: "membership", response: "membership_becomeMember"},
            {question: "memberCard", response: null},
            {question: "discountCard", response: true},
            {question: "paymentMethod", response: "Carte de Crédit"}
        ],
        school_info: [],
        medical_info: [],
        authorization: [],
        isValid: false,
        password: 'parent123...',
        involvement: [
            {
                question: "snacks",
                response: "false"
            },
            {
                question: "talents",
                response: "Implications Texte Implications Texte Implications…tions Texte Implications Texte Implications Texte"
            },
            {
                question: "support",
                response: "true"
            },
            {
                question: "organization",
                response: "true"
            },
            {
                question: "otherInvolvement",
                response: "Participer Texte Participer Texte Participer Texte…articiper Texte Participer Texte Participer Texte"
            }
        ],
        expectation: "Attentes Texte Attentes Texte Attentes Texte Attentes Texte Attentes Texte Attentes Texte",
        need: "Besoins Texte Besoins Texte Besoins Texte Besoins Texte Besoins Texte Besoins Texte Besoins Texte"
    }

    const restCollaborater = {
        photo: 'no-photo.jpg',
        id_role: roles.collaborater,
        contact: [{ title: 'home', phone: '(418) 896-2145'}, { title: 'work', phone: null}, { title: 'personal', phone: '(514) 021-9654'}, { title: 'emergency', phone: null}],
        has_child: true, is_subscribed: true,
        membership: [
            {question: "membership", response: "membership_becomeMember"},
            {question: "memberCard", response: null},
            {question: "discountCard", response: true},
            {question: "paymentMethod", response: "Carte de Crédit"}
        ],
        school_info: [],
        medical_info: [],
        authorization: [],
        isValid: false,
        password: 'collaborateur123...',
        question: [
            {question: "Question 1 here", response: "Response 1 here"},
            {question: "Question 2 here", response: "Response 2 here"}
        ],
        comment: "Comments here",
        experience: "Experience here",
        motivation: "Motivation here"
    }

    const datas = {
        parentCollab: [
            { sex: 'female', first_name: 'Fifine', last_name: 'Pirouet', address: '4045 Port Washington Road', email: 'fifinePirouet@superrito.com', birthday: '1/7/1984', ...restParentCollaborater},
            { sex: 'female', first_name: 'Alexandrie', last_name: 'Charpie', address: '2526 49th Avenue', email: 'alexandrieCharpie@einrot.com', birthday: '3/23/1985', ...restParentCollaborater},
            { sex: 'male', first_name: 'Burnell', last_name: 'Chartré', address: '4589 Gateway Blvd', email: 'burnellChartre@superrito.com', birthday: '3/11/1978', ...restParentCollaborater},
            { sex: 'female', first_name: 'Mavise', last_name: 'Savard', address: '3859 Davis Drive', email: 'maviseSavard@jourrapide.com', birthday: '1/9/1974', ...restParentCollaborater},
            { sex: 'male', first_name: 'Forrest', last_name: 'Chevrette', address: '2539 Fallon Drive', email: 'forrestChevrette@einrot.com', birthday: '7/5/1996', ...restParentCollaborater},
            { sex: 'female', first_name: 'Slainie', last_name: 'Paradis', address: "603 De L'Acadie Boul", email: 'slainieParadis@fleckens.com', birthday: '2/14/1984', ...restParentCollaborater},
            { sex: 'male', first_name: 'Gustave', last_name: 'Sirois', address: '685 rue de la Gauchetière', email: 'gustaveSirois@armyspy.com', birthday: '8/30/1953', ...restParentCollaborater},
            { sex: 'male', first_name: 'Saville', last_name: 'Deschênes', address: '178 Thatcher Avenue', email: 'savilleDeschenes@armyspy.com', birthday: '1/20/1968', ...restParentCollaborater},
            { sex: 'male', first_name: 'Oliver', last_name: 'Morel', address: '3058 Heritage Drive', email: 'oliverMorel@rhyta.com', birthday: '10/30/1968', ...restParentCollaborater},
        ],
        parents: [
            { sex: 'male', first_name: 'Avenall', last_name: 'Rhéaume', address: '4681 Galts Ave', email: 'avenallRheaume@superrito.com', birthday: '8/27/1991', ...restParent},
            { sex: 'female', first_name: 'Etoile', last_name: 'Vernadeau', address: '2689 Burdett Avenue', email: 'etoileVernadeau@rhyta.com', birthday: '2/17/1966', ...restParent},
            { sex: 'female', first_name: 'Annette', last_name: 'Létourneau', address: '3236 A Avenue', email: 'annetteLetourneau@gustr.com', birthday: '12/4/1958', ...restParent},
            { sex: 'male', first_name: 'Algernon', last_name: 'Girard', address: '464 Tchesinkut Lake Rd', email: 'algernonGirard@cuvox.com', birthday: '5/3/1970', ...restParent},
            { sex: 'male', first_name: 'Merlin', last_name: 'Chnadonnet', address: '2170 St Jean Baptiste St', email: 'merlinChnadonnet@teleworm.com', birthday: '7/23/1997', ...restParent},
            { sex: 'female', first_name: 'Voleta', last_name: 'Paulet', address: '128 Rue King', email: 'voletaPaulet@einrot.com', birthday: '7/1/1976', ...restParent},
            { sex: 'male', first_name: 'Antoine', last_name: 'Pouliotte', address: '4559 Parkdale Avenue', email: 'antoinePouliotte@teleworm.com', birthday: '12/10/1980', ...restParent},
            { sex: 'female', first_name: 'Corinne', last_name: 'Brunelle', address: '4672 Pape Ave', email: 'corinneBrunelle@teleworm.com', birthday: '12/21/1968', ...restParent},
            { sex: 'male', first_name: 'Ansel', last_name: 'Michaud', address: '3310 Bloor Street', email: 'anselMichaud@superrito.com', birthday: '10/6/1968', ...restParent},
            { sex: 'female', first_name: 'Ermengardi', last_name: 'Garcia', address: '3880 St. John Street', email: 'ermengardiGarcia@fleckens.com', birthday: '11/2/1953', ...restParent},
            { sex: 'male', first_name: 'Ignace', last_name: 'Allard', address: '4164 York St', email: 'ignaceAllard@dayrep.com', birthday: '6/5/1991', ...restParent},
            { sex: 'male', first_name: 'Gradasso', last_name: 'Soucy', address: '176 Bellwood Acres Rd', email: 'gradassoSoucy@teleworm.com', birthday: '6/7/1977', ...restParent},
            { sex: 'male', first_name: 'Jay', last_name: 'de Brisay', address: '2864 Adelaide St', email: 'jaydeBrisay@armyspy.com', birthday: '3/30/1959', ...restParent},
            { sex: 'female', first_name: 'Sophie', last_name: 'Viens', address: '540 Heritage Drive', email: 'sophieViens@fleckens.com', birthday: '10/25/1955', ...restParent},
            { sex: 'female', first_name: 'Estelle', last_name: 'Giroux', address: '3939 Côte Joyeuse', email: 'estelleGiroux@superrito.com', birthday: '11/16/1977', ...restParent},
        ],
        collaboraters: [
            { sex: 'male', first_name: 'Peverell', last_name: 'Rocher', address: '2287 Speers Road', email: 'peverellRocher@jourrapide.com', birthday: '8/2/1955', ...restCollaborater},
            { sex: 'male', first_name: 'Xavier', last_name: 'Boucher', address: '3338 Halsey Avenue', email: 'xavierBoucher@einrot.com', birthday: '8/6/1981', ...restCollaborater},
            { sex: 'female', first_name: 'Cendrillon', last_name: 'Riel', address: '1146 Brand Road', email: 'cendrillonRiel@fleckens.com', birthday: '9/1/1990', ...restCollaborater},
            { sex: 'female', first_name: 'Clarice', last_name: 'Charpie', address: '2751 rue des Champs', email: 'clariceCharpie@fleckens.com', birthday: '2/12/1974', ...restCollaborater},
            { sex: 'male', first_name: 'Aubert', last_name: 'Piedalue', address: '4911 40th Street', email: 'aubertPiedalue@gustr.com', birthday: '3/20/1983', ...restCollaborater},
            { sex: 'female', first_name: 'France', last_name: 'Courtois', address: '4342 Victoria Park Ave', email: 'franceCourtois@superrito.com', birthday: '3/16/2001', ...restCollaborater},
        ],
        childrens: [
            { first_name: 'Rive', last_name: 'Leclair', birthday: '10/8/2008', ...restChildren},
            { first_name: 'Vick', last_name: 'Garnier', birthday: '12/17/2007', ...restChildren},
            { first_name: 'Arridano', last_name: 'Ouellet', birthday: '11/19/2002', ...restChildren},
            { first_name: 'Arthur', last_name: 'Perreault', birthday: '9/26/2013', ...restChildren},
            { first_name: 'Océane', last_name: 'Pépin', birthday: '1/6/2009', ...restChildren},
            { first_name: 'Henri', last_name: 'Mailhot', birthday: '5/30/2009', ...restChildren},
            { first_name: 'Thierry', last_name: 'Trudeau', birthday: '8/23/2004', ...restChildren},
            { first_name: 'Xavier', last_name: 'Frappier', birthday: '2/7/2007', ...restChildren},
            { first_name: 'Langley', last_name: 'Daigle', birthday: '12/23/2003', ...restChildren},
            { first_name: 'Aurélie', last_name: 'Paulet', birthday: '10/7/2012', ...restChildren},
            { first_name: 'Marshall', last_name: 'Lévesque', birthday: '7/18/2004', ...restChildren},
            { first_name: 'Florismart', last_name: 'Quirion', birthday: '8/19/2010', ...restChildren},
            { first_name: 'Corinne', last_name: 'Croteau', birthday: '1/27/2015', ...restChildren},
            { first_name: 'Philippine', last_name: 'Vertefeuille', birthday: '7/19/2009', ...restChildren},
            { first_name: 'Jérôme', last_name: 'Mousseau', birthday: '7/10/2009', ...restChildren},
            { first_name: 'Arno', last_name: 'Petrie', birthday: '10/18/2009', ...restChildren},
            { first_name: 'Loring', last_name: 'Margand', birthday: '8/6/2002', ...restChildren},
            { first_name: 'Simone', last_name: 'Langlais', birthday: '10/30/2008', ...restChildren},
            { first_name: 'Faustin', last_name: 'Chouinard', birthday: '7/26/2006', ...restChildren},
            { first_name: 'Daniel', last_name: 'Bonami', birthday: '5/14/2003', ...restChildren},
            { first_name: 'Dorene', last_name: 'Davignon', birthday: '1/1/2014', ...restChildren},
            { first_name: 'Ansel', last_name: 'Josseaume', birthday: '5/10/2004', ...restChildren},
            { first_name: 'Gaetan', last_name: 'Duhamel', birthday: '3/11/2008', ...restChildren},
            { first_name: 'Pauline', last_name: 'Lamarre', birthday: '11/24/2011', ...restChildren},
            { first_name: 'Alice', last_name: 'Cormier', birthday: '6/4/2003', ...restChildren},
            { first_name: 'Coralie', last_name: 'Gougeon', birthday: '7/26/2010', ...restChildren},
            { first_name: 'Thérèse', last_name: 'Plaisance', birthday: '12/17/2014', ...restChildren},
            { first_name: 'Burnell', last_name: 'Lamare', birthday: '12/27/2006', ...restChildren},
            { first_name: 'Faustin', last_name: 'Courtois', birthday: '12/12/2012', ...restChildren},
            { first_name: 'Talon', last_name: 'Faubert', birthday: '1/8/2013', ...restChildren},
            { first_name: 'Laverne', last_name: 'Ouellet', birthday: '4/3/2007', ...restChildren},
            { first_name: 'Xavier', last_name: 'Ricard', birthday: '9/14/2008', ...restChildren},
            { first_name: 'Favor', last_name: 'Beaulé', birthday: '7/1/2008', ...restChildren},
            { first_name: 'Jules', last_name: 'Gervais', birthday: '11/28/2007', ...restChildren},
            { first_name: 'Auriville', last_name: 'Jetté', birthday: '10/11/2006', ...restChildren},
            { first_name: 'Josette', last_name: 'Cliche', birthday: '9/24/2013', ...restChildren},
            { first_name: 'Evrard', last_name: 'Lacharité', birthday: '8/29/2004', ...restChildren},
            { first_name: 'Ninette', last_name: 'Devost', birthday: '12/25/2009', ...restChildren},
            { first_name: 'Marc', last_name: 'Ruel', birthday: '9/15/2014', ...restChildren},
            { first_name: 'Amedee', last_name: 'Beaulieu', birthday: '2/10/2006', ...restChildren}
        ]
    }

    const datas2 = {
        parentCollab: [
            { sex: 'female', first_name: 'Fifine', last_name: 'Pirouet', address: '4045 Port Washington Road', email: 'fifinePirouet@superrito.com', birthday: '1/7/1984', ...restParentCollaborater},
            { sex: 'female', first_name: 'Alexandrie', last_name: 'Charpie', address: '2526 49th Avenue', email: 'alexandrieCharpie@einrot.com', birthday: '3/23/1985', ...restParentCollaborater},
            { sex: 'male', first_name: 'Burnell', last_name: 'Chartré', address: '4589 Gateway Blvd', email: 'burnellChartre@superrito.com', birthday: '3/11/1978', ...restParentCollaborater},
            { sex: 'female', first_name: 'Mavise', last_name: 'Savard', address: '3859 Davis Drive', email: 'maviseSavard@jourrapide.com', birthday: '1/9/1974', ...restParentCollaborater}
        ],
        parents: [
            { sex: 'male', first_name: 'Avenall', last_name: 'Rhéaume', address: '4681 Galts Ave', email: 'avenallRheaume@superrito.com', birthday: '8/27/1991', ...restParent},
            { sex: 'female', first_name: 'Etoile', last_name: 'Vernadeau', address: '2689 Burdett Avenue', email: 'etoileVernadeau@rhyta.com', birthday: '2/17/1966', ...restParent},
            { sex: 'female', first_name: 'Annette', last_name: 'Létourneau', address: '3236 A Avenue', email: 'annetteLetourneau@gustr.com', birthday: '12/4/1958', ...restParent},
            { sex: 'male', first_name: 'Algernon', last_name: 'Girard', address: '464 Tchesinkut Lake Rd', email: 'algernonGirard@cuvox.com', birthday: '5/3/1970', ...restParent}
        ],
        collaboraters: [
            { sex: 'male', first_name: 'Peverell', last_name: 'Rocher', address: '2287 Speers Road', email: 'peverellRocher@jourrapide.com', birthday: '8/2/1955', ...restCollaborater},
            { sex: 'male', first_name: 'Xavier', last_name: 'Boucher', address: '3338 Halsey Avenue', email: 'xavierBoucher@einrot.com', birthday: '8/6/1981', ...restCollaborater},
            { sex: 'female', first_name: 'Cendrillon', last_name: 'Riel', address: '1146 Brand Road', email: 'cendrillonRiel@fleckens.com', birthday: '9/1/1990', ...restCollaborater},
            { sex: 'female', first_name: 'Clarice', last_name: 'Charpie', address: '2751 rue des Champs', email: 'clariceCharpie@fleckens.com', birthday: '2/12/1974', ...restCollaborater},
            { sex: 'male', first_name: 'Aubert', last_name: 'Piedalue', address: '4911 40th Street', email: 'aubertPiedalue@gustr.com', birthday: '3/20/1983', ...restCollaborater},
            { sex: 'female', first_name: 'France', last_name: 'Courtois', address: '4342 Victoria Park Ave', email: 'franceCourtois@superrito.com', birthday: '3/16/2001', ...restCollaborater}
        ],
        childrens: [
            { sex: 'female', first_name: 'Rive', last_name: 'Leclair', birthday: '10/8/2008', ...restChildren},
            { sex: 'male', first_name: 'Vick', last_name: 'Garnier', birthday: '12/17/2007', ...restChildren},
            { sex: 'female', first_name: 'Arianne', last_name: 'Ouellet', birthday: '11/19/2002', ...restChildren},
            { sex: 'male', first_name: 'Arthur', last_name: 'Perreault', birthday: '9/26/2013', ...restChildren},
            { sex: 'female', first_name: 'Océane', last_name: 'Pépin', birthday: '1/6/2009', ...restChildren},
            { sex: 'male', first_name: 'Henri', last_name: 'Mailhot', birthday: '5/30/2009', ...restChildren},
            { sex: 'male', first_name: 'Thierry', last_name: 'Trudeau', birthday: '8/23/2004', ...restChildren},
            { sex: 'female', first_name: 'Melody', last_name: 'Frappier', birthday: '2/7/2007', ...restChildren},
            { sex: 'male', first_name: 'Langley', last_name: 'Daigle', birthday: '12/23/2003', ...restChildren},
            { sex: 'female', first_name: 'Aurélie', last_name: 'Paulet', birthday: '10/7/2012', ...restChildren}
        ]
    }

    return datas2
}

const createCollaborateur = (token, collaboraters) => {
    for (let i = 0; i < collaboraters.length; i++) {
        const user = collaboraters[i]
        fetch(HOST + '/users', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data1 => {
            if (data1.success) {
                const userLogin = {
                    id_user: data1.data._id,
                    email: user.email,
                    password: user.password,
                    is_active: user.isValid
                }
                fetch(HOST + '/logins', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify(userLogin)
                })
                .then(response => response.json())
                .then(data2 => {})
            }
        })
    }
}

const createParent = (token, parents) => {
    for (let i = 0; i < parents.length; i++) {
        const user = parents[i]
        fetch(HOST + '/users', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data1 => {
            if (data1.success) {
                const userLogin = {
                    id_user: data1.data._id,
                    email: user.email,
                    password: user.password,
                    is_active: user.isValid
                }
                fetch(HOST + '/logins', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify(userLogin)
                })
                .then(response => response.json())
                .then(data2 => {
                    console.log(data2)
                })
            }
        })
    }
}

const createParentCollab = (token, parentCollab) => {
    for (let i = 0; i < parentCollab.length; i++) {
        const user = parentCollab[i]
        fetch(HOST + '/users', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data1 => {
            if (data1.success) {
                const userLogin = {
                    id_user: data1.data._id,
                    email: user.email,
                    password: user.password,
                    is_active: user.isValid
                }
                fetch(HOST + '/logins', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify(userLogin)
                })
                .then(response => response.json())
                .then(data2 => {
                    console.log(data2)
                })
            }
        })
    }
}

const createUsers = (token, parents, collaboraters, collab_parent, childrens) => {

    createCollaborateur(token, collaboraters)
    const parent_and_collab_parent = [...parents, ...collab_parent]

    for (let i = 0; i < parent_and_collab_parent.length; i++) {
        const user = parent_and_collab_parent[i]
        let child1 = (i * 2)
        let child2 = (i * 2 + 1)
        if(i >= 2){
            child1 = 2 + i
            child2 = null
        }

        fetch(HOST + '/users', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data1 => {
            if (data1.success) {
                const userLogin = {
                    id_user: data1.data._id,
                    email: user.email,
                    password: user.password,
                    is_active: user.isValid
                }
                fetch(HOST + '/logins', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify(userLogin)
                })
                .then(response => response.json())
                .then(data2 => {
                    if(data2.success){

                        // School Name
                        let schoolName = ''
                        if(i <= 1){
                            schoolName = 'Bruschési'
                        }else if(i <= 3){
                            schoolName = 'Laurier'
                        }else if(i <= 5){
                            schoolName = 'Saint Enfant Jésus'
                        }else{
                            schoolName = 'Saint Pierre Claver'
                        }
                        // School Level
                        let schoolLevel = ''
                        if(i === 0 || i === 4) schoolLevel = 'Secondaire 3'
                        if(i === 2 || i === 7) schoolLevel = 'Secondaire 1'
                        if(i === 5 || i === 1) schoolLevel = 'Primaire 6'
                        if(i === 8 || i === 3) schoolLevel = 'Secondaire 2'
                        if(i === 6 || i === 9) schoolLevel = 'Secondaire 4'
                        // Allergies
                        let allergies = ''
                        if(i === 1 || i === 3 || i === 5 || i === 6 || i === 8 || i === 0) allergies = ''
                        if(i === 4 || i === 7) allergies = 'Kiwi'
                        if(i === 9) allergies = 'Produits Laitiers'
                        if(i === 2) allergies = 'Cannelle'

                        const children1 = childrens[child1]
                        children1.id_parent = data1.data._id
                        children1.school_info[0].response = schoolName
                        children1.school_info[1].response = schoolLevel
                        children1.medical_info[2].response = allergies
                        fetch(HOST + '/users', {
                            method: 'post',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + token
                            },
                            body: JSON.stringify(children1)
                        })
                        .then(response => response.json())
                        .then(dataChild1 => {})

                        if(child2 !== null){
                            const children2 = childrens[child2]
                            children2.id_parent = data1.data._id
                            children2.school_info[0].response = schoolName
                            children2.school_info[1].response = schoolLevel
                            children2.medical_info[2].response = allergies
                            fetch(HOST + '/users', {
                                method: 'post',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + token
                                },
                                body: JSON.stringify(children2)
                            })
                            .then(response => response.json())
                            .then(dataChild2 => {})
                        }
                    }
                })
            }
        })
    }
}

const deleteAllUser = (token) => {
    const roles = require('./variables').variables.roles
    let superAdmin = null
    fetch(HOST + '/users', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {

            const users = data.data.filter(user => user.id_role !== roles.super_admin)
            superAdmin = data.data.filter(user => user.id_role === roles.super_admin)
            console.log(users)
            for (let j = 0; j < users.length; j++) {
                fetch(HOST + '/users/' + users[j]._id, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })
                .then(response => response.json())
                .then(data2 => {})
            }
        })

        if(superAdmin !== null){
            fetch(HOST + '/logins', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => response.json())
                .then(dataLogins => {
                    for (let i = 0; i < dataLogins.data.length; i++) {
                        if(dataLogins.data[i].id_user !== superAdmin[0]._id){
                            fetch(HOST + '/logins/' + dataLogins.data[i]._id, {
                                method: 'DELETE',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + token
                                }
                            })
                            .then(response => response.json())
                            .then(data2 => {})
                        }
                    }
                })
        }
}

const updateUserValidities = (token, users, callBack) => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        fetch(HOST + '/logins/'+ user.idLogin, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({is_active: user.isValid})
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                getAllUsers(token, callBack)
            }
        })
    }
}

const updateUserImage = (token, user, file, callBack) => {
    const formData = new FormData()
    formData.append("file", file[0])
        fetch(HOST + '/users/' + user._id + '/photo', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                callBack(data)
            })
            .catch()
}

const getClassRooms = (token, callBack) => {
    fetch(HOST + '/classrooms', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            callBack(data.data)
        })
}

const getClassRoomsAndCollaborater = (token, callBack) => {
    fetch(HOST + '/classrooms', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(dataClassRoom => {
            fetch(HOST + '/users', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => response.json())
                .then(data => {
                    callBack(data.data)
                })
        })
}

const getRoles = (callBack) => {
    fetch(HOST + '/roles')
        .then(response => response.json())
        .then(dataRoles => {
            if(dataRoles.success){
                const id_collab_parent = (dataRoles.data.filter(role => role.title === 'collab_parent'))[0]._id
                callBack(dataRoles.data.filter(role => (role.title !== 'super_admin' && role.title !== 'collab_parent')), id_collab_parent)
            }
        })
}

const getAllSchedules = (token, callBack) => {
    fetch(HOST + '/schedules', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            callBack(data.data)
        }
    })
}

export default {
    encodeData,
    decodeData,
    authLogin,
    logOutUser,
    getCurrentUser,
    validateEmail,
    addUser,
    deleteLogin,
    getAddressFromGoogle,
    getRolesAndDays,
    registerSaveUser,
    saveChildren,
    getAllUsers,
    generateUsers,
    deleteAllUser,
    createUsers,
    updateUserValidities,
    getAllSchedules,
    role:{
        get: getRoles
    },
    image:{
        get: getImage,
        update: updateUserImage
    },
    classRoom: {
        get: getClassRooms
    }
}
