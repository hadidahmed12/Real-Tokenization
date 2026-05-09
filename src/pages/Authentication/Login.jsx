import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoginPic from "../../assets/images/bg.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../../hooks/useAuth";
import { signinSchema } from "../../schemas/signinSchema";
import { setUserOtpEmail } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { browserRoutes } from "../../routes/browserRoutes";

const Login = ({ admin }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isLoading } = useLogin();

  const onSubmit = (data) => {
    mutate(data);
    dispatch(setUserOtpEmail(data?.email));
  };
  return (
    <div className="d-flex">
      <div className="login-page">
        <div className="">
          <div className="mainlogin-001">
            <h1>{admin ? "Admin Login" : "Login"}</h1>

            <p className="login-sub-text pt-3">
              Log in to manage, track and customize your assets
              <br /> & investments.
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
                register={register}
                name={"email"}
              />
              <div className="mt-3 position-relative">
                <Input
                  type="password"
                  label="Password"
                  htmlFor="first-name"
                  placeholder="Type your password"
                  error={errors?.password?.message}
                  register={register}
                  name={"password"}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              {!admin && (
                <p className="loginline-001">
                  Don’t have an account?
                  <Link to={browserRoutes.SIGN_UP}>
                    <span className="loginline-002"> Sign Up</span>
                  </Link>
                </p>
              )}
              <span
                className="loginline-002"
                onClick={() => navigate(browserRoutes.RESET_PASSWORD)}
              >
                Forgot Password?
              </span>
            </div>
            <div className="mt-4">
              <Button
                text="Login Now"
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

export default Login;
