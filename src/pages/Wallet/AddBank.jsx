import Input from "../../components/Input";
import { GreaterIcons } from "../../components/Icons/Icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddBank } from "../../hooks/useWallet.js";
import Button from "../../components/Button/index.jsx";
import { bankSchema } from "../../schemas/bankSchema.js";
import "./wallet.css";

const AddBank = () => {
  const { mutate, isLoading } = useAddBank();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bankSchema),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="container-fluid main-container">
      <div className="mt-5">
        <h2 className="main-title-09888 pt-4">
          Wallet
          <span>
            <GreaterIcons />
          </span>
          <span className="walletsubheading-09">Add Bank</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xl-4">
            <div className="mt-3 position-relative">
              <Input
                htmlFor="accountTitle"
                label="Account Title"
                placeholder="Eg. John Doe"
                type="text"
                register={register}
                error={errors?.accountTitle?.message}
                name="accountTitle"
              />
            </div>
            <div className="mt-3 position-relative">
              <Input
                htmlFor="bankName"
                label="Bank Name"
                placeholder="Eg. HBL "
                type="text"
                register={register}
                error={errors?.bankName?.message}
                name="bankName"
              />
            </div>
            <div className="mt-3 position-relative">
              <Input
                htmlFor="branchCode"
                label="Branch Code"
                placeholder="0292 "
                type="text"
                register={register}
                error={errors?.branchCode?.message}
                name="branchCode"
              />
            </div>
            <div className="mt-3 position-relative">
              <Input
                htmlFor="swiftCode"
                label="Swift Code"
                placeholder="12345 "
                type="text"
                register={register}
                error={errors?.swiftCode?.message}
                name="swiftCode"
              />
            </div>
            <div className="mt-3 position-relative">
              <Input
                htmlFor="iban"
                label="IBAN"
                placeholder="1234 1234 1234 1234 3243 2142"
                type="text"
                register={register}
                error={errors?.iban?.message}
                name="iban"
              />
            </div>
            <Button
              className={`mt-4 ${
                isLoading ? "walletbtn-099434" : "walletbtn-0993"
              }`}
              text={"Add Bank"}
              type={"submit"}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBank;
