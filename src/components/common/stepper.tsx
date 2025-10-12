"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
  variant?: "default" | "compact";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, className, variant = "default", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={step.id}>
                {/* Step Circle and Content */}
                <div className="flex flex-col items-center relative">
                  {/* Step Circle */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 z-10 bg-background",
                      {
                        // Completed state
                        "border-primary bg-primary text-primary-foreground":
                          isCompleted,
                        // Active state
                        "border-primary bg-primary text-primary-foreground":
                          isActive,
                        // Inactive state
                        "border-muted-foreground/30 text-muted-foreground":
                          !isActive && !isCompleted,
                      }
                    )}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{stepNumber}</span>
                    )}
                  </div>

                  {/* Step Label */}
                  {variant === "default" && (
                    <div className="mt-2 text-center">
                      <div
                        className={cn("text-sm font-medium transition-colors", {
                          "text-primary": isActive || isCompleted,
                          "text-muted-foreground": !isActive && !isCompleted,
                        })}
                      >
                        {step.label}
                      </div>
                      {step.description && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {step.description}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div
                      className={cn("h-0.5 transition-all duration-200", {
                        "bg-primary": stepNumber < currentStep,
                        "bg-muted-foreground/30": stepNumber >= currentStep,
                      })}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Compact variant labels */}
        {variant === "compact" && (
          <div className="flex items-center justify-between mt-4">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;

              return (
                <div
                  key={`${step.id}-label`}
                  className={cn(
                    "text-sm font-medium transition-colors text-center flex-1",
                    {
                      "text-primary": isActive || isCompleted,
                      "text-muted-foreground": !isActive && !isCompleted,
                    }
                  )}
                >
                  {step.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export { Stepper };
