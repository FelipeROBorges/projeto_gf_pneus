import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(1200);
  const { signout } = useContext(AuthContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    window.addEventListener("keydown", handleEventListener);
    window.addEventListener("click", handleEventListener);
    window.addEventListener("mousemove", handleEventListener);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("mousemove", handleEventListener);
      window.removeEventListener("keydown", handleEventListener);
      window.removeEventListener("click", handleEventListener);
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      return signout();
    }
  }, [timeLeft, signout]);

  function handleEventListener() {
    setTimeLeft(1200);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </>
  );
}

export default Countdown;
