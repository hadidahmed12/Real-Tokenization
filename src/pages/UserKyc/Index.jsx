import { useState } from "react";
import { UploadIcondddssss } from "../../components/Icons/Icons";
import Button from "../../components/Button/index";
import { useForm } from "react-hook-form";
import { useAddKYCImages } from "../../hooks/useKyc";
import { useGetUser } from "../../hooks/useProfile";
import "./kyc.css";

const Kyc = () => {
  const [frontSide, setFrontSide] = useState();
  const [backSide, setBackSide] = useState();
  const { mutate, isLoading } = useAddKYCImages(setBackSide, setFrontSide);
  const { user } = useGetUser();

  const { handleSubmit } = useForm();
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("kycFrontImage", frontSide);
    formData.append("kycBackImage", backSide);
    mutate(formData);
  };

  return (
    <div className="container-fluid main-container mt-5">
      <h2 className="main-title-09888 pt-4">KYC </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row flex flex-column align-items-center">
          <div className="col-xl-5 col-md-6">
            <div className="mt-3 position-relative">
              <label className="form-label">Frontside of CNIC</label>
              <div className="file-uploaderr">
                <label
                  htmlFor="frontside"
                  className={`${
                    user?.isKycApproved || user?.isKycSubmitted
                      ? "upload-labelDisabled"
                      : "upload-labell"
                  }`}
                >
                  <span className="upload-text">
                    {frontSide ? (
                      <img
                        src={URL.createObjectURL(frontSide && frontSide)}
                        alt=""
                        className="fiedldImggg"
                      />
                    ) : (
                      <span className="d-flex align-items-center justify-content-center p-0">
                        {" "}
                        <UploadIcondddssss />
                        Upload
                      </span>
                    )}
                  </span>
                </label>
                <input
                  disabled={user?.isKycApproved || user?.isKycSubmitted}
                  type="file"
                  id="frontside"
                  className={"file-input"}
                  onChange={(e) => {
                    setFrontSide(e.target.files[0]);
                  }}
                  accept="image/jpeg,image/png,image/gif,image/jpg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row flex flex-column align-items-center">
          <div className="col-xl-5 col-md-6">
            <div className="mt-3 position-relative">
              <label className="form-label">Backside of CNIC</label>
              <div className="file-uploaderr">
                <label
                  htmlFor="backside"
                  className={`${
                    user?.isKycApproved || user?.isKycSubmitted
                      ? "upload-labelDisabled"
                      : "upload-labell"
                  }`}
                >
                  <span className="upload-text">
                    {backSide ? (
                      <img
                        src={URL?.createObjectURL(backSide && backSide)}
                        alt=""
                        className="fiedldImggg"
                      />
                    ) : (
                      <span className="d-flex align-items-center justify-content-center p-0">
                        {" "}
                        <UploadIcondddssss />
                        Upload
                      </span>
                    )}
                  </span>
                </label>
                <input
                  disabled={user?.isKycApproved || user?.isKycSubmitted}
                  type="file"
                  id="backside"
                  className={"file-input"}
                  onChange={(e) => {
                    setBackSide(e.target.files[0]);
                  }}
                  accept="image/jpeg,image/png,image/gif,image/jpg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="m-3 d-flex align-items-center justify-content-center">
          {user?.isKycSubmitted && !user?.isKycApproved ? (
            <span className="kycSubmitted">KYC Submitted</span>
          ) : user?.isKycApproved && user?.isKycApproved ? (
            <span className="kycApproved">KYC Approved</span>
          ) : (
            <Button
              text={"Submit"}
              className={"submitKyc px-4"}
              disabled={isLoading}
              isLoading={isLoading}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Kyc;
