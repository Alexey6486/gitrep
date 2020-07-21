import {repsApi} from "../Api/RepsApi";

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
    stargazers_count: number
    updated_at: string
    svn_url: string
}

const GET_REPS = 'GET_REPS';
const SET_TOTAL_REPS = 'SET_TOTAL_REPS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

type GetRepsActionCreatorType = {
    type: typeof GET_REPS
    repsArr: Array<RepsArrType>
}
type SetTotalRepsActionCreatorType = {
    type: typeof SET_TOTAL_REPS
    totalReps: number
}
type SetCurrentPageActionCreatorType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

const getReps = (repsArr: Array<RepsArrType>):GetRepsActionCreatorType => {
    return {
        type: GET_REPS,
        repsArr
    }
};
const setTotalReps = (totalReps: number):SetTotalRepsActionCreatorType => {
    return {
        type: SET_TOTAL_REPS,
        totalReps,
    }
};
const setCurrentPage = (currentPage: number):SetCurrentPageActionCreatorType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    }
};

type ActionsType = GetRepsActionCreatorType | SetTotalRepsActionCreatorType | SetCurrentPageActionCreatorType;
type DispatchRepsType = (action: ActionsType) => void;

export type RepsStateType = {
    repsArr: Array<RepsArrType>
    currentPage: number
    totalReps: number
    pageSize: number
    portionSize: number
}

const initState: RepsStateType = {
    repsArr: [],
    currentPage: 1,
    totalReps: 0,
    pageSize: 5,
    portionSize: 5,
};

export const repsReducer = (state: RepsStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case GET_REPS:
            const getRepsDeepCopy = action.repsArr.map(rep => rep.owner ? {...rep, owner: rep.owner} : rep);
            return {...state, repsArr: getRepsDeepCopy};
        case SET_TOTAL_REPS:
            return {...state, totalReps: action.totalReps};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        default:
            return state;
    }
};

export const getRepsThunkCreator = (currentPage: number) => (dispatch: DispatchRepsType) => {
    repsApi.getReps(currentPage)
        .then(res => {
            dispatch(getReps(res.items));
            dispatch(setCurrentPage(currentPage));
        })
};
export const setTotalRepsThunkCreator = () => (dispatch: DispatchRepsType) => {
    repsApi.setTotalRepsApi()
        .then(res => {
            dispatch(setTotalReps(res));
        })
};