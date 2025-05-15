"use client"
import React, { useState } from "react"

const ApiKeySelection = ({ onBack, onNext }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showNewKeySection, setShowNewKeySection] = useState(false)
  const [selectedKey, setSelectedKey] = useState(null)

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleNewKeyToggle = () => {
    setShowNewKeySection(!showNewKeySection)
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0F1729]/90 backdrop-blur-[2px] animate-fade-in z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-[480px] max-h-[85vh] bg-[#151C35] rounded-[20px] p-6 text-[#94A3B8] relative shadow-xl animate-slide-up overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2
            id="modal-title"
            className="text-[20px] font-semibold text-[#94A3B8] m-0 tracking-tight"
          >
            Grid Bot #1 - Copy Trade
          </h2>
          <button
            className="text-[#4A5578] text-2xl cursor-pointer p-2 hover:text-[#94A3B8]"
            onClick={onBack}
            aria-label="Close API key selection"
          >
            ×
          </button>
        </div>

        {/* Progress */}
        <div
          className="mb-8 text-base text-center flex justify-center items-center gap-2"
          role="progressbar"
          aria-valuenow="2"
          aria-valuemax="5"
        >
          <span className="text-xl font-bold text-[#94A3B8]">2</span>
          <span className="text-[#4A5578]">/ 5 :</span>
          <span className="text-[#94A3B8]">
            Select an effective API key or create a new one.
          </span>
        </div>

        {/* API Key Selection */}
        <div className="mb-6">
          <label className="block mb-2 text-[15px] text-[#94A3B8]">
            Select API Key
          </label>
          <div
            className="flex items-center gap-3 px-4 h-[46px] bg-[#1B2341] border border-[#2A3558] rounded-xl text-[#94A3B8] text-[15px] cursor-pointer transition-all hover:bg-[#212C52] hover:border-[#3B82F6]"
            onClick={handleDropdownClick}
            role="combobox"
            aria-expanded={isDropdownOpen}
            tabIndex={0}
          >
            <svg
              className="w-4 h-4 text-[#4A5578]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14L11 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="flex-grow">Select</span>
            <svg
              className="w-4 h-4 text-[#4A5578]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Add New API Key Section */}
        <div className="mb-8">
          <button
            className="flex items-center gap-2 text-[15px] text-[#94A3B8] hover:text-white transition-colors"
            onClick={handleNewKeyToggle}
            aria-expanded={showNewKeySection}
          >
            <svg
              className={`w-4 h-4 transition-transform ${showNewKeySection ? "rotate-180" : ""}`}
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add a new API Key
          </button>

          {showNewKeySection && (
            <div className="mt-4 p-4 bg-[#1B2341] border border-[#2A3558] rounded-xl">
              {/* Add your new key form content here */}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className="py-3 px-7 min-w-[120px] h-[46px] rounded-xl text-[15px] font-medium cursor-pointer transition-all bg-[#1B2341] border border-[#2A3558] text-[#94A3B8] hover:bg-[#212C52] hover:border-[#3B82F6]"
            onClick={onBack}
            aria-label="Go back to previous screen"
          >
            Back
          </button>
          <button
            className={`py-3 px-7 min-w-[120px] h-[46px] rounded-xl text-[15px] font-semibold cursor-pointer transition-all border-none text-white ${
              selectedKey
                ? "bg-[#3B82F6] hover:bg-[#2563EB]"
                : "bg-[#3B82F6]/50 cursor-not-allowed"
            }`}
            onClick={onNext}
            disabled={!selectedKey}
            aria-label="Continue to next step"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApiKeySelection
