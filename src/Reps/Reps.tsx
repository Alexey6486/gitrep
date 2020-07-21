import React, {useEffect} from "react";
import s from './Reps.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../Store/Store";
import {getRepsThunkCreator, RepsStateType, setTotalRepsThunkCreator} from "../Reducers/repsReducer";
import {Pagination} from "../Pagination/Pagination";
import {NavLink} from "react-router-dom";

export const Reps = () => {

    const dispatch = useDispatch();
    const repsState = useSelector<AppRootState, RepsStateType>(state => state.repsReducer);
    const {repsArr, currentPage, totalReps, portionSize, pageSize} = repsState;

    const onPageChange = (page: number) => {
        dispatch(getRepsThunkCreator(page));
    };

    useEffect(() => {
        dispatch(getRepsThunkCreator(currentPage));
        dispatch(setTotalRepsThunkCreator());
    }, [dispatch, currentPage]);

    const repsMap = repsArr.map(rep => {
        return (
            <div className={s.repWrap}>
                <div className={s.repWrap__item}>Rep's Name: <NavLink to={`/repinfo/${rep.owner.login}/${rep.name}`}>{rep.name}</NavLink></div>
                <div className={s.repWrap__item}>Stars: <span>{rep.stargazers_count}</span></div>
                <div className={s.repWrap__item}>Last Commit: <span>{rep.updated_at}</span></div>
                <a href={rep.svn_url}>Link to the Rep...</a>
            </div>
        );
    });

    return (
        <>
            <div className={s.repsWrap}>
                {repsMap}
            </div>
            <div className={s.paginationWrap}>
                <Pagination currentPage={currentPage} totalItems={totalReps} portionSize={portionSize} pageSize={pageSize} onPageChange={onPageChange}/>
            </div>
        </>
    );
};