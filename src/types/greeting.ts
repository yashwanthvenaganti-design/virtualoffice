export interface GreetingItem {
  isDefault: any;
  greetingsId: string;
  companyId: string | null;
  name: string;
  greeting: string;
  ddiNo: string | null;
  companyName: string | null;
  companyNamePhonetic: string | null;
  salutation: boolean;
  warning: string | null;
  verified: boolean;
  meta: any | null;
  added: string;
  addedBy: string | null;
  updated: string;
  updatedBy: string | null;
  status: string; // 'A' for Active, 'T' for Test/Inactive, etc.
}

export interface GreetingsResponse {
  data: GreetingItem[];
  message: string;
  status: number;
}

export interface GreetingQueryParams {
  companiesId: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GreetingFormData {
  name: string;
  greeting: string;
  salutation?: boolean;
  ddiNo?: string;
  companyName?: string;
  companyNamePhonetic?: string;
  warning?: string;
}

export interface CreateGreetingResponse {
  data: GreetingItem;
  message: string;
  status: number;
}

export interface UpdateGreetingResponse {
  data: GreetingItem;
  message: string;
  status: number;
}

export interface DeleteGreetingResponse {
  data: null;
  message: string;
  status: number;
}

// For table display
export interface GreetingRowData {
  id: string;
  profileName: string;
  greeting: string;
  salutation: boolean;
  verified: boolean;
  isActive: boolean;
  isDefault: boolean; // We'll determine this based on name or other logic pending from backend
}
