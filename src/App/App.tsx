import React from 'react';
import s from './App.module.css'
import {Reps} from "../Reps/Reps";

function App() {
  return (
    <div className={s.appWrap}>
        <div className={'container'}>
            <Reps />
        </div>
    </div>
  );
}

export default App;
