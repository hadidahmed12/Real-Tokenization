import ContactIm2 from "../../../../../assets/images/contatcus.png";

const ChatSection = () => {
  return (
    <>
      <h2 className="regulteh2 pt-5">
        Have More Questions About This Property?
      </h2>
      <div className="d-flex mt-3">
        <img src={ContactIm2} />
        <div>
          <p style={{ fontSize: "14px" }} className="regulteh2 ml-3">
            Contact Out Real Estate Experts
          </p>
          <button className="ewf354g45yt7654 ml-3 mt-2">Message Us</button>
        </div>
      </div>
    </>
  );
};

export default ChatSection;
