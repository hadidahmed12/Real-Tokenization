import * as Yup from "yup";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const tokenSchema = Yup.object().shape({
  name: Yup.string().required("Name of Token is required"),
  symbol: Yup.string().required("Name of Token is required"),
  description: Yup.string().required("Description is required"),
  icon: Yup.mixed()
    .test("fileType", "Unsupported File Format", (value) =>
      value ? ALLOWED_IMAGE_TYPES.includes(value.type) : true,
    )
    .test("fileSize", "File Size is too large", (value) =>
      value ? value.size <= MAX_FILE_SIZE : true,
    )
    .required("Icon is required"),
});

// Sale Start Schema
export const saleStartSchema = (minimumRequiredSoftCap, maximumSoftCap) =>
  Yup.object().shape({
    minimumSoftCap: Yup.number()
      .transform((value, originalValue) => {
        return originalValue === "" ? null : value;
      })
      .nullable()
      .required("Minimum Soft Cap is required.")
      .min(
        minimumRequiredSoftCap,
        `Minimum Soft Cap must be at least 80% of the property price and transaction cost, which is ${
          Math.round(minimumRequiredSoftCap) + 1
        }.`,
      )
      .max(
        maximumSoftCap,
        `Minimum Soft Cap cannot exceed 100% of the property price and transaction cost, which is ${Math.round(
          maximumSoftCap,
        )}.`,
      ),
    saleDurationInDays: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value,
      )
      .required("Sale Duration In Days is required.")
      .typeError("Sale Duration In Days must be a valid number."),
  });
