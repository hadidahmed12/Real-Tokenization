import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "../../utils/isEmpty";
import toast from "react-hot-toast";
import EmptyCart from "./EmtyCart";
import TopBar from "./Topbar/Topbar";
import PropertiesStep from "./Steps/PropertiesStep";
import WalletStep from "./Steps/WalletStep";
import ReviewStep from "./Steps/ReviewStep";
import CompleteStep from "./Steps/CompleteStep";
import TokensStep from "./Steps/TokensStep";
import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const steps = ["Properties", "Tokens", "Wallet", "Review", "Complete"];
  const cart = useSelector((state) => state.cart.cart);
  const activeStep = useSelector((state) => state.step.activeStep);
  const [showDetails, setShowDetails] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState(0);

  const toggleDetails = (index) => {
    if (showDetails === index) {
      setShowDetails(null);
    } else {
      setShowDetails(index);
    }
  };
  const [selectedWallet, setSelectedWallet] = useState(false);
  const [usdtValues, setUsdtValues] = useState(cart.map(() => 150));
  const minValue = 150;

  const incrementValue = (index) => {
    setUsdtValues((prev) => {
      const newValues = [...prev];
      newValues[index] += 150;
      return newValues;
    });
  };

  const decrementValue = (index) => {
    setUsdtValues((prev) => {
      const newValues = [...prev];
      if (newValues[index] > minValue) {
        newValues[index] -= 150;
      } else {
        toast.error("Min value is 150 USDT");
      }
      return newValues;
    });
  };
  return (
    <div className="container-fluid main-container">
      <div className="mt-5">
        <h2 className="main-title-09888 pt-4">Cart</h2>
        {isEmpty(cart) ? (
          <EmptyCart navigate={navigate} />
        ) : (
          <>
            <TopBar steps={steps} activeStep={activeStep} />
            <div>
              <div>
                <div className="properties-container ">
                  {activeStep === 0 && (
                    <PropertiesStep
                      cart={cart}
                      showDetails={showDetails}
                      toggleDetails={toggleDetails}
                      usdtValues={usdtValues}
                      setUsdtValues={setUsdtValues}
                    />
                  )}
                  {activeStep === 1 && (
                    <TokensStep
                      cart={cart}
                      usdtValues={usdtValues}
                      incrementValue={incrementValue}
                      decrementValue={decrementValue}
                      setTotalAmount={setTotalAmount}
                      setTokenAmount={setTokenAmount}
                      setTransactionAmount={setTransactionAmount}
                      transactionAmount={transactionAmount}
                    />
                  )}

                  {activeStep === 2 && (
                    <WalletStep
                      selectedWallet={selectedWallet}
                      setSelectedWallet={setSelectedWallet}
                      totalAmount={totalAmount}
                      transactionAmount={transactionAmount}
                    />
                  )}
                  {activeStep === 3 && (
                    <ReviewStep
                      cart={cart}
                      selectedWallet={selectedWallet}
                      totalAmount={totalAmount}
                      transactionAmount={transactionAmount}
                    />
                  )}

                  {activeStep === 4 && (
                    <CompleteStep
                      totalAmount={totalAmount}
                      tokenAmount={tokenAmount}
                      transactionAmount={transactionAmount}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
