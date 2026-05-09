import Input from "../../components/Input";
import Button from "../../components/Button";
import LoginPic from "../../assets/images/bg.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../../schemas/signUpSchema";
import { useCreatePassword } from "../../hooks/useAuth";
import { useSelector } from "react-redux";

const CreatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });
  const { otpUserEmail } = useSelector((state) => state.user);

  const { mutate, isLoading } = useCreatePassword();

  const onSubmit = (data) => {
    if (data) {
      const passwordValue = data?.password;
      mutate({ password: passwordValue, email: otpUserEmail });
    } else {
      console.error("Password  is undefined");
    }
  };

  return (
    <div className="d-flex">
      <div className="login-page">
        <div className="">
          <div className="mainlogin-001">
            <h1>Create Account</h1>
            <p className="login-sub-text pt-3">
              Sign up today to experience the convenience of our
              <br /> premium services.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4 pt-4">
              <Input
                htmlFor="password"
                label="Password"
                placeholder="Enter Password"
                type="password"
                error={errors?.password?.message}
                name={"password"}
                register={register}
              />
              <div className="mt-3 position-relative"></div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="loginline-001">Passwords should have:</p>
            </div>
            <ul>
              <li className="loginline-001">Minimum length at 8 characters</li>
              <li className="loginline-001">
                At least one uppercase character is required
              </li>
              <li className="loginline-001">
                At least one lowercase character is required
              </li>
              <li className="loginline-001">Number character(s) is required</li>
            </ul>

            <div className="mt-4">
              <Button
                text="Next"
                variant="primary"
                size="lg"
                type="submit"
                disabled={isLoading}
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

export default CreatePassword;
