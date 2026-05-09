import { Modal } from "react-bootstrap";
import Input from "../Input/index";
import { useForm } from "react-hook-form";
import Button from "../Button/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { saleStartSchema } from "../../schemas/tokenSchema";
import { useStartSale } from "../../hooks/useToken";

const StartSaleModal = ({ show, handleClose, details }) => {
  const minimumRequiredSoftCap =
    0.8 *
    (Number(details?.property?.price) +
      Number(details?.property?.transactionCost));
  const maximumSoftCap =
    Number(details?.property?.price) +
    Number(details?.property?.transactionCost);

  const schemaa = saleStartSchema(minimumRequiredSoftCap, maximumSoftCap);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaa),
    mode: "onChange",
  });

  const { mutate, isLoading } = useStartSale(handleClose);
  const value1 = watch("minimumSoftCap");
  const value2 = watch("saleDurationInDays");

  const isFormValid = value1 && value2;
  const reservedTokens = Math.round(Number(details?.property?.price) / 150);

  const onSubmit = (data) => {
    mutate({
      propertyId: details?.property?._id,
      reservedTokensForSale: reservedTokens,
      saleDurationInDays: data?.saleDurationInDays,
      tokenId: details?.tokenAddress,
      minimumSoftCap: data?.minimumSoftCap,
    });
  };

  return (
    <div>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Modal.Title className="modal-title">Start Sale</Modal.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                className="nfdsnfdkf"
                htmlFor="tokenAddress"
                label="Token Address"
                disabled
                value={details?.tokenAddress}
                {...register("tokenAddress")}
              />
            </div>
            <div>
              <Input
                className="nfdsnfdkf"
                htmlFor="minimumSoftCap"
                label="Minimum Soft Cap (Min 80% of property price)"
                placeholder="Enter amount"
                type="text"
                {...register("minimumSoftCap")}
                error={errors?.minimumSoftCap?.message}
              />
            </div>
            <div>
              <Input
                className="nfdsnfdkf"
                htmlFor="saleDurationInDays"
                label="Sale Duration in Days"
                placeholder="Input days"
                type="text"
                {...register("saleDurationInDays")}
                error={errors?.saleDurationInDays?.message}
              />
            </div>
            <div>
              <Input
                className="nfdsnfdkf"
                htmlFor="reservedTokensForSale"
                label="Reserved Tokens for Sale"
                value={reservedTokens}
                disabled
                placeholder="Enter Reserved Tokens For Sale"
                type="text"
                {...register("reservedTokensForSale")}
              />
            </div>

            <div className="d-flex justify-content-center align-items-center mt-3">
              <Button
                text={"Start"}
                size="sm"
                type="submit"
                isLoading={isLoading}
                disabled={
                  !isFormValid || isLoading || Object.keys(errors).length > 0
                }
                className={`logindBtnwithAnim
                  ${
                    (!isFormValid || isLoading || Object.keys(errors).length) &&
                    "disableBtn"
                  }
                 `}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StartSaleModal;
