import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import Layout from "./layout";
import Portfolio from "./pages/Portfolio/Portfolio";
import { browserRoutes } from "./routes/browserRoutes";
import ProtectedRoutes from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import VerifyOtp from "./pages/Authentication/VerifyOtp";
import VerifyEmail from "./pages/Authentication/VerifyEmail";
import Wallet from "./pages/Wallet/Wallet";
import AddCard from "./pages/Wallet/AddCard";
import AddBank from "./pages/Wallet/AddBank";
import Rewards from "./pages/Reward/Rewards";
import CreatePassword from "./pages/Authentication/CreatePassword";
import PhoneNumber from "./pages/Authentication/PhoneNumber";
import ResetPassword from "./pages/Authentication/ResetPassword";
import CreateNewPassword from "./pages/Authentication/CreateNewPassword";
import VerifyPhoneNumber from "./pages/Authentication/VerifyPhoneNumber";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Profile from "./pages/Profile/Profile";
import AccountInformation from "./pages/Profile/AccountInformation";
import ProfilePreference from "./pages/Profile/ProfilePreference";
import Properties from "./pages/Admin/Properties";
import Tokens from "./pages/Admin/Tokens";
import KYC from "./pages/Admin/KYC";
import UsersListing from "./pages/Admin/Users";
import Payments from "./pages/Admin/Payments";
import CreateProperties from "./pages/Admin/Properties/CreateProperty/CreateProperties";
import CreateToken from "./pages/Admin/Tokens/CreateToken";
import UpdateProperty from "./pages/Admin/Properties/UpdateProperty/UpdateProperty";
import PropertyDetails from "./pages/Admin/Properties/PropertyDetails";
import Cart from "./pages/Cart/Cart";
import PropertyDetailsPhotos from "./pages/Admin/Properties/PropertyDetails/ImageSection/PropertyPhotos";
import SecurityAndPrivacy from "./pages/Profile/SecurityPrivacy";
import ReferFriend from "./pages/Profile/ReferFriend";
import Kyc from "./pages/UserKyc/Index";
import ScrollToTop from "./components/ScrollTop/ScrollTop";

const queryClient = new QueryClient();
const PB_KEY = import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(PB_KEY);

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path={browserRoutes.LOGIN} element={<Login />} />
                <Route
                  path={browserRoutes.ADMIN_LOGIN}
                  element={<Login admin={true} />}
                />

                <Route path={browserRoutes.SIGN_UP} element={<Signup />} />
                <Route
                  path={browserRoutes.VERIFY_OTP}
                  element={<VerifyOtp />}
                />
                <Route
                  path={browserRoutes.VERIFY_EMAIL}
                  element={<VerifyEmail />}
                />
                <Route
                  path={browserRoutes.CREATE_PASSWORD}
                  element={<CreatePassword />}
                />
                <Route
                  path={browserRoutes.CREATE_NEW_PASSWORD}
                  element={<CreateNewPassword />}
                />
                <Route
                  path={browserRoutes.ADD_CONTACT}
                  element={<PhoneNumber />}
                />
                <Route
                  path={browserRoutes.VERIFY_PHONE_NUMBER}
                  element={<VerifyPhoneNumber />}
                />
                <Route
                  path={browserRoutes.RESET_PASSWORD}
                  element={<ResetPassword />}
                />

                <Route element={<Layout />}>
                  <Route
                    path={browserRoutes.DASHBOARD}
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <Dashboard />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.ADD_CARD}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <Elements stripe={stripePromise}>
                          <AddCard />
                        </Elements>
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.ADD_BANK}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <AddBank />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.CART}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <Cart />
                      </ProtectedRoutes>
                    }
                  />

                  <Route
                    path={browserRoutes.PORTFOLIO}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <Portfolio />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.WALLET}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <Wallet />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.PROFILE}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <Profile />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.ACCOUNT_INFORMATION}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <AccountInformation />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.ACCOUNT_PREFERENCE}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <ProfilePreference />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.SECURITY_PRIVACY}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <SecurityAndPrivacy />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.RAFER_A_FRIEND}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <ReferFriend />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.REWARDS}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <Rewards />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.USER_KYC}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.LOGIN}
                        allowedRoles={["user"]}
                      >
                        <Kyc />
                      </ProtectedRoutes>
                    }
                  />
                  {/* // Admin routes */}
                  <Route
                    path={browserRoutes.PROPERTIES}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        {/* <Properties isDraft={false} /> */}
                        <Properties />
                      </ProtectedRoutes>
                    }
                  />
                  {/* <Route
                    path={browserRoutes.DRAFT_PROPERTIES}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        <Properties isDraft={true} />
                      </ProtectedRoutes>
                    }
                  /> */}
                  <Route
                    path={browserRoutes.TOKEN}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        <Tokens />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.TOKEN}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        <Tokens />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.KYC}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        <KYC />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.USERS}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        <UsersListing />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.PAYMENTS}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        <Payments />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.CREATE_PROPERTIES}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        <CreateProperties />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.UPDATE_PROPERTIES + "/:id"}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        <UpdateProperty />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.CREATE_TOKEN}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin"]}
                      >
                        <CreateToken />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.PROPERTIES_DETAILS + "/:id"}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin", "user"]}
                      >
                        <PropertyDetails />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path={browserRoutes.PROPERTIES_DETAILS + "/:id" + "/photos"}
                    exact
                    element={
                      <ProtectedRoutes
                        redirectLink={browserRoutes.ADMIN_LOGIN}
                        allowedRoles={["admin", "user"]}
                      >
                        <PropertyDetailsPhotos />
                      </ProtectedRoutes>
                    }
                  />
                </Route>
              </Routes>
            </Router>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
