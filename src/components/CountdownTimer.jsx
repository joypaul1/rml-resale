import React, { useEffect, useState } from "react";

const CountdownTimer = ({ countdownStyles, startTime, endTime }) => {
  const [countDownDate, setCountDownDate] = useState(0);

  useEffect(() => {
    // Set the date we're counting down to based on startTime and endTime props
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    // Check if the current date is within the specified range
    const now = new Date().getTime();
    if (now >= start && now <= end) {
      setCountDownDate(end);
    } else {
      // Handle cases where the current date is outside the range
      setCountDownDate(0);
    }
  }, [startTime, endTime]);

  // Initialize state variables for days, hours, minutes, and seconds
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (countDownDate) {
      // Update the count down every 1 second
      const interval = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes, and seconds
        const newDays = Math.floor(distance / (1000 * 60 * 60 * 24));
        const newHours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update state variables
        setDays(newDays);
        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);

        // If the count down is over, clear the interval
        if (distance < 0) {
          clearInterval(interval);
        }
      }, 1000);

      // Cleanup the interval on component unmount or when countDownDate changes
      return () => clearInterval(interval);
    }
  }, [countDownDate]);

  if (!countDownDate) {
    // Display a message or null when outside the range
    return null;
  }

  return (
    <>
      <li>
        <strong style={countdownStyles} className="days">
          {days} d
        </strong>
      </li>
      <li>
        <strong style={countdownStyles} className="hours">
          {hours} h
        </strong>
      </li>
      <li>
        <strong style={countdownStyles} className="minutes">
          {minutes} m
        </strong>
      </li>
      <li>
        <strong style={countdownStyles} className="seconds">
          {seconds} s
        </strong>
      </li>
    </>
  );
};

export default CountdownTimer;
