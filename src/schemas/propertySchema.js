import * as Yup from "yup";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",
];
const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/odt",
  "application/xlsx",
  "application / vnd.openxmlformats - officedocument.spreadsheetml.sheet",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const isValidURL = (value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value);

const fileOrUrlTest = (allowedTypes) =>
  Yup.mixed().test("fileOrUrl", "Invalid file or URL", (value) => {
    if (typeof value === "string") {
      return isValidURL(value);
    } else if (value instanceof File) {
      return allowedTypes.includes(value.type) && value.size <= MAX_FILE_SIZE;
    }
    return false;
  });
export const propertySchema = Yup.object().shape({
  title: Yup.string().required("Title of Property is required"),
  serviceCharges: Yup.number().required("Service Charges is required"),
  maintainceCost: Yup.number().required("Maintainance Cost is required"),

  initialInvestment: Yup.number()
    .typeError("Initial Investment must be a number")
    .required("Initial Investment is required")
    .test(
      "is-valid-number",
      "Initial Investment must be a valid number",
      (value) => {
        return (
          value !== null && !isNaN(value) && /^[0-9]*(\.[0-9]+)?$/.test(value)
        );
      },
    )
    .positive("Initial Investment must be a positive number")
    .min(150, "At least 150 USDT Investment required")
    .max(55000, "Maximum 55000 USDT Investment required"),

  numberOfBed: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .when("type", {
      is: "bed",
      then: (schema) =>
        schema
          .required("Number of Bed is required")
          .min(1, "Number of Bed must be at least 1"),
      otherwise: (schema) => schema.notRequired(),
    }),

  price: Yup.number()
    .typeError("Price is required")
    .required("Price is required")
    .min(40000, "Min value of property is 40000 USDT")
    .max(55000, "Max value of property is 55000 USDT")
    // .min(150, "Min value of property is 150 USDT")
    // .max(300, "Max value of property is 300 USDT")

    .test("is-multiple-of-150", function (value) {
      if (value % 150 === 0) return true;

      const lowerValue = Math.floor(value / 150) * 150;
      const upperValue = Math.ceil(value / 150) * 150;

      return this.createError({
        message: `The price must be a multiple of 150. You entered ${value}. The closest valid values are ${lowerValue} (lower) and ${upperValue} (upper). Please choose one of these values.`,
      });
    }),

  transactionCost: Yup.number()
    .typeError("Transaction Cost is required")
    .required("Transaction Cost is required")
    .test("transaction-cost-logic", function (value) {
      const { price } = this.parent;
      if (!price || value === undefined) return true;

      const numberOfTokens = price / 150;
      const minTransactionCost = Math.ceil(price * 0.1); // Minimum 10% of the price

      if (value === 0) {
        return this.createError({
          message: "Transaction cost cannot be 0. Please enter a valid amount.",
        });
      }

      if (value < minTransactionCost) {
        return this.createError({
          message: `Transaction cost must be at least 10% of the property price (${minTransactionCost} USDT).`,
        });
      }

      if (value >= price) {
        return this.createError({
          message: `The total transaction cost cannot be greater than or equal to the price of the property (${price}). Please enter a valid transaction cost.`,
        });
      }

      const transactionCostPerToken = value / numberOfTokens;
      if (transactionCostPerToken !== Math.floor(transactionCostPerToken)) {
        const lowerTransactionCost =
          Math.floor(transactionCostPerToken) * numberOfTokens;
        const upperTransactionCost =
          Math.ceil(transactionCostPerToken) * numberOfTokens;

        return this.createError({
          message: `There are ${numberOfTokens} tokens according to the Property Price. The total transaction cost you entered will be divided by ${numberOfTokens} tokens. Each token’s transaction cost must be a whole number (no decimal points).
          ✅ Correct range: The total transaction cost should be between **${Math.max(
            minTransactionCost,
            lowerTransactionCost,
          )} and ${upperTransactionCost}**. Please enter a valid transaction cost.`,
        });
      }

      return true;
    }),

  size: Yup.string().required("Property Size is required"),
  propertyValueGrowth: Yup.number()
    .required("Property Value Growth is required")
    .typeError("Value must be a number")
    .min(1)
    .max(15),
  annualRental: Yup.number()
    .typeError("Annual Rental is required")
    .required("Annual Rental is required")
    .typeError("Value must be a number"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  currentValuation: Yup.number()
    .typeError("Current Valuation is required")
    .required("Current Valuation is required")
    .typeError("Value must be a number"),
  amenities: Yup.array().required("Amenities are required"),
  latestFundDate: Yup.date()
    .required("Latest Funding Date is required")
    .nullable()
    .min(new Date(), "Latest Funding Date cannot be in the past"),

  // File Validations
  images: Yup.array()
    .of(
      Yup.mixed()
        .test("fileType", "Unsupported File Format", (value) =>
          value ? ALLOWED_IMAGE_TYPES.includes(value.type) : true,
        )
        .test("fileSize", "File Size is too large", (value) =>
          value ? value.size <= MAX_FILE_SIZE : true,
        ),
    )
    .min(5, "At least 5 images are required")
    .max(10, "A maximum of 10 images are allowed")
    .required("At least 5 images are required"),

  documents: Yup.array()
    .of(
      Yup.mixed()
        .test("fileType", "Unsupported Document Format", (value) =>
          value ? ALLOWED_DOCUMENT_TYPES.includes(value.type) : true,
        )
        .test("fileSize", "File Size is too large", (value) =>
          value ? value.size <= MAX_FILE_SIZE : true,
        ),
    )
    .min(2, "At least 2 documents are required")
    .max(5, "A maximum of 5 documents are allowed")
    .required("At least 2 documents are required"),

  thumbnail: Yup.mixed()
    .required("Thumbnail is required")
    .test("fileType", "Unsupported Thumbnail Format", (value) =>
      value ? ALLOWED_IMAGE_TYPES.includes(value.type) : true,
    )
    .test("fileSize", "Thumbnail File Size is too large", (value) =>
      value ? value.size <= MAX_FILE_SIZE : true,
    ),
});

export const updatePropertySchema = Yup.object().shape({
  title: Yup.string().required("Title of Property is required"),
  serviceCharges: Yup.number().required("Service Charges is required"),
  maintainceCost: Yup.number().required("Maintainance Cost is required"),

  initialInvestment: Yup.number()
    .typeError("Initial Investment must be a number")
    .required("Initial Investment is required")
    .test(
      "is-valid-number",
      "Initial Investment must be a valid number",
      (value) => {
        return (
          value !== null && !isNaN(value) && /^[0-9]*(\.[0-9]+)?$/.test(value)
        );
      },
    )
    .positive("Initial Investment must be a positive number")
    .min(150, "At least 150 USDT Investment required")
    .max(55000, "Maximum 55000 USDT Investment required"),

  price: Yup.number()
    .typeError("Price is required")
    .required("Price is required")
    .min(40000, "Min value of property is 40000 USDT")
    .max(55000, "Max value of property is 55000 USDT")
    .test("is-multiple-of-150", function (value) {
      if (value % 150 === 0) return true;

      const lowerValue = Math.floor(value / 150) * 150;
      const upperValue = Math.ceil(value / 150) * 150;

      return this.createError({
        message: `The price must be a multiple of 150. You entered ${value}. The closest valid values are ${lowerValue} (lower) and ${upperValue} (upper). Please choose one of these values.`,
      });
    }),

  transactionCost: Yup.number()
    .typeError("Transaction Cost is required")
    .required("Transaction Cost is required")
    .test("transaction-cost-logic", function (value) {
      const { price } = this.parent;
      if (!price || value === undefined) return true;

      const numberOfTokens = price / 150;
      const minTransactionCost = Math.ceil(price * 0.1); // Minimum 10% of the price

      if (value === 0) {
        return this.createError({
          message: "Transaction cost cannot be 0. Please enter a valid amount.",
        });
      }

      if (value < minTransactionCost) {
        return this.createError({
          message: `Transaction cost must be at least 10% of the property price (${minTransactionCost} USDT).`,
        });
      }

      if (value >= price) {
        return this.createError({
          message: `The total transaction cost cannot be greater than or equal to the price of the property (${price}). Please enter a valid transaction cost.`,
        });
      }

      const transactionCostPerToken = value / numberOfTokens;
      if (transactionCostPerToken !== Math.floor(transactionCostPerToken)) {
        const lowerTransactionCost =
          Math.floor(transactionCostPerToken) * numberOfTokens;
        const upperTransactionCost =
          Math.ceil(transactionCostPerToken) * numberOfTokens;

        return this.createError({
          message: `There are ${numberOfTokens} tokens according to the Property Price. The total transaction cost you entered will be divided by ${numberOfTokens} tokens. Each token’s transaction cost must be a whole number (no decimal points).
          ✅ Correct range: The total transaction cost should be between **${Math.max(
            minTransactionCost,
            lowerTransactionCost,
          )} and ${upperTransactionCost}**. Please enter a valid transaction cost.`,
        });
      }

      return true;
    }),

  size: Yup.string().required("Property Size is required"),
  propertyValueGrowth: Yup.number()
    .required("Property Value Growth is required")
    .typeError("Value must be a number"),
  annualRental: Yup.number()
    .typeError("Annual Rental is required")
    .required("Annual Rental is required")
    .typeError("Value must be a number"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  currentValuation: Yup.number()
    .typeError("Current Valuation is required")
    .required("Current Valuation is required")
    .typeError("Value must be a number"),
  amenities: Yup.array().required("Amenities are required"),
  // latestFundDate: Yup.date()
  //   .required("Latest Funding Date is required")
  //   .nullable()
  //   .min(new Date(), "Latest Funding Date cannot be in the past"),

  // File Validations
  // images: Yup.array()
  //   .of(fileOrUrlTest(ALLOWED_IMAGE_TYPES))
  //   .test("min-images", "At least 5 images are required", (value) => {
  //     return value && value.filter((img) => img).length >= 5;
  //   })
  //   .test("max-images", "A maximum of 10 images are allowed", (value) => {
  //     return value && value.filter((img) => img).length <= 10;
  //   })
  //   .required("At least 5 images are requireddddd"),

  // thumbnail: fileOrUrlTest(ALLOWED_IMAGE_TYPES).required(
  //   "Thumbnail is required",
  // ),

  // documents: Yup.array()
  //   .of(fileOrUrlTest(ALLOWED_DOCUMENT_TYPES))
  //   .min(2, "At least 2 documents are required")
  //   .max(5, "A maximum of 5 documents are allowed")
  //   .required("At least 2 documents are required"),
});
