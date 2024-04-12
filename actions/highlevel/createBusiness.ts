export interface CreateBusinessParams {
  accessToken: string;
  version: string;
  name: string;
  locationId: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country: string;
  description?: string;
}

export interface BusinessResponse {
  success: boolean;
  business: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    city?: string;
    description?: string;
    state?: string;
    postalCode?: string;
    country: string;
    updatedBy?: any;
    locationId: string;
    createdBy?: any;
    createdAt: string;
    updatedAt: string;
  };
}

export default async function createBusiness({
  accessToken,
  version,
  name,
  locationId,
  phone,
  email,
  website,
  address,
  city,
  postalCode,
  state,
  country,
  description,
}: CreateBusinessParams): Promise<BusinessResponse> {
  const url = `https://services.leadconnectorhq.com/businesses/`;
  const body = JSON.stringify({
    name,
    locationId,
    phone,
    email,
    website,
    address,
    city,
    postalCode,
    state,
    country,
    description,
  });

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Version': version,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Error creating business: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  const data: BusinessResponse = await response.json();
  return {
    success: data.success,
    business: {
      id: data.business.id,
      name: data.business.name,
      phone: data.business.phone,
      email: data.business.email,
      website: data.business.website,
      address: data.business.address,
      city: data.business.city,
      description: data.business.description,
      state: data.business.state,
      postalCode: data.business.postalCode,
      country: data.business.country,
      updatedBy: data.business.updatedBy,
      locationId: data.business.locationId,
      createdBy: data.business.createdBy,
      createdAt: data.business.createdAt,
      updatedAt: data.business.updatedAt,
    },
  };
}