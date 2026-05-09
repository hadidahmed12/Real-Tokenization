import React, { useEffect, useState } from "react";
import "./timer.css";

const CountdownTimer = ({ startDate, endDate }) => {
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startDate));
  const [hasSaleStarted, setHasSaleStarted] = useState(false);

  useEffect(() => {
    const now = new Date();
    const saleStartDate = new Date(startDate);

    // Check if the sale has started
    if (now >= saleStartDate) {
      setHasSaleStarted(true);
      setTimeLeft(calculateTimeLeft(endDate)); // Show the timer for the end date
    } else {
      setHasSaleStarted(false);
      setTimeLeft(calculateTimeLeft(startDate)); // Show the countdown until the sale starts
    }

    const timer = setInterval(() => {
      if (!hasSaleStarted) {
        setTimeLeft(calculateTimeLeft(startDate)); // Update countdown if sale hasn't started yet
      } else {
        setTimeLeft(calculateTimeLeft(endDate)); // Update countdown if sale is active
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate, hasSaleStarted]);

  return (
    <div className="d-flex flex-column align-items-center">
      {/* Display Sale Starts In only when sale hasn't started */}
      {!hasSaleStarted && <p className="regulteh2">Sale Starts In</p>}

      {/* Timer */}
      <div className="d-flex">
        <div className="timer-table-001 mr-1">
          <p>{timeLeft.days || 0}</p>
          <span>days</span>
        </div>
        <div className="timer-table-001 mr-1">
          <p>{timeLeft.hours || 0}</p>
          <span>hrs</span>
        </div>
        <div className="timer-table-001 mr-1">
          <p>{timeLeft.minutes || 0}</p>
          <span>min</span>
        </div>
        <div className="timer-table-001 mr-1">
          <p>{timeLeft.seconds || 0}</p>
          <span>sec</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
