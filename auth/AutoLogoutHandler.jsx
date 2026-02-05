import { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const AutoLogoutHandler = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const timerId = useRef(null);
  const countdownIntervalId = useRef(null);
  const [shouldLogout, setShouldLogout] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showCountdownModal, setShowCountdownModal] = useState(false);

  useEffect(() => {
    if (shouldLogout) {
      logout();
      navigate("/", { replace: true });
    }
  }, [shouldLogout, logout, navigate]);

  const logoutAfterTimeout = () => {
    setShouldLogout(true);
    setShowCountdownModal(false);
    setCountdown(null);
    if (countdownIntervalId.current) {
      clearInterval(countdownIntervalId.current);
    }
  };

  const startCountdown = () => {
    setShowCountdownModal(true);
    setCountdown(10); // 10 seconds countdown
    countdownIntervalId.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownIntervalId.current);
          logoutAfterTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    if (countdownIntervalId.current) {
      clearInterval(countdownIntervalId.current);
    }
    setShowCountdownModal(false);
    setCountdown(null);
    // Set inactivity timeout to 15 seconds
    // Start countdown at 5 seconds remaining
    timerId.current = setTimeout(() => {
      startCountdown();
      // After countdown, logoutAfterTimeout will be called
    }, 500000);
  };

  useEffect(() => {
    if (!user) {
      // If no user logged in, clear timer and countdown
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      if (countdownIntervalId.current) {
        clearInterval(countdownIntervalId.current);
      }
      setShowCountdownModal(false);
      setCountdown(null);
      return;
    }

    // List of events to detect user activity
    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    // Reset timer on any user activity
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start the timer initially
    resetTimer();

    return () => {
      // Cleanup event listeners and timers on unmount
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      if (countdownIntervalId.current) {
        clearInterval(countdownIntervalId.current);
      }
    };
  }, [user]);

  return (
    <>
      {showCountdownModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h2>Session Expiring Soon</h2>
            <p>You will be logged out in {countdown} second{countdown !== 1 ? "s" : ""}.</p>
            <p>Please interact with the page to continue your session.</p>
          </div>
        </div>
      )}
    </>
  );
}; 
export default AutoLogoutHandler;
