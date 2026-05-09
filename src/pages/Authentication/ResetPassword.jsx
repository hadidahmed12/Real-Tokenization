import Input from "../../components/Input";
import Button from "../../components/Button";
import LoginPic from "../../assets/images/bg.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPassword } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { emailSchema } from "../../schemas/signinSchema";
import { setUserOtpEmail } from "../../store/slices/authSlice";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });
  const dispatch = useDispatch();
  const { mutate, isLoading } = useResetPassword();

  const onSubmit = (data) => {
    dispatch(setUserOtpEmail(data?.email));
    mutate(data);
  };

  return (
    <div className="d-flex">
      <div className="login-page">
        <div className="">
          <div className="mainlogin-001">
            <h1>Reset Password</h1>
            <p className="login-sub-text pt-3">
              Enter the email of your account.{" "}
              <span style={{ visibility: "hidden" }}>Enter the email em.</span>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4 pt-4">
              <Input
                htmlFor="email"
                label="Email"
                placeholder="Enter email"
                type="text"
                error={errors?.email?.message}
                name={"email"}
                register={register}
              />
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
          <img className="widthforpic" src={LoginPic} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
