import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CancelIcon,
  DatePicketIcon,
  UploadIcondddssss,
} from "../../../../components/Icons/Icons";
import "../property.css";
import { useEffect, useState, useRef } from "react";
import {
  useGetSingleProperty,
  useUpdateProperty,
} from "../../../../hooks/useProperties";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelectDropdown from "../../../../components/MultiSelect/Index";
import { ameniteisOptions } from "../../../../constant/propertyOptions";
import Button from "../../../../components/Button/index";
import { browserRoutes } from "../../../../routes/browserRoutes";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePropertySchema } from "../../../../schemas/propertySchema";

const UpdateProperty = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const {
    mutate,
    isLoading,
    isSuccess,
    data: updateData,
  } = useUpdateProperty();

  const { data } = useGetSingleProperty(id);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePropertySchema),
    mode: "onChange",
  });

  const [latestFundDate, setLatestFundDate] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.data?.data && !initialized) {
      reset({
        title: data?.data?.data?.title,
        initialInvestment: data?.data?.data?.initialInvestment
          ? Number(data?.data?.data?.initialInvestment)
          : "",
        location: data?.data?.data?.location,
        propertyValueGrowth: data?.data?.data?.propertyValueGrowth,
        price: data?.data?.data?.price,
        annualRental: data?.data?.data?.annualRental,
        description: data?.data?.data?.description,
        currentValuation: data?.data?.data?.currentValuation,
        serviceCharges: data?.data?.data?.serviceCharges,
        maintainceCost: data?.data?.data?.maintainceCost,
        transactionCost: data?.data?.data?.transactionCost,
        numberOfBed: data?.data?.data?.numberOfBed,
        size: data?.data?.data?.size,
        amenities: data.data.data.amenities || [],
        type: data?.data?.data?.type,
      });

      const latestFunded = data?.data?.data?.latestFundDate;

      setThumbnail(data?.data?.data?.thumbnail);
      setImageFiles(data?.data?.data?.images);

      setDocumentFiles(data.data.data.documents || []);
      if (latestFunded) {
        setLatestFundDate(new Date(latestFunded));
      }
      setInitialized(true);
    }
  }, [data, reset, initialized]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      setImageFiles((prev) => [...prev, ...files]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancelImage = (index, event) => {
    event.stopPropagation();
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleThumnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const handleDocumentChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      setDocumentFiles((prev) => [...prev, ...files]);
    }
  };

  const removeDocument = (docToRemove) => {
    setDocumentFiles((prev) =>
      prev.filter((doc) => doc.name !== docToRemove.name)
    );
  };

  const removeDocumentString = (docToRemove, index) => {
    setDocumentFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const type = watch("type");

  const onSubmit = (data) => {
    const formData = new FormData();

    if (data.amenities) {
      const sanitizedAmenities = Array.isArray(data.amenities)
        ? [
            ...new Set(
              data.amenities.flatMap((item) =>
                typeof item === "string"
                  ? item.split(",").map((i) => i.trim())
                  : item
              )
            ),
          ]
        : [];

      sanitizedAmenities.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });
    }

    Object.keys(data).forEach((key) => {
      if (key !== "amenities") {
        formData.append(key, data[key]);
      }
    });

    imageFiles.forEach((img) => {
      if (typeof img === "string") {
        formData.append("existingImages", img);
      } else {
        formData.append("images", img);
      }
    });

    if (typeof thumbnail !== "string") {
      formData.append("thumbnail", thumbnail);
    }
    documentFiles.forEach((file) => {
      if (!(typeof file === "string")) {
        formData.append("documents", file);
      }
    });

    latestFundDate &&
      formData.append("latestFundDate", latestFundDate?.toISOString());

    mutate({ id, data: formData });
  };

  return (
    <div className="container-fluid main-container">
      <h2 className="main-title-09888 pt-4">Edit Property</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("title")}
                htmlFor="title"
                label="Name of Property"
                placeholder="Enter Name"
                type="text"
                name="title"
                error={errors?.title?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("initialInvestment", {
                  setValueAs: (value) => parseFloat(value) || 0,
                })}
                htmlFor="initialInvestment"
                label="Initial Investment Threshold"
                placeholder="Enter"
                type="text"
                name="initialInvestment"
                error={errors?.initialInvestment?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <label htmlFor="media-type" className="form-label">
                Type
              </label>
              <select
                {...register("type")}
                name="type"
                className="form-control"
                required
              >
                <option style={{ color: "#b4a9a9" }} value="" disabled>
                  Type
                </option>
                <option value="bed">Bed</option>
                <option value="studio">Studio</option>
              </select>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("numberOfBed", {
                  setValueAs: (value) => parseFloat(value) || 0,
                })}
                htmlFor="accountTitle"
                label="Number Of Bed"
                placeholder="0"
                type="number"
                name="numberOfBed"
                disabled={type === "studio"}
                // disabled={data?.data?.data?.type === "studio"}
                error={errors?.numberOfBed?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("size")}
                htmlFor="size"
                label="Property Size in Sq.Ft"
                placeholder="300"
                type="text"
                name="size"
                error={errors?.size?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("propertyValueGrowth")}
                htmlFor="accountTitle"
                label="Property Value Growth"
                placeholder="Enter value in %"
                type="text"
                name="propertyValueGrowth"
                error={errors?.propertyValueGrowth?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("annualRental")}
                htmlFor="annualRental"
                label="Expected Annual Gross Rent (Year 1)"
                placeholder="e.g 24000 USDT"
                type="text"
                name="annualRental"
                error={errors?.annualRental?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("serviceCharges")}
                htmlFor="serviceCharges"
                label="Expected Service Charges (Year 1)"
                placeholder="e.g 2400 USDT"
                type="text"
                name="serviceCharges"
                error={errors?.serviceCharges?.message}
              />
            </div>
          </div>{" "}
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("maintainceCost")}
                htmlFor="maintainceCost"
                label="Mgmt. and Maintanance Cost (Year 1)"
                placeholder="e.g 3000 USDT"
                type="text"
                name="maintainceCost"
                error={errors?.maintainance?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("transactionCost")}
                htmlFor="transactionCost"
                label="Transaction Cost"
                placeholder="e.g 40000 USDT"
                type="text"
                name="transactionCost"
                error={errors?.transactionCost?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("location")}
                htmlFor="location"
                label="Location"
                placeholder="Enter Location"
                type="text"
                name="location"
                error={errors?.location?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <label className="form-label">Property Overview</label>
              <div>
                <textarea
                  {...register("description")}
                  htmlFor="description"
                  className="textaree-908"
                  placeholder="Enter"
                  rows="5"
                  type="text"
                  name="description"
                />
                {errors?.description && (
                  <p className="error-class-form">
                    {errors?.description?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("price")}
                htmlFor="price"
                label="Price"
                placeholder="USDT"
                type="text"
                name="price"
                error={errors?.price?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("currentValuation")}
                htmlFor="currentValuation"
                label="Current Valuation"
                placeholder="USDT"
                type="text"
                name="currentValuation"
                error={errors?.currentValuation?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <label className="form-label">Pictures</label>
              <div className="file-uploader">
                <label htmlFor="fileInput" className="upload-label">
                  <UploadIcondddssss />
                  <span className="upload-text pl-2">
                    {imageFiles.length > 0
                      ? imageFiles.map((img, i) => (
                          <div className="image-preview" key={i}>
                            <img
                              src={
                                typeof img === "string"
                                  ? img
                                  : URL.createObjectURL(img)
                              }
                              alt=""
                              className="fiedldImg"
                            />
                            <span
                              className="cancel-icon"
                              onClick={(e) => handleCancelImage(i, e)}
                            >
                              <CancelIcon />
                            </span>
                          </div>
                        ))
                      : "Upload"}
                  </span>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="file-input"
                  onChange={handleImageChange}
                  multiple
                  ref={fileInputRef}
                />
              </div>
              {errors?.images && (
                <p className="error-class-form">{errors?.images?.message}</p>
              )}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <label className="form-label">Documents</label>
              <div className="file-uploader">
                <label htmlFor="docInput" className="upload-label">
                  <UploadIcondddssss />
                  <span className="upload-text pl-2">
                    {documentFiles.length > 0
                      ? documentFiles.map((doc, index) => (
                          <div key={index} className="document-item">
                            {typeof doc === "string" ? (
                              <>
                                <span>{doc.slice(0, 5)}...</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeDocumentString(doc, index)
                                  }
                                  className="remove-doc-btn"
                                >
                                  Remove
                                </button>
                              </>
                            ) : (
                              <>
                                <span>{doc.name}</span>{" "}
                                <button
                                  type="button"
                                  onClick={() => removeDocument(doc)}
                                  className="remove-doc-btn"
                                >
                                  Remove
                                </button>
                              </>
                            )}
                          </div>
                        ))
                      : "Upload"}
                  </span>
                </label>
                <input
                  type="file"
                  id="docInput"
                  className="file-input"
                  onChange={handleDocumentChange}
                  multiple
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <label className="form-label">Thumbnail</label>
              <div className="file-uploader">
                <label htmlFor="thumbnail" className="upload-label">
                  <span className="upload-text pl-2">
                    {thumbnail ? (
                      <img
                        src={
                          typeof thumbnail === "string"
                            ? thumbnail
                            : URL?.createObjectURL(thumbnail)
                        }
                        alt=""
                        className="fiedldImg"
                      />
                    ) : (
                      <span className="d-flex align-items-center p-0">
                        {" "}
                        <UploadIcondddssss />
                        Upload
                      </span>
                    )}
                  </span>
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  className="file-input"
                  onChange={handleThumnailChange}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="position-relative mt-3">
              <label className="form-label">Latest Funding Date</label>
              <div className="date-picker-container">
                <DatePicker
                  selected={latestFundDate}
                  onChange={(date) => setLatestFundDate(date)}
                  placeholderText="MM/DD/YYYY"
                  className="date-input"
                />
                <div className="datepicker-09889">
                  <DatePicketIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 ">
            <div className="mt-3 position-relative">
              <MultiSelectDropdown
                control={control}
                name="amenities"
                options={ameniteisOptions}
                label="Amenities"
                defaultValue={data?.data?.data?.amenities || []}
                error={errors?.amenities?.message}
              />
            </div>
          </div>
          <div></div>
        </div>
        <div className="row">
          <div className="d-flex">
            {!isSuccess && !updateData?.data?.data?.isTokenCreated ? (
              <Button
                className={`mt-4 ${
                  isLoading ? "walletbtn-099434" : "walletbtn-0993"
                }`}
                text={"Update"}
                disabled={isLoading || data?.data?.data?.isTokenCreated}
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit)}
              />
            ) : isSuccess && !updateData?.data?.data?.isTokenCreated ? (
              <Button
                className={`mt-4 ${
                  isLoading ? "walletbtn-099434" : "walletbtn-0993"
                }`}
                text={"Proceed"}
                onClick={() =>
                  navigate(browserRoutes.CREATE_TOKEN, {
                    state: updateData?.data?.data,
                  })
                }
              />
            ) : (
              <Button
                className={`mt-4 ${
                  isLoading ? "walletbtn-099434" : "walletbtn-0993"
                }`}
                text={"Update"}
                disabled={true}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
