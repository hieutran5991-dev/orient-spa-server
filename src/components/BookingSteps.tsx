"use client";

import { useTranslations } from "next-intl";

interface BookingStepsProps {
  currentStep: number;
}

export default function BookingSteps({ currentStep }: BookingStepsProps) {
  const t = useTranslations("booking");

  const steps = [
    { id: 1, label: t("stepReserve"), icon: "ic-reserve" },
    { id: 2, label: t("stepSelect"), icon: "ic-select" },
    { id: 3, label: t("stepConfirm"), icon: "ic-confirm" },
  ];

  return (
    <div className="k1_m fl fl-3">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`k1_i ${currentStep >= step.id ? "active" : ""}`}
        >
          <div className="k1_a">
            <i className={`ic ${step.icon}`}></i>
          </div>
          <div className="k1_c">{step.label}</div>
        </div>
      ))}
    </div>
  );
}
