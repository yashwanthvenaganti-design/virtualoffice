export interface AddressItem {
  addressesId: string;
  companiesId: string | null;
  name: string;
  description: string;
  landmark?: string | null;
  telPrefix: string;
  telNo: string;
  telNoAlt?: string | null;
  emailAddr?: string | null;
  addrLine1: string;
  addrLine2?: string | null;
  addrLine3?: string | null;
  town: string;
  county?: string | null;
  postcode: string;
  country: string;
  locationsId?: string | null;
  meta?: any | null;
  added: string;
  addedBy?: string | null;
  updated: string;
  updatedBy?: string | null;
  weight: number;
  status: string;
  isDefault?: boolean;
}

export interface AddressesResponse {
  data: AddressItem[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface AddressQueryParams {
  companiesId: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AddressFormData {
  name: string;
  description: string;
  landmark?: string;
  telPrefix: string;
  telNo: string;
  telNoAlt?: string;
  emailAddr?: string;
  addrLine1: string;
  addrLine2?: string;
  addrLine3?: string;
  town: string;
  county?: string;
  postcode: string;
  country: string;
}

export interface Country {
  code?: string | null;
  name?: string | null;
  dialCode?: string | null;
  [key: string]: any;
}

export interface CountriesResponse {
  data: Country[];
}

// For table display
export interface AddressRowData {
  id: string;
  name: string;
  isDefault: boolean;
  landmark: string;
  companyTelNo: string;
  addrLine1: string;
  postcode: string;
}
