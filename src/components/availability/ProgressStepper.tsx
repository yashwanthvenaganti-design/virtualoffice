import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { CheckCircle, Person, Phone, Notifications, Settings } from '@mui/icons-material';

const steps = [
  { id: 'status', label: 'Status Configuration', icon: <Person className='w-4 h-4' /> },
  { id: 'contact', label: 'Contact Details', icon: <Phone className='w-4 h-4' /> },
  { id: 'notifications', label: 'Notifications', icon: <Notifications className='w-4 h-4' /> },
  { id: 'review', label: 'Review & Save', icon: <Settings className='w-4 h-4' /> },
];

interface ProgressStepperProps {
  currentStep: number;
  isStepComplete: (stepIndex: number) => boolean;
  getStepErrors: (stepIndex: number) => boolean;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  currentStep,
  isStepComplete,
  getStepErrors,
}) => {
  return (
    <div className='mb-6'>
      <Stepper
        activeStep={currentStep}
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
                      currentStep === index
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : isStepComplete(index)
                          ? 'bg-green-600 text-white'
                          : getStepErrors(index)
                            ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                    }
                  `}
                >
                  {isStepComplete(index) && currentStep !== index ? (
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
                    currentStep >= index
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

export default ProgressStepper;
