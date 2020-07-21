import React, {useEffect} from "react";
import s from './RepInfo.module.css';
import { withRouter, RouteComponentProps } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { AppRootState } from "../Store/Store";
import {getRepInfoThunkCreator, RepInfoType} from "../Reducers/repInfoReducer";

type ParamProps = {
    owner: string
    repname: string
}
type PropsType = RouteComponentProps<ParamProps>;


const RepsInfo = (props: PropsType) => {

    const dispatch = useDispatch();
    const repInfoState = useSelector<AppRootState, RepInfoType>(state => state.repInfo);
    const {name, owner, description, stargazers_count, updated_at} = repInfoState;

    useEffect(() => {
        const repOwner = props.match.params.owner;
        const repName = props.match.params.repname;

        dispatch(getRepInfoThunkCreator(repOwner, repName))
    }, [dispatch, props.match.params.owner, props.match.params.repname]);

    return (
        <div className={s.repInfoWrap}>
            <div className={s.repInfoOwner}>
                <img src={owner.avatar_url}/>
                <div>{owner.login}</div>
            </div>
            <div className={s.repInfoContent}>
                <div className={s.repInfoContent__row}>
                    <div className={s.repInfoContent__Title}>Rep's name:</div>
                    <div className={s.repInfoContent__Data}>{name}</div>
                </div>
                <div className={s.repInfoContent__row}>
                    <div className={s.repInfoContent__Title}>Info:</div>
                    <div className={s.repInfoContent__Data}>{description}</div>
                </div>
                <div className={s.repInfoContent__row}>
                    <div className={s.repInfoContent__Title}>Stars:</div>
                    <div className={s.repInfoContent__Data}>{stargazers_count}</div>
                </div>
                <div className={s.repInfoContent__row}>
                    <div className={s.repInfoContent__Title}>Last commit:</div>
                    <div className={s.repInfoContent__Data}>{updated_at}</div>
                </div>
            </div>
        </div>
    );
};

export const RepsInfoWithRouter = withRouter(RepsInfo);