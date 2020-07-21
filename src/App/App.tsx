import React from 'react';
import s from './App.module.css'
import {Reps} from "../Reps/Reps";
import { Route } from 'react-router-dom';
import {RepsInfoWithRouter} from "../RepInfo/RepInfo";

function App() {
  return (
    <div className={s.appWrap}>
        <div className={'container'}>
            <div className={s.appContent}>
                <div className={s.repsList}>
                    <Reps />
                </div>
                <div className={s.repInfo}>
                    <Route path={'/repinfo/:owner/:repname'} render={() => <RepsInfoWithRouter />}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
