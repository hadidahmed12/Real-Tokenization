import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/Button";
import { NumberSchema } from "../../schemas/signUpSchema";
import { useAddPhone } from "../../hooks/useAuth";
import { setPhoneNumber } from "../../store/slices/authSlice";
import LoginPic from "../../assets/images/bg.png";
import "react-phone-input-2/lib/style.css";

const PhoneNumber = () => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(NumberSchema),
  });
  const dispatch = useDispatch();
  const { otpUserEmail } = useSelector((state) => state.user);
  const [phone, setPhone] = useState("");

  const { mutate, isLoading } = useAddPhone();

  const onSubmit = (data) => {
    if (data) {
      const phoneNumber = data.number;
      dispatch(setPhoneNumber(phoneNumber));
      mutate({ phoneNumber: `+${phoneNumber}`, email: otpUserEmail });
    } else {
      console.error("Phone number is undefined");
    }
  };

  const handlePhoneChange = (phone) => {
    setPhone(phone);
    setValue("number", phone);
  };

  return (
    <div className="d-flex">
      <div className="login-page">
        <div className="">
          <div className="mainlogin-001">
            <h1>Enter Phone Number</h1>
            <p className="login-sub-text pt-3">
              Please enter your phone number to continue.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4 pt-4">
              <PhoneInput
                country={"pk"}
                value={phone}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: "100%",
                  height: "45px",
                  borderRadius: "25px",
                  border: "1px solid #EAEAEA",
                  paddingLeft: "50px",
                  backgroundColor: "#F5F5F5",
                }}
                buttonStyle={{
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  backgroundColor: "#F5F5F5",
                }}
                containerStyle={{
                  width: "100%",
                }}
                dropdownStyle={{
                  borderRadius: "10px",
                }}
              />

              {errors.number && (
                <p style={{ color: "red" }}>{errors.number.message}</p>
              )}
              <div className="mt-3 position-relative"></div>
            </div>

            <div className="mt-4">
              <Button
                text="Next"
                variant="primary"
                size="lg"
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="login-pagesidetwo">
        <div className="">
          <img className="widthforpic" src={LoginPic} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default PhoneNumber;
