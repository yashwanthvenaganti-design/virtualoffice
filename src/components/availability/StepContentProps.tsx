import React from 'react';
import StatusConfigurationStep from './StatusConfigurationStep';
import ContactDetailsStep from './ContactDetailsStep';
import ReviewAndSaveStep from './ReviewAndSaveStep';
import NotificationPreferencesStep from './NotificationPreferencesStep';

interface FormValues {
  statusName: string;
  availability: 'available' | 'unavailable';
  telNo: string;
  emailNotifications: boolean;
  emailAddress?: string;
  smsNotifications: boolean;
  smsNumber?: string;
}

interface StepContentProps {
  currentStep: number;
  formData: FormValues;
  fieldErrors: Partial<Record<keyof FormValues, string>>;
  onInputChange: (
    field: keyof FormValues
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSwitchChange: (field: 'emailNotifications' | 'smsNotifications') => (checked: boolean) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  formData,
  fieldErrors,
  onInputChange,
  onSwitchChange,
  onKeyPress,
}) => {
  switch (currentStep) {
    case 0:
      return (
        <StatusConfigurationStep
          formData={formData}
          fieldErrors={fieldErrors}
          onInputChange={onInputChange}
          onKeyPress={onKeyPress}
        />
      );

    case 1:
      return (
        <ContactDetailsStep
          formData={formData}
          fieldErrors={fieldErrors}
          onInputChange={onInputChange}
          onKeyPress={onKeyPress}
        />
      );

    case 2:
      return (
        <NotificationPreferencesStep
          formData={formData}
          fieldErrors={fieldErrors}
          onInputChange={onInputChange}
          onSwitchChange={onSwitchChange}
          onKeyPress={onKeyPress}
        />
      );

    case 3:
      return <ReviewAndSaveStep formData={formData} />;

    default:
      return null;
  }
};

export default StepContent;
