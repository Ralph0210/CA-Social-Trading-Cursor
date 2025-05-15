"use client"
import React, { useState, useCallback } from "react"
import { COLORS, VALID_DISCOUNT_CODES } from "../../constants/discountCodes"

const SubscriptionPlan = ({ onClose, onNext }) => {
  // State management
  const [selectedPlan, setSelectedPlan] = useState("6month")
  const [discountCode, setDiscountCode] = useState("")
  const [discountError, setDiscountError] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(null)
  const [hasAttempted, setHasAttempted] = useState(false)

  // Handle escape key press
  const handleEscapeKey = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  // Add event listener for escape key
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [handleEscapeKey])

  // Subscription plan data with formatted price display
  const plans = [
    {
      id: "3month",
      price: 58.0,
      formattedPrice: "58.00",
      originalPrice: 60.0,
      formattedOriginalPrice: "60.00",
      duration: "3 months",
      discount: "Save 20%",
      description: "Perfect for new traders to test our platform",
    },
    {
      id: "6month",
      price: 112.0,
      formattedPrice: "112.00",
      originalPrice: 120.0,
      formattedOriginalPrice: "120.00",
      duration: "6 months",
      discount: "Save 25%",
      popular: true,
      description: "Most popular: Save more with 6-month access",
    },
    {
      id: "12month",
      price: 220.0,
      formattedPrice: "220.00",
      originalPrice: 240.0,
      formattedOriginalPrice: "240.00",
      duration: "12 months",
      discount: "Save 30%",
      description: "Best value: Full year of unlimited trading",
    },
  ]

  // Handle plan selection with keyboard support
  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId)
  }

  const handlePlanKeyPress = (event, planId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handlePlanSelect(planId)
    }
  }

  // Handle discount code validation
  const handleDiscountCode = () => {
    setHasAttempted(true)
    if (discountCode.trim() === "") {
      setDiscountError("")
      setAppliedDiscount(null)
      setHasAttempted(false)
      return
    }

    if (VALID_DISCOUNT_CODES[discountCode]) {
      setDiscountError("")
      setAppliedDiscount(VALID_DISCOUNT_CODES[discountCode])
    } else {
      setDiscountError("This code isn't valid. Please check and try again.")
      setAppliedDiscount(null)
    }
  }

  // Clear discount code
  const handleClearDiscount = () => {
    setDiscountCode("")
    setDiscountError("")
    setAppliedDiscount(null)
    setHasAttempted(false)
  }

  // Render a single plan card with enhanced accessibility
  const renderPlanCard = (plan) => {
    // Calculate the actual discount percentage
    const discountPercentage = Math.round(
      ((plan.originalPrice - plan.price) / plan.originalPrice) * 100
    )

    return (
      <div
        key={plan.id}
        className={`bg-[#1B2341] border-[1px] border-[#2A3558] rounded-[16px] p-6 flex items-start cursor-pointer transition-all hover:bg-[#212C52] relative ${
          selectedPlan === plan.id
            ? "bg-[#212C52] border-[#3B82F6] shadow-[0_0_0_1px_rgba(59,130,246,0.1)]"
            : ""
        }`}
        onClick={() => handlePlanSelect(plan.id)}
        onKeyPress={(e) => handlePlanKeyPress(e, plan.id)}
        role="radio"
        aria-checked={selectedPlan === plan.id}
        tabIndex={0}
      >
        <div className="mr-5 pt-1">
          <div
            className={`w-[22px] h-[22px] border-2 rounded-full relative transition-all ${
              selectedPlan === plan.id
                ? "border-[#3B82F6] bg-[#3B82F6]/5"
                : "border-[#4A5578]"
            }`}
            aria-hidden="true"
          >
            {selectedPlan === plan.id && (
              <div className="absolute w-3 h-3 bg-[#3B82F6] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in" />
            )}
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-baseline mb-2">
            <span className="text-lg font-medium text-[#94A3B8] mr-1">$</span>
            <span className="text-[32px] font-bold text-white tracking-tight">
              {plan.formattedPrice}
            </span>
            <span className="text-sm text-[#94A3B8] ml-2">
              USD / {plan.duration}
            </span>
          </div>

          <div className="text-sm text-[#94A3B8] mb-3">{plan.description}</div>

          <div className="flex items-center gap-3">
            <span className="line-through text-[#64748B] text-[15px]">
              ${plan.formattedOriginalPrice}
            </span>
            <div className="flex gap-2">
              <span className="py-1 px-3 rounded-[6px] text-xs font-bold whitespace-nowrap tracking-tight bg-[#FFD700] text-[#000000]">
                {discountPercentage}% OFF
              </span>
              {appliedDiscount && (
                <span
                  className="py-1 px-3 rounded-[6px] text-xs font-bold whitespace-nowrap tracking-tight animate-fade-in-right"
                  style={{
                    background: appliedDiscount.backgroundColor,
                    color: appliedDiscount.color,
                  }}
                >
                  {appliedDiscount.label}
                </span>
              )}
            </div>
          </div>
        </div>

        {plan.popular && (
          <div
            className="absolute top-1 right-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-[#3B82F6] text-white flex items-center gap-1.5"
            aria-label="Popular plan - 80% of users chose this option"
          >
            <svg
              className="w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
                fill="currentColor"
              />
            </svg>
            Popular choice
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        .modal-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .modal-scroll::-webkit-scrollbar-track {
          background: #151c35;
          border-radius: 4px;
        }
        .modal-scroll::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        .modal-scroll::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
        .modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #151c35;
        }
      `}</style>
      <div
        className="fixed inset-0 flex items-center justify-center bg-[#0F1729]/90 backdrop-blur-[2px] animate-fade-in z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="w-full max-w-[480px] max-h-[85vh] bg-[#151C35] rounded-[20px] p-6 text-[#94A3B8] relative shadow-xl animate-slide-up overflow-y-auto modal-scroll">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2
              id="modal-title"
              className="text-[20px] font-semibold text-[#94A3B8] m-0 tracking-tight"
            >
              Select Plan - Grid Bot #1
            </h2>
            <button
              className="text-[#4A5578] text-2xl cursor-pointer p-2 hover:text-[#94A3B8]"
              onClick={onClose}
              aria-label="Close plan selection"
            >
              ×
            </button>
          </div>

          {/* Progress */}
          <div
            className="mb-6 text-base text-center flex justify-center items-center gap-2"
            role="progressbar"
            aria-valuenow="1"
            aria-valuemax="5"
          >
            <span className="text-xl font-bold text-[#94A3B8]">Step 1</span>
            <span className="text-[#4A5578]">of 5:</span>
            <span className="text-[#94A3B8]">Choose your plan</span>
          </div>

          {/* Discount Code */}
          <div className="mb-8">
            <label
              htmlFor="discountCode"
              className="block mb-2 text-[15px] text-[#94A3B8]"
            >
              Have a discount code?
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <input
                  type="text"
                  id="discountCode"
                  className="flex-1 py-3 px-4 h-[46px] bg-[#1B2341] border border-[#2A3558] rounded-xl text-[#94A3B8] text-[15px] transition-all focus:outline-none focus:border-[#3B82F6] focus:bg-[#212C52] placeholder:text-[#4A5578]"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  aria-label="Enter discount code"
                  aria-invalid={!!discountError}
                  placeholder="Type your code here"
                />
                <button
                  className="px-6 h-[46px] bg-[#1B2341] border border-[#2A3558] rounded-xl text-[#94A3B8] text-[15px] font-medium cursor-pointer transition-all hover:bg-[#212C52] hover:border-[#3B82F6]"
                  onClick={
                    (hasAttempted && discountError) || appliedDiscount
                      ? handleClearDiscount
                      : handleDiscountCode
                  }
                  aria-label={
                    (hasAttempted && discountError) || appliedDiscount
                      ? "Remove discount code"
                      : "Apply discount code"
                  }
                >
                  {(hasAttempted && discountError) || appliedDiscount
                    ? "Clear code"
                    : "Apply code"}
                </button>
              </div>
              {discountError && (
                <div
                  className="text-[#FF6B6B] text-sm py-2 px-3 bg-[#FF6B6B]/10 rounded-lg animate-shake"
                  role="alert"
                >
                  This code isn't valid. Please check and try again.
                </div>
              )}
            </div>
          </div>

          {/* Plans */}
          <div
            className="flex flex-col gap-4 mb-8"
            role="radiogroup"
            aria-label="Subscription plans"
          >
            {plans.map(renderPlanCard)}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              className="py-3 px-7 min-w-[120px] h-[46px] rounded-xl text-[15px] font-medium cursor-pointer transition-all bg-[#1B2341] border border-[#2A3558] text-[#94A3B8] hover:bg-[#212C52] hover:border-[#3B82F6]"
              onClick={onClose}
              aria-label="Go back to previous screen"
            >
              Back
            </button>
            <button
              className="py-3 px-7 min-w-[120px] h-[46px] rounded-xl text-[15px] font-semibold cursor-pointer transition-all border-none text-white bg-[#3B82F6] hover:bg-[#2563EB]"
              onClick={onNext}
              aria-label="Continue to next step"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscriptionPlan
