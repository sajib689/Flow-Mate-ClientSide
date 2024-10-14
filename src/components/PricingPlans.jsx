import { pricingPlans } from "@/constants";
import PropTypes from "prop-types";
import Container from "./Container";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout/CheckoutForm";
import { FaHandPointRight } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PricingPlanCard = ({ name, price, features, paymentType }) => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleGetStarted = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        confirmButtonColor: "#2563EB",
        confirmButtonText: "Login",
        text: "You need to be logged in to subscribe to a plan",
      });
    } else {
      setOpen(true);
    }
  };

  const handleStartFree = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        confirmButtonColor: "#2563EB",
        confirmButtonText: "Login",
        text: "You need to be logged in to subscribe to a plan",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Free Plan Activated",
        confirmButtonColor: "#2563EB",
        confirmButtonText: "Close",
        text: "You have successfully activated the free plan.",
      });
    }
  };

  const handleProceedToPayment = () => {
    setOpen(false);
    setIsSelected(true);
    setOpenPaymentModal(true);
  };

  return (
    <div
      className={`flex flex-col border-2 rounded-lg p-5 hover:shadow-lg transform delay-150 mx-auto hover:bg-slate-200 active:bg-gray-700 active:text-white ${
        isSelected ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex flex-col text-center pb-10 md:w-[350px] w-[280px]">
        <h3 className="text-base font-semibold">{name}</h3>
        <p className="text-3xl font-bold">
          {price === "0" ? "Get Started for Free!" : `$${price}`}
          <span className="text-sm font-semibold text-zinc-500">
            {price === "0" ? "" : ` ${paymentType ? `(${paymentType})` : ""}`}
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-between h-full">
        <ul role="list" className="mb-8 space-y-4 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <FaHandPointRight className="text-blue-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {price === "0" ? (
          <Button
            className="w-full font-bold gap-2 shadow uppercase p-2 text-white"
            onClick={handleStartFree}
          >
            Start Free
          </Button>
        ) : (
          <Button
            className="w-full font-bold gap-2 shadow uppercase p-2 text-white"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        )}
      </div>
      {/* Modal for Subscription Details */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subscribe to {name}</DialogTitle>
            <DialogDescription>
              You are subscribing to the {name} plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-start justify-start">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="package-name" className="text-start">
                Package name
              </Label>
              <Input
                id="package-name"
                value={name}
                readOnly
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="price" className="text-start">
                Price
              </Label>
              <Input id="price" value={price} readOnly className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="email" className="text-start">
                Email Address
              </Label>
              <Input
                id="email"
                value={user?.email || ""}
                readOnly
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleProceedToPayment}>
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal for Stripe Payment */}
      <Dialog open={openPaymentModal} onOpenChange={setOpenPaymentModal}>
        <DialogContent className="max-h-fit">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              Enter your payment details to subscribe to the {name} plan.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                bookingData={{ name, price, user }}
                setOpenPaymentModal={setOpenPaymentModal}
                setOpen={setOpen}
              />
            </Elements>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleProceedToPayment}>
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState("basic"); // State to track the active tab

  // Filter pricing plans based on the active tab
  const filteredPlans = pricingPlans.filter((plan) => plan.type === activeTab);

  return (
    <div className="max-w-7xl mx-auto">
      <section className="p-4 md:p-8">
        <div className="py-8 max-w-screen-xl lg:py-16 py-5">
          <div className="mx-auto max-w-3xl text-center pb-12 md:pb-20">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
              Pricing <span className="text-blue-500">Plans</span>
            </h1>
            <p className="text-center text-gray-500">
              Choose a plan that best suits your data needs.
            </p>
            <div className="grid gap-3 md:grid-cols-2 my-4">
              <button
                className={`w-full px-3 py-2 font-medium text-gray-800 uppercase transition-colors duration-300 transform rounded-lg focus:outline-none ${
                  activeTab === "basic"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setActiveTab("basic")}
              >
                Basic
              </button>

              <button
                className={`w-full px-3 py-2 font-medium text-gray-800 uppercase transition-colors duration-300 transform rounded-lg focus:outline-none ${
                  activeTab === "premium"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setActiveTab("premium")}
              >
                Premium
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-col-3 lg:grid-cols-3 gap-4 ">
            {filteredPlans.map((plan) => (
              <PricingPlanCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                features={plan.features}
                paymentType={plan.paymentType}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

PricingPlanCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  paymentType: PropTypes.string,
};

export default PricingPlans;
