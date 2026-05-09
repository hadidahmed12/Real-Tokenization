import * as Yup from "yup";

export const bankSchema = Yup.object().shape({
  accountTitle: Yup.string().required("Account Title is required"),
  bankName: Yup.string().required("Bank Name is required"),
  branchCode: Yup.string().required("Branch Code is required"),
  swiftCode: Yup.string().required("Swift Code is required"),
  iban: Yup.string()
    .required("IBAN is required")
    .min(24, "IBAN must be at least 24 characters long"),
});
