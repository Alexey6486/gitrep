import React, {useEffect} from "react";
import s from './Reps.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../Store/Store";
import {getRepsThunkCreator, RepsStateType} from "../Reducers/repsReducer";

export const Reps = () => {

    const dispatch = useDispatch();
    const repsState = useSelector<AppRootState, RepsStateType>(state => state.repsReducer);
    const {repsArr, currentPage} = repsState;

    useEffect(() => {
        dispatch(getRepsThunkCreator(currentPage))
    }, [dispatch, currentPage]);

    const repsMap = repsArr.map(rep => {
        return (
            <div className={s.repWrap}>
                <div className={s.repWrap__item}>Rep ID: {rep.id}</div>
                <div className={s.repWrap__item}>Rep Name: {rep.name}</div>
                <div className={s.repWrap__item}>Rep Owner ID: {rep.owner.id}</div>
                <div className={s.repWrap__item}>Rep Owner Name: {rep.owner.login}</div>
            </div>
        );
    });

    return (
        <div className={s.repsWrap}>
            {repsMap}
        </div>
    );
};