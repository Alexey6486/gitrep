import {repInfoApi} from "../Api/RepInfoApi";
type OwnerType = {
    login: string
    avatar_url: string | undefined
}
type ContributerType = {
    login: string
    contributions: number
    url: string
}
type LanguagesType = {
    [key: string]: number
}
export type RepInfoType = {
    name: string
    stargazers_count: number
    updated_at: string
    //languages_url: LanguagesType | null
    description: string
    //contributors_url: Array<ContributerType> | null
    owner: OwnerType
}

const GET_REP_INFO = 'GET_REP_INFO';

type GetRepInfoActionCreatorType = {
    type: typeof GET_REP_INFO
    repInfo: RepInfoType
}

const getRepInfo = (repInfo: RepInfoType): GetRepInfoActionCreatorType => {
    return {
        type: GET_REP_INFO,
        repInfo
    }
};

type ActionsType = GetRepInfoActionCreatorType;
type DispatchRepInfoType = (action: ActionsType) => void;

const initState: RepInfoType = {
    name: "",
    stargazers_count: 0,
    updated_at: "",
    owner: {
        login: "",
        avatar_url: ""
    },
    //languages_url: {},
    description: "",
    //contributors_url: [],
};

export const repInfo = (state: RepInfoType = initState, action: ActionsType) => {
    switch (action.type) {
        case GET_REP_INFO:
            const repInfoState = action.repInfo;
            return {...repInfoState, owner: repInfoState.owner};
        default:
            return state;
    }
};

export const getRepInfoThunkCreator = (repOwner: string, repName: string) => (dispatch: DispatchRepInfoType) => {
    repInfoApi.getRepInfoApi(repOwner, repName)
        .then(res => dispatch(getRepInfo(res)))
};