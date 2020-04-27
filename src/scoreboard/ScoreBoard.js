import React, {useContext,} from 'react'
import Clock from '../controlboard/Clock'
import {ScoreBoardContext} from '../contexts/ScoreBoardContextProvider'
import {ClockContext} from '../contexts/ClockContextProvider'

const ScoreBoard = () => {
   const $ = x => document.querySelector(x);
  // const {timeLeft, startClock, sleep, timeFormatted} = useContext(ClockContext)
  const {scoreData} = useContext(ScoreBoardContext)

  let timePaused = 0;
  let timeStarted = 0;
  let timePausedSum = 0;

  let timeFormatted = () => {
    let tl = scoreData.timeLeft;
    let minutes = Math.floor(tl / 60 / 1000);
    let seconds = Math.floor(tl / 1000) - minutes * 60;
    return (minutes + '').padStart(2, '0') + ':'
      + (seconds + '').padStart(2, 0);
  }

  let startClock = () => {
    if (!timeStarted) {
      timeStarted = Date.now();
    }
    else if (!timePaused) {
      return;
    }
    else {
      timePausedSum += Date.now() - timePaused;
      timePaused = 0;
    }
  }

  let sleep = (ms) => {
    return new Promise(res => setTimeout(res, ms));
  }

  let showClock = () => {
    startClock()
    $('.clock').innerHTML = timeFormatted();
    sleep(500);
  }

  if (scoreData.timeLeft) {
    showClock()
  }

  return (
    <div className="container text-center"> 
      <h1>Score Board</h1>
      <hr/>
      <Clock className="clock"/>
      <h1 className="text-secondary">Team One 
        <span className="text-info pl-3">{scoreData.teamOne}</span>
      </h1>
      <h1 className="text-secondary">Team Two 
        <span className="text-info pl-3">{scoreData.teamTwo}</span>
      </h1>
    </div>
  )
}

export default ScoreBoard
