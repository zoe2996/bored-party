"use client";
import { useEffect, useRef, useState } from "react";
import { clearInterval, setInterval } from "timers";
import { IoMdTime } from "react-icons/io";

interface TimerProgressHeader {
  countdownDate: Date;
  timerSeconds: number;
  onTimerFinished: Function;
  resetTime?: boolean;
}

export function getCountdownDate(timerSeconds: number) {
  return new Date(new Date().getTime() + (timerSeconds+1) * 1000);
}

export function TimerProgress(props: TimerProgressHeader) {
  const [countdownTime, setCountdownTime] = useState<number>(0);
  // const [futureDate, setFutureDate] = useState<Date>(
  //   new Date(new Date().getTime() + props.timerSeconds * 1000)
  // );
  let countdownDate = props.countdownDate;
  const intervalRef = useRef(setInterval(() => {}, 1000));

  function resetTime() {
    countdownDate = getCountdownDate(props.timerSeconds);
    const diff = getTimeDifference();
    setCountdownTime(() => Math.floor(Math.abs(diff) / 1000));
  }

  function getTimeDifference(): number {
    let diff = countdownDate.getTime() - new Date().getTime();
    return Math.floor(diff / 1000);
  }

  useEffect(() => {
    function updateTimeDifference(): void {
      const diff = getTimeDifference();
      if (diff >= 0) {
        setCountdownTime(() => {
          return getTimeDifference();
        });
      } else {
        props.onTimerFinished();
        if (props.resetTime) {
          resetTime();
        }
      }
    }
    const randomID = Math.floor(Math.random() * 100);
    intervalRef.current = setInterval(() => {
      updateTimeDifference();
    }, 200);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [props.countdownDate]);

  function getProgressBarPercentage() {
    return (countdownTime / props.timerSeconds) * 100;
  }

  return (
    <>
      <div className="flex flex-row">
        <span className="px-4 flex flex-row align-center justify-center text-lg">
          <div className="text-2xl mr-1">
            <IoMdTime />
          </div>
          <h1 className="font-sans font-bold">{countdownTime}s</h1>
        </span>
        <div className="w-10/12 bg-gray-600 overflow-clip rounded-md">
          <div
            className="relative block top-0 left-0 bg-yellow-300 h-full"
            style={{ zIndex: 1, width: getProgressBarPercentage() + "%" }}
          >
            &nbsp;
          </div>
        </div>
      </div>
    </>
  );
}
