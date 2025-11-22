import React, { useState, useEffect, useRef } from "react";
import { adminNav } from "../../../constants/sidebarData";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../../context/SidebarContext";
import Logo from "../../../assets/logo.png";
import funnel from "../../../assets/dashboard/funnel.png";
// Importing the required icons and images
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
// Ensure these images are correctly imported, assuming they are within your assets structure
import sucess_tick from "../../../assets/dashboard/sucess_tick.png"; // Used for the success modal
// Placeholder for device icons
import {
  MdTablet,
  MdPhoneIphone,
  MdDesktopWindows,
  MdTv,
} from "react-icons/md";
import axios from "axios";
import { VITE_SERVER } from "../../../constants/config";
import { useUser } from "../../../context/UserContext";

// --- Configuration Data ---
const plans = {
  Basic: {
    price: 9,
    features: [
      { text: "Watch on 1 screen at a time", icon: FaCheckCircle },
      { text: "Good video quality", icon: FaCheckCircle },
      { text: "Download on 1 device", icon: FaCheckCircle },
      { text: "Affordable monthly price", icon: FaCheckCircle },
    ],
    details: { videoQuality: "Good", supportedResolution: "720p" },
  },
  Standard: {
    price: 12,
    features: [
      { text: "Watch on 2 screens simultaneously", icon: FaCheckCircle },
      { text: "Full HD available", icon: FaCheckCircle },
      { text: "Download on 3 devices", icon: FaCheckCircle },
      { text: "Great for couples or roommates", icon: FaCheckCircle },
    ],
    details: { videoQuality: "Better", supportedResolution: "1080p" },
  },
  Premium: {
    price: 15,
    features: [
      { text: "Watch on 4 screens at once", icon: FaCheckCircle },
      { text: "UltraHD + HDR", icon: FaCheckCircle },
      { text: "Download on 5 devices", icon: FaCheckCircle },
      { text: "Best for families and binge-watchers", icon: FaCheckCircle },
    ],
    details: { videoQuality: "Best", supportedResolution: "4K" },
  },
};

// --- Modal Components ---

// 1. Plan Selection Modal
const SubscriptionModal = ({
  onClose,
  onSelectPlan,
  plan,
  activePlan,
  isTrial,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(
    plan == "Trial" ? "Basic" : plan
  );
  const planData = plans[selectedPlan];

  const handleTrialSubscription = async () => {
    try {
      const { data } = await axios.post(
        `${VITE_SERVER}/payments/trial`,
        {},
        { withCredentials: true }
      );
      alert(data.message || "Trial started!");
      onClose(); // close modal
      window.location.reload(); // refresh to reflect new subscription
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to start trial. Try again.";
      alert(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-[#0F294E] px-6 py-3 rounded-xl w-full max-w-lg shadow-2xl text-white">
        <div className="flex justify-end">
          <AiOutlineClose
            className="cursor-pointer text-[#AECFFF] hover:text-white"
            onClick={onClose}
          />
        </div>
        <h3 className="text-lg text-center mt-2">
          Choose the plan that best <br /> works for you
        </h3>
        <p className="text-sm text-center text-[#AECFFF] mb-6">
          Let's help you personalize your experience
        </p>

        {/* Plan Tabs */}
        <div className="flex justify-center bg-[#21477C] p-1 rounded-full w-fit mx-auto mb-6">
          {Object.keys(plans).map((planName) => {
            const isActive = activePlan === planName.toLowerCase();
            return (
              <button
                key={planName}
                className={`px-6 py-2 rounded-full text-sm transition-all flex items-center gap-1 ${
                  selectedPlan === planName
                    ? "bg-[#18B451] text-white"
                    : "text-[#AECFFF] hover:bg-[#21477C]"
                }`}
                onClick={() => setSelectedPlan(planName)}
                disabled={isActive} // disable if already active
              >
                {planName}{" "}
                {isActive && (
                  <span
                    className={`${
                      planName == selectedPlan ? "text-white" : "text-[#18B451]"
                    } text-xs ml-1`}
                  >
                    (Activated)
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-[#21477C] p-2 mb-6 rounded-md">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xl">{selectedPlan}</h4>
            <p className="text-4xl">
              ${planData?.price}
              <span className="text-base font-normal text-[#AECFFF]">
                /Month
              </span>
            </p>
          </div>
          {planData?.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 bg-[#37619E] mb-2 p-3 rounded-lg"
            >
              <feature.icon className="text-[#18B451] text-lg" />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        <p
          className="text-center text-sm text-[#AECFFF] mb-3 cursor-pointer"
          onClick={!isTrial ? handleTrialSubscription : undefined}
          disabled={isTrial}
        >
          {!activePlan &&
            (isTrial ? "Your trial is active" : "Try 3 days free trial")}
        </p>
        <button
          className={`w-full py-3 rounded-full text-lg text-white transition-all ${
            activePlan === selectedPlan.toLowerCase()
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#18B451] to-[#4DBB9C] hover:from-[#4DBB9C] hover:to-[#18B451]"
          }`}
          onClick={() => onSelectPlan(selectedPlan)}
          disabled={activePlan === selectedPlan.toLowerCase()}
        >
          {activePlan === selectedPlan.toLowerCase()
            ? "Already Active"
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

// 2. Confirm Payment Modal
const ConfirmPaymentModal = ({ onClose, onConfirm, planName, planPrice }) => {
  const planDetails = plans[planName].details;
  const serviceFee = 2;
  const total = planPrice + serviceFee;

  // Placeholder date formatting (assuming current year is 2025 based on the original request time)
  const subscriptionDate = "December 25, 2025";
  const expiryDate = "December 25, 2026";
  const checkInDate = "December 25, 2025";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-[#0F294E] px-8 py-3 rounded-xl w-full max-w-lg shadow-2xl text-white h-[95vh] overflow-y-auto">
        <div className="flex justify-end">
          <AiOutlineClose
            className="cursor-pointer text-[#AECFFF] hover:text-white"
            onClick={onClose}
          />
        </div>
        <h3 className="text-[30px] text-center mt-2 mb-2">Confirm Payment</h3>

        <p className="text-4xl text-center mb-2">
          ${planPrice}
          <span className="text-base font-normal text-[#AECFFF]">/Month</span>
        </p>

        {/* Plan Info */}
        <div className="space-y-3 mb-2 p-4 bg-[#193866CC] rounded-lg">
          <div className="flex pb-2 border-b border-b-[#21477C] justify-between items-center text-sm text-[#AECFFF]">
            <p>Video quality</p>
            <p className="text-white font-semibold">
              {planDetails.videoQuality}
            </p>
          </div>
          <div className="flex pb-2 border-b border-b-[#21477C] justify-between items-center text-sm text-[#AECFFF]">
            <p>Supported resolution</p>
            <p className="text-white font-semibold">
              {planDetails.supportedResolution}
            </p>
          </div>
          <div className="flex justify-between items-center text-sm pb-2 border-b border-b-[#21477C] text-[#AECFFF]">
            <p>Device accessible</p>
            <div className="flex justify-center space-x-4 mt-2 text-xl text-white">
              <MdTablet />
              <MdPhoneIphone />
              <MdDesktopWindows />
              <MdTv />
            </div>
          </div>
          <button
            className="w-full bg-[#21477C] text-[#fff] py-2 rounded-full text-sm mt-2 hover:text-white transition-colors"
            onClick={onClose}
          >
            Change plan
          </button>
        </div>

        {/* Subscription Details */}
        <div className="mb-2 p-4 bg-[#193866CC] rounded-lg">
          <h4 className="text-lg pb-1 mb-2 border-b border-b-[#21477C]">
            Subscription Details
          </h4>
          <div className="space-y-2 text-sm text-[#AECFFF]">
            <div className="flex justify-between border-b border-b-[#21477C] pb-1">
              <p>Subscription Date</p>
              <p className="text-white">{subscriptionDate}</p>
            </div>
            <div className="flex justify-between border-b border-b-[#21477C] pb-1">
              <p>Expiry date</p>
              <p className="text-white">{expiryDate}</p>
            </div>
            <div className="flex justify-between border-b border-b-[#21477C] pb-1">
              <p>Check-in</p>
              <p className="text-white">{checkInDate}</p>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-2 p-4 bg-[#193866CC] rounded-lg">
          <h4 className="text-lg border-b border-b-[#21477C] pb-1 mb-1">
            Payment Details
          </h4>
          <div className="space-y-2 text-sm text-[#AECFFF]">
            <div className="flex justify-between border-b border-b-[#21477C] pb-1 ">
              <p>{planName} plan</p>
              <p className="text-white">${planPrice}</p>
            </div>
            <div className="flex justify-between border-b border-b-[#21477C] pb-1 ">
              <p>Service fee</p>
              <p className="text-white">${serviceFee}</p>
            </div>
            <div className="flex justify-between text-base">
              <p>Total</p>
              <p className="text-white">${total}</p>
            </div>
          </div>
        </div>

        <button
          className="w-full py-3 rounded-full text-lg text-white bg-gradient-to-r from-[#18B451] to-[#4DBB9C] hover:from-[#4DBB9C] hover:to-[#18B451] transition-all"
          onClick={onConfirm}
        >
          Make payment
        </button>
      </div>
    </div>
  );
};

// 3. Payment Successful Modal
const SuccessModal = ({ onExplore }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
    <div className="bg-[#0F294E] p-8 rounded-xl w-full max-w-sm shadow-2xl text-white text-center">
      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#21477C] mb-6">
        {/* Using the image provided in the prompt for the tick */}
        <img src={sucess_tick} alt="Success Tick" className="w-10 h-10" />
      </div>

      <h3 className=" mb-2">Payment successful</h3>
      <p className="text-sm text-[#AECFFF] mb-8">Your payment has been made</p>

      <button
        className="w-full py-3 rounded-full text-lg text-white bg-gradient-to-r from-[#18B451] to-[#4DBB9C] hover:from-[#4DBB9C] hover:to-[#18B451] transition-all"
        onClick={onExplore}
      >
        Explore movies
      </button>
    </div>
  </div>
);

// --- Main Sidebar Component with Modal Logic ---

const Sidebar = () => {
  const location = useLocation().pathname.split("/")[2];
  const { isNavOpen, toggleNav } = useSidebar();
  const sidebarRef = useRef(null);

  const { subscription, user, fetchUserProfile } = useUser();

  // State for the modal flow
  const [modalStep, setModalStep] = useState(0); // 0: closed, 1: plan selection, 2: confirm payment, 3: success
  const [currentPlan, setCurrentPlan] = useState({}); // Stores the selected plan name and price

  const closeModal = () => {
    setModalStep(0);
    setCurrentPlan({});
  };

  const handleSelectPlan = (planName) => {
    setCurrentPlan({ name: planName, price: plans[planName].price });
    setModalStep(2); // Move to Confirmation
  };

  const handlePaymentConfirm = async () => {
    try {
      const { data } = await axios.post(
        `${VITE_SERVER}/payments/subscribe`,
        { plan: currentPlan.name.toLowerCase() },
        { withCredentials: true }
      );

      if (data?.url) {
        window.location.href = data.url; // 🚀 redirect to Stripe checkout
      } else {
        alert("Stripe session not created");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to start payment");
    }
  };

  const handleExplore = () => {
    // Logic to redirect or close the modal and update user status
    closeModal();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("session_id")) {
      setModalStep(3); // Open success modal

      // optionally clean up the URL so ?success=true disappears
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (params.get("cancel")) {
      setModalStep(1); // send them back to plan selection
    }
  }, []);

  // useEffect for handling click outside (your existing logic)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isNavOpen
      ) {
        toggleNav();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavOpen, toggleNav]);

  // Function to render the active modal
  const renderModal = () => {
    switch (modalStep) {
      case 1:
        return (
          <SubscriptionModal
            onClose={closeModal}
            onSelectPlan={handleSelectPlan}
            plan={
              subscription?.plan.charAt(0).toUpperCase() +
                subscription?.plan.slice(1) || "Basic"
            }
            activePlan={subscription?.plan?.toLowerCase() || ""}
            isTrial={user?.hasUsedTrial}
          />
        );
      case 2:
        return (
          <ConfirmPaymentModal
            onClose={closeModal}
            onConfirm={handlePaymentConfirm}
            planName={currentPlan.name}
            planPrice={currentPlan.price}
          />
        );
      case 3:
        return <SuccessModal onExplore={handleExplore} />;
      default:
        return null;
    }
  };

  // Helper component to render the upgrade button (used in both desktop and mobile)
  const UpgradeSection = () => (
    <div className="flex justify-center items-center">
      <div className="bg-[#112F5A] p-2 rounded-md w-[85%] flex justify-center items-center flex-col">
        <img src={funnel} alt="" />
        <p className="text-xs text-white text-center">
          Enjoy watching tv series and movies without restrictions
        </p>
        <button
          className="w-[100%] py-1 rounded-full text-sm text-white mt-2 bg-gradient-to-r from-[#18B451] to-[#4DBB9C] hover:from-[#4DBB9C] hover:to-[#18B451] transition-all"
          onClick={() => setModalStep(1)} // Open Subscription Modal
        >
          Upgrade
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`lg:block w-[15rem] h-[100vh] bg-[#0F294E] relative border-r border-r-[#21477C] hidden flex-col`}
      >
        <div className="px-5 py-2 -ml-3 border-b border-b-[#21477C] flex-shrink-0">
          <img src={Logo} alt="" className="" />
        </div>
        <div className="mt-4 flex-1 overflow-y-auto">
          {adminNav?.map((i) => (
            <Link
              to={`/dashboard/${i.link}`}
              key={i.id}
              className={`flex items-center gap-x-3 mb-2 cursor-pointer transition-all duration-200 
                            ${
                              location === i.link
                                ? "bg-[#21477C] shadow-[0_4px_15px_rgba(0,0,0,0.2)] rounded-lg py-2 px-5 p-2 mx-2"
                                : "py-2 px-5 hover:bg-[#15345b] hover:shadow-lg"
                            }`}
            >
              <div className="text-white">{i.icon}</div>
              <p
                className={`text-sm ${
                  location === i.link ? "text-[#fff]" : "text-[#8F8F8F]"
                }`}
              >
                {i.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="py-4 flex-shrink-0">
          <UpgradeSection />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isNavOpen && (
        <div
          className={`lg:hidden block w-[14rem] z-50 h-[100vh] bg-[#0F294E] border-r border-r-[#21477C] fixed top-0 left-0 transition-all duration-300 ease-in-out ${
            isNavOpen
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          } flex flex-col`}
          ref={sidebarRef}
        >
          <div className="px-5 py-1 -ml-3 border-b border-b-[#21477C] flex-shrink-0">
            <img src={Logo} alt="" className="" />
          </div>
          <div className="mt-4 flex-1 overflow-y-auto">
            {adminNav?.map((i) => (
              <Link
                to={`/dashboard/${i.link}`}
                key={i.id}
                className={`flex items-center gap-x-3 mb-2 cursor-pointer transition-all duration-200
                                    ${
                                      location === i.link
                                        ? "bg-[#21477C] shadow-[0_4px_15px_rgba(0,0,0,0.2)] rounded-lg py-2 px-5 p-2 mx-2"
                                        : "py-2 px-5 hover:bg-[#15345b] hover:shadow-lg"
                                    }`}
              >
                <div className="text-white">{i.icon}</div>
                <p
                  className={`text-sm ${
                    location === i.link ? "text-[#fff]" : "text-[#8F8F8F]"
                  }`}
                >
                  {i.name}
                </p>
              </Link>
            ))}
          </div>
          <div className="py-4 flex-shrink-0">
            <UpgradeSection />
          </div>
        </div>
      )}

      {/* Render the active modal */}
      {renderModal()}
    </>
  );
};

export default Sidebar;
