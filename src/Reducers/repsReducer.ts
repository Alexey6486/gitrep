import {RepsApi} from "../Api/RepsApi";

type OwnerType = {
    id: number
    login: string
    url: string
}
type RepsArrType = {
    id: number
    name: string
    owner: OwnerType
    html_url: string
    description: string
}

const GET_REPS = 'GET_REPS';

type GetRepsActionCreatorType = {
    type: typeof GET_REPS
    repsArr: Array<RepsArrType>
}

const getReps = (repsArr: Array<RepsArrType>):GetRepsActionCreatorType => {
    return {
        type: GET_REPS,
        repsArr
    }
};

type ActionsType = GetRepsActionCreatorType;
type DispatchRepsType = (action: ActionsType) => void;

export type RepsStateType = {
    repsArr: Array<RepsArrType>,
    currentPage: number,
}

const initState: RepsStateType = {
    repsArr: [],
    currentPage: 1,
};

export const repsReducer = (state: RepsStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case GET_REPS:
            const getRepsDeepCopy = action.repsArr.map(rep => rep.owner ? {...rep, owner: rep.owner} : rep);
            return {...state, repsArr: getRepsDeepCopy};
        default:
            return state;
    }
};

export const getRepsThunkCreator = (currentPage: number) => (dispatch: DispatchRepsType) => {
    RepsApi.getReps(currentPage)
        .then(res => {
            dispatch(getReps(res.items));
        })
};