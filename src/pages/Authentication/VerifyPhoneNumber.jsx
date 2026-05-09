import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button";
import LoginPic from "../../assets/images/bg.png";
import { useResendOTP, useVerfiyPhoneNumber } from "../../hooks/useAuth";
import { useSelector } from "react-redux";

const VerifyPhoneNumber = () => {
  const { mutate, isLoading } = useVerfiyPhoneNumber();
  const { otpUserEmail, phone } = useSelector((state) => state.user);
  const [timeLeft, setTimeLeft] = useState(2 * 60);
  const { mutate: resendOTP, isLoading: resendOtpLoading } =
    useResendOTP(setTimeLeft);

  const otpRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleOtpChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }

      if (index === otpRefs.current.length - 1) {
        otpRefs.current[index].blur();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      const otpValue = otp.join("");
      mutate({ otp: otpValue, email: otpUserEmail });
    } else {
      console.error("OTP value is undefined");
    }
  };

  return (
    <div className="d-flex">
      <div className="login-page">
        <div className="">
          <div className="mainlogin-001 my-3">
            <h1>Verify Phone Number</h1>
            <p className="login-sub-text pt-3">
              Please enter the one-time-password (OTP) sent to
              <br /> you +{phone}.
            </p>
            {timeLeft !== 0 && (
              <p className="text-center">
                OTP will expire in
                <strong className="ml-1">
                  {minutes} minute{minutes !== 1 ? "s" : ""} {seconds} second
                  {seconds !== 1 ? "s" : ""}.
                </strong>
              </p>
            )}
          </div>
          <form onSubmit={onSubmit}>
            <div className="otp-container">
              {otp.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  ref={(ref) => (otpRefs.current[index] = ref)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <div className="d-flex justify-content-between">
              <p className="loginline-001">
                Haven’t received the code
                {timeLeft === 0 ? (
                  <span
                    className="loginline-002"
                    onClick={() => resendOTP({ phoneNumber: `+${phone}` })}
                  >
                    {" "}
                    {resendOtpLoading ? "Sending..." : "Resend OTP"}
                  </span>
                ) : (
                  <span className="text-muted"> (Wait for expiry)</span>
                )}
              </p>
            </div>
            <div className="mt-4">
              <Button
                text="Next"
                variant="primary"
                size="lg"
                type="submit"
                isLoading={isLoading}
                disabled={isLoading || !otp.every((item) => item.length === 1)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="login-pagesidetwo">
        <div className="">
          <img className="widthforpic" src={LoginPic} />
        </div>
      </div>
    </div>
  );
};

export default VerifyPhoneNumber;
