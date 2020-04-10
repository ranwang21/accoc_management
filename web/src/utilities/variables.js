'use strict'
const variables = {
    role: {
        highAdmin: 'super_admin',
        admin: 'admin',
        parent: 'parent',
        collab: 'collaborater',
        both: 'collab_parent',
        child: 'children'
    },
    actors: {
        children: 'IJNDVFBHCD',
        collaborator: 'VBGNVGCHDNXD',
        parent: 'RGBGVBCHSN',
        both: 'TWGSDVCHEDJH',
        admin: 'UEHSDVHSB'
    },
    menus: {
        allUsers: 'DGFDVGSHBFNC',
        validation: 'DHGHICSJBISKHZ',
        createAccount: 'POKJHSFNCKD',
        classroomManagement: 'KJHGFVDGWHSNGDH',
        scheduleManagement: 'GDHVFBNCDHGN',
        prints: 'RWFFABWSMND',
        childList: 'UHNDBVDHNBN',
        profile: 'GESBVDBQUJA',
        schedule: 'SGGHZGHNSJD',
        logOut: 'WIJSFBCHDS'
    },
    cookies: {
        user: 'APISID',
        token: 'RIKSGD'
    },
    id: {
        loginRegister: {
            showLogin: 'loginRegister85421502',
            showRegister: 'loginRegisters54d1c5s'
        },
        login: {
            email: '5D2FC1ED5X2',
            password: 'EDF41C5S205SD'
        },
        registerStart: {
            check: {
                parent: '5S4D1CS5Z',
                collaborator: '8S51CS85D2X',
                both: 'E5SFC4S1ZC4S',
                children: 'URHDFNBNCD'
            }
        },
        createAdmin: {
            lastName: '8ED5F4C1D',
            firstName: 'E85SF41CS52',
            email: 'GESGNCBN',
            password: 'SHDGBCSJZ',
            confirmPassword: 'TGSVDCBHS',
            validation: 'E5S4F1CS52'
        },
        register: {
            sex: '8R5D4GF1VD5',
            female: '8R5D4GF1VD51',
            male: '8R5D4GF1VD52',

            birthday: '7E4DE54F15ED2',
            last_name: '8E5D4FDW185S',
            first_name: 'Q8W7E4F2S8D',
            email: '9A62S41XC4D2F',
            address: '5141428422',

            contacts: 'E85DF4CED521',
            contacts_personal: 'E85DF4CED5211',
            contacts_home: 'E85DF4CED5212',
            contacts_work: 'E85DF4CED5213',
            contacts_emergency: 'E85DF4CED5215',

            is_subscribed: 'AS41XCS52DZ1',
            has_child: '9D6F4DX1S5D',

            membership: '8E5D4F1E5D',
            membership_becomeMember: '8E5D4F1E5D1',
            membership_alreadyMember: '8E5D4F1E5D2',
            membership_notWantMember: '8E5D4F1E5D3',
            membership_becomeMember_paymentMethod: '8E5D4F1E5D4',
            membership_becomeMember_memberCard: '8E5D4F1E5D5',
            membership_becomeMember_discountCard: '8E5D4F1E5D6'
        },
        childrenRegister: {
            identification: 'childrenRegisteridentification',
            last_name: 'childrenRegisteridentification8E5D4FDW185S',
            first_name: 'childrenRegisteridentificationQ8W7E4F2S8D',
            birthday: 'childrenRegisteridentification7E4DE54F15ED2',
            garde: 'childrenRegisteridentification8R5D4F1E5D',
            gardeAll: 'childrenRegisteridentification8R5D4F1E5D1',
            gardeShared: 'childrenRegisteridentification8R5D4F1E5D2',
            gardeMother: 'childrenRegisteridentification8R5D4F1E5D3',
            gardeFather: 'childrenRegisteridentification8R5D4F1E5D4',
            gardeOther: 'childrenRegisteridentification8R5D4F1E5D5',
            gardeParentOptionYes: 'childrenRegisteridentificationFGDFG',
            gardeParentOptionNo: 'childrenRegisteridentification8G5FG24',
            gardeOtherOption: 'childrenRegisteridentification8G5FG24E5D24F',

            schoolInfo: 'childrenRegisterschoolInfo',
            school: 'childrenRegisterschoolInfoRDF415DX2',
            schoolLevel: 'childrenRegisterschoolInfoRDF415DX15',
            adlRegister: 'childrenRegisterschoolInfo5S41',
            redouble: 'childrenRegisterschoolInfoRDF8Y5GF24G1',
            redoubleYes: 'childrenRegisterschoolInfoRDF8Y5GF24G11',
            redoubleNo: 'childrenRegisterschoolInfoRDF8Y5GF24G12',
            registerReason: 'childrenRegisterschoolInfoE8RT5U4',
            evaluation: 'childrenRegisterschoolInfo5FG42F1E',
            evaluationYes: 'childrenRegisterschoolInfo5FG42F1E1',
            evaluationNo: 'childrenRegisterschoolInfo5FG42F1E2',
            daycareService: 'childrenRegisterschoolInfoE9R8TY4H',
            daycareServiceYes: 'childrenRegisterschoolInfoE9R8TY4H1',
            daycareServiceNo: 'childrenRegisterschoolInfoE9R8TY4H2',

            medicalInfo: 'childrenRegistermedicalInfo',
            ramq: 'childrenRegistermedicalInforamq',
            expiration: 'childrenRegistermedicalInfoexpiration',
            allergies: 'childrenRegistermedicalInfoallergies',
            drug: 'childrenRegistermedicalInfodrug',
            othersInfos: 'childrenRegistermedicalInfoothersInfos',

            autorisation: 'childrenRegisterautorisation',
            autorisationPapper: 'childrenRegisterautorisation5D4F2',
            autorisationPapperYes: 'childrenRegisterautorisation5D4F21',
            autorisationPapperNo: 'childrenRegisterautorisation5D4F22',
            autorisationInternet: 'childrenRegisterautorisation9WE8R5H4B',
            autorisationInternetYes: 'childrenRegisterautorisation9WE8R5H4B1',
            autorisationInternetNo: 'childrenRegisterautorisation9WE8R5H4B2'

        },
        complementaryInformations: {
            expectations: 'expectationsDD2FDF4VF',
            expectationsVar: 'expectationsDD2FDF4VF1',

            needs: 'needshgfgdfv',
            needsVar: 'needshgfgdfv5421',

            involvement: 'implicationsR5DF42',
            availableFor: 'gehsjhdjhceyhs',
            talents: 'implicationsR5DF42U5H4J2',
            snacks: 'implicationsR5DF42SS4',
            organization: 'implicationsR5DF42ERGH',
            support: 'implicationsR5DF425FG42F1',
            otherInvolvement: 'implicationsR5DF428G5FGD4F'
        },
        collaboratorBenevoles: {
            availabilityInterest: 'availabilityInterest85d4c',
            availability: 'availabilityInterest85d4c1',
            monday: 'availabilityInterest85d4c11',
            tuesday: 'availabilityInterest85d4c12',
            wednesday: 'availabilityInterest85d4c13',
            thursday: 'availabilityInterest85d4c14',
            interest: 'availabilityInterest85d4c2',
            magicJournal: 'availabilityInterest85d4c21',
            serveSnack: 'availabilityInterest85d4c22',
            animationPreparation: 'availabilityInterest85d4c23',
            accompanyWorkshop: 'availabilityInterest85d4c24',
            prepareSnack: 'availabilityInterest85d4c25',
            accompanyInternet: 'availabilityInterest85d4c26',
            motivationExperience: 'motivationExperienceGSHGDH',
            motivation: 'motivationExperienceGSHGDH1',
            experience: 'motivationExperienceGSHGDH2',
            comment: 'motivationExperienceGSHGDH3',
            heard: 'motivationExperienceGSHGDH4'
        },
        registerPassword: {
            password: 'registerPasswordEDFSDWHS',
            confirmPassword: 'registerPasswordEDFSDWHU'
        }
    },
    templateUser: {
        id_role: null,
        id_child: null, // or array
        id_parent: null, // or array
        id_collaborater: null,
        id_classroom: null,
        first_name: null,
        last_name: null,
        sex: null, // male or female
        address: null,
        birthday: null,
        has_child: false,
        is_subscribed: false,
        contact: {
            personal: null,
            work: null,
            home: null,
            emergency: null
        },
        membership: {
            membership: false,
            paymentMethod: null,
            memberCard: false,
            discountCard: false
        },
        photo: 'no-photo.jpg',
        school_info: {
            name: null,
            level: null,
            adl: false,
            redouble: null,
            evaluation: false,
            reason: null,
            educatorName: null,
            educatorPhone: null
        },
        medical_info: {
            ramq: null,
            ramqExpiration: null,
            allergies: null,
            drugs: null,
            othersInformations: null
        },
        authorization: {
            paper: false,
            internet: false
        },
        involvement: [
            {
                question: 'talents',
                response: 'Response here'
            },
            {
                question: 'snacks',
                response: 'YES/NO'
            },
            {
                question: 'organization',
                response: 'YES/NO'
            },
            {
                question: 'support',
                response: 'YES/NO'
            },
            {
                question: 'otherInvolvement',
                response: 'Response here'
            }
        ],
        expectation: null,
        need: null,
        question: [
            {
                question: 'garde',
                response: null
            },
            {
                question: 'gardeParentOption',
                response: null
            },
            {
                question: 'gardeOtherOption',
                response: null
            },
            {
                question: 'heard',
                response: null
            }
        ],
        availability: [
            null,
            null,
            null,
            null
        ],
        interest: null, // or array
        comment: null,
        experience: null,
        motivation: null
    },
    roles: {
        super_admin: '5e6a3e314554933864b2c3c2',
        parent: '5e6a3e314554933864b2c3c5',
        collaborater: '5e6a3e314554933864b2c3c4',
        admin: '5e6a3e314554933864b2c3c3',
        children: '5e6a3e314554933864b2c3c6',
        collab_parent: '5e6a3e314554933864b2c3c7'
    }
}

module.exports = {
    variables
}
