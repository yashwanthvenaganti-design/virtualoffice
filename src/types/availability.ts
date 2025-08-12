export interface AvailabilityItem {
  availabilitiesId: string;
  people: string | null;
  name: string;
  instruction: string | null;
  available: boolean;
  availability: string;
  telNo: string;
  telNoAlt: string | null;
  email: boolean;
  emailAddr: string;
  sms: boolean;
  smsNo: string;
  star: boolean;
  activated: string; // ISO date string
  meta: any | null;
  added: string; // ISO date string
  addedBy: string | null;
  updated: string; // ISO date string
  updatedBy: string | null;
  status: string;
}

export interface AvailabilitiesResponse {
  data: AvailabilityItem[];
  message: string;
  status: number;
}

// Query parameters for the API
export interface AvailabilityQueryParams {
  peopleId: string;
}

// Form data structure for create/update
export interface AvailabilityFormData {
  name: string;
  available: boolean;
  availability?: string; // Optional for create
  telNo: string;
  email: boolean;
  emailAddr: string;
  sms: boolean;
  smsNo: string;
}

// API endpoints - updated to match your actual API
export const AVAILABILITY_ENDPOINTS = {
  LIST: '/vo/availabilities/viewStatuses',
  CREATE: '/vo/availabilities/addStatus',
  UPDATE: '/vo/availabilities/updateStatus',
  DELETE: '/vo/availabilities/deleteStatuses',
} as const;
