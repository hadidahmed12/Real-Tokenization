import { Modal } from "react-bootstrap";
import { useState } from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import Button from "../Button";
import toast from "react-hot-toast";
import { walletNames } from "../../utils/wallets";
import { getWalletIcons } from "../../constant/walletIcons";
import { useWithdrawCrypto } from "../../hooks/useWallet";

const DirectWithrawCrptoModal = ({ show, handleClose, withdrawDetails }) => {
  const { register, handleSubmit, watch, setValue } = useForm({});
  const { mutate, isLoading } = useWithdrawCrypto(handleClose);
  const [amountError, setAmountError] = useState("");
  const [check, setCheck] = useState(false);

  const amount = watch("amount");
  const to = watch("to");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) && Number(value) >= 0) {
      setValue("amount", value, { shouldValidate: true });

      if (parseFloat(value) > withdrawDetails.amount) {
        setAmountError("You don't have enough balance in your wallet.");
      } else {
        setAmountError("");
      }
    } else {
      e.target.value = "";
      setValue("amount", "", { shouldValidate: true });
      setAmountError("");
    }
  };

  const isFormValid = withdrawDetails.network && amount && to && amount > 0;

  const onSubmit = (data) => {
    if (data.amount < 10) {
      toast.error("Amount can't be less than 10 USDT");
      return;
    }

    mutate({
      amount: Number(data.amount),
      to: data.to,
    });
  };

  return (
    <div>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Modal.Title className="modal-title">Withdraw</Modal.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3 position-relative">
              <div className="icon-input-crypto">
                {getWalletIcons("ethUSDTWallet")}
              </div>
              <Input
                className="nfdsnfdkfff"
                htmlFor="network"
                disabled
                value={walletNames("ethUSDTWallet")}
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
            </div>
            <div>
              <Input
                className="nfdsnfdkf"
                htmlFor="amount"
                label=""
                placeholder="Enter Amount"
                {...register("amount")}
                onChange={handleInputChange}
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
              {amountError && (
                <span className="error-class-form">{amountError}</span>
              )}{" "}
            </div>
            <div>
              <Input
                className="nfdsnfdkf"
                htmlFor="walletAddress"
                label=""
                placeholder="Enter Withdrawal Wallet Address"
                type="text"
                {...register("to")}
              />
            </div>
            {amount && to && (
              <div className="my-2">
                <h4 className="redgultedettxt mt-2">
                  By ticking this checkbox, I hereby confirm that the
                  cryptocurrency wallet address I have provided is accurate and
                  correct. I acknowledge that cryptocurrency transactions are
                  irreversible, and any funds sent to an incorrect address
                  cannot be recovered. I take full responsibility for ensuring
                  the accuracy of the wallet address before proceeding with the
                  transaction. I also understand that the transaction fees, as
                  required by the chain, will be deducted from the total amount
                  to be transferred.
                  <br />
                  <input
                    className="checkboxSize"
                    type="checkbox"
                    checked={check}
                    onClick={() => {
                      setCheck(!check);
                    }}
                  />
                  <span className="mt-2 pt-3 redgultedettxt">
                    I confirm that the provided wallet address is correct and
                    understand the risks of providing an incorrect address.
                  </span>
                </h4>
              </div>
            )}
            <div className="d-flex justify-content-center align-items-center mt-3">
              <Button
                text={"Witdraw"}
                size="sm"
                isLoading={isLoading}
                type="submit"
                disabled={!!amountError || !isFormValid || !check || isLoading}
                className={`logindBtnwithAnim ${
                  (!!amountError || !isFormValid || isLoading || !check) &&
                  "disableBtn"
                } `}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DirectWithrawCrptoModal;
