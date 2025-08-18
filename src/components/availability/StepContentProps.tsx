import React from 'react';
import StatusConfigurationStep from './StatusConfigurationStep';
import ContactDetailsStep from './ContactDetailsStep';
import NotificationPreferencesStep from './NotificationPreferencesStep';
import ReviewAndSaveStep from './ReviewAndSaveStep';

export interface FormValues {
  statusName: string;
  availability: 'available' | 'unavailable';
  telNo: string;
  emailNotifications: boolean;
  emailAddress?: string;
  smsNotifications: boolean;
  smsNumber?: string;
  unavailableReason?: string;
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
  const apiFormData = {
    statusName: formData.statusName,
    availability: formData.availability,
    telNo: formData.telNo,
    emailNotifications: formData.emailNotifications,
    emailAddress: formData.emailAddress,
    smsNotifications: formData.smsNotifications,
    smsNumber: formData.smsNumber,
  };

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
      return <ReviewAndSaveStep formData={apiFormData} />;

    default:
      return null;
  }
};

export default StepContent;
