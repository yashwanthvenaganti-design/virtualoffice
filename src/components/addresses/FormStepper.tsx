import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export interface StepDefinition {
  id: string;
  label: string;
  icon: React.ReactElement;
}

interface FormStepperProps {
  steps: StepDefinition[];
  activeStep: number;
  isStepComplete: (stepIndex: number) => boolean;
  getStepErrors: (stepIndex: number) => boolean;
}

const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  activeStep,
  isStepComplete,
  getStepErrors,
}) => {
  return (
    <div className='mb-6'>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'
      >
        {steps.map((step, index) => (
          <Step key={step.id}>
            <StepLabel
              error={getStepErrors(index)}
              icon={
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                    ${
                      activeStep === index
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : isStepComplete(index)
                          ? 'bg-green-600 text-white'
                          : getStepErrors(index)
                            ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                    }
                  `}
                >
                  {isStepComplete(index) && activeStep !== index ? (
                    <CheckCircle className='w-4 h-4' />
                  ) : (
                    step.icon
                  )}
                </div>
              }
            >
              <span
                className={`
                  text-sm font-medium
                  ${
                    activeStep >= index
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {step.label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default FormStepper;
