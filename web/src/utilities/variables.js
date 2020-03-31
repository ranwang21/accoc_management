'use strict'
const variables = {
    role: {
        highAdmin: 'super_admin',
        admin: 'admin',
        parent: 'parent',
        collab: 'collaborator',
        both: 'collab_parent',
        child: 'children'
    },
    actors: {
        children: 'IJNDVFBHCD',
        parent: 'RGBGVBCHSN',
        collaborator: 'VBGNVGCHDNXD',
        both: 'TWGSDVCHEDJH',
        admin: 'UEHSDVHSB'
    },
    menus: {
        allUsers: 'DGFDVGSHBFNC',
        validation: 'DHGHICSJBISKHZ',
        createAccount: 'POKJHSFNCKD',
        classroomManagement: 'KJHGFVDGWHSNGDH',
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
                both: 'E5SFC4S1ZC4S'
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
            sex_mme: '8R5D4GF1VD51',
            sex_mr: '8R5D4GF1VD52',

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
            membership_becomeMember_discountCard: '8E5D4F1E5D6',

            participation: '6DF2CD52XD1',
            participation_cuisine: '6DF2CD52XD11',
            participation_debrouille: '6DF2CD52XD12',
            participation_jmc: '6DF2CD52XD13',
            participation_diverses: '6DF2CD52XD14',
            participation_repas: '6DF2CD52XD15',
            participation_viecomm: '6DF2CD52XD16',
            participation_atelier: '6DF2CD52XD17',
            participation_diverses_options: '6DF2CD52XD18',

            volunteering: 'D5F41CD52F1C',
            volunteering_accueil: 'D5F41CD52F1C1',
            volunteering_devoirs: 'D5F41CD52F1C2',
            volunteering_diverses: 'D5F41CD52F1C3',
            volunteering_citoyenne: 'D5F41CD52F1C4',
            volunteering_repas: 'D5F41CD52F1C5',
            volunteering_diverses_options: 'D5F41CD52F1C6'
        },
        childrenRegister: {
            identification: 'childrenRegisteridentification',
            lastName: 'childrenRegisteridentification8E5D4FDW185S',
            firstName: 'childrenRegisteridentificationQ8W7E4F2S8D',
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

        }
    }
}

module.exports = {
    variables
}
