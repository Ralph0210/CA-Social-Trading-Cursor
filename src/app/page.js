"use client"
import Image from "next/image"
import { useState } from "react"
import SubscriptionPlan from "./components/subscription/SubscriptionPlan"
import ApiKeySelection from "./components/subscription/ApiKeySelection"

export default function Home() {
  // State for modal visibility and current step
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Handle modal open/close
  const handleOpenModal = () => {
    setShowModal(true)
    setCurrentStep(1)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentStep(1)
  }

  // Handle navigation between steps
  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      handleCloseModal()
    }
  }

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SubscriptionPlan onClose={handleCloseModal} onNext={handleNext} />
        )
      case 2:
        return <ApiKeySelection onBack={handleBack} onNext={handleNext} />
      case 3:
        return (
          <div className="api-key-selection-overlay">
            <div className="api-key-selection-modal">
              <h2>Step 3</h2>
              <div className="api-key-actions">
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
                <button className="next-button" onClick={handleNext}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="api-key-selection-overlay">
            <div className="api-key-selection-modal">
              <h2>Step 4</h2>
              <div className="api-key-actions">
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
                <button className="next-button" onClick={handleNext}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="api-key-selection-overlay">
            <div className="api-key-selection-modal">
              <h2>Step 5</h2>
              <div className="api-key-actions">
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
                <button
                  className="next-button"
                  onClick={() => handleCloseModal()}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <Image src="/background.png" alt="Profile" width={1440} height={1080} />
      <button
        onClick={handleOpenModal}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "12px 24px",
          background: "#4169E1",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        Open Subscription
      </button>

      {showModal && renderCurrentStep()}
    </div>
  )
}
