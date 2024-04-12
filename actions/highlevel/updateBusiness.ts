export interface UpdateBusinessParams {
  businessId: string;
  accessToken: string;
  apiVersion: string;
  name?: string;
  phone?: string;
  email?: string;
  postalCode?: string;
  website?: string;
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  description?: string;
}

export interface BusinessResponse {
  success: boolean;
  business: {
    id: string;
    name: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    city: string;
    description: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export default async function updateBusiness({
  businessId,
  accessToken,
  apiVersion,
  name,
  phone,
  email,
  postalCode,
  website,
  address,
  state,
  city,
  country,
  description,
}: UpdateBusinessParams): Promise<BusinessResponse> {
  const url = `https://services.leadconnectorhq.com/businesses/${businessId}`;

  const bodyData = JSON.stringify({
    name,
    phone,
    email,
    postalCode,
    website,
    address,
    state,
    city,
    country,
    description,
  });

  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Version': apiVersion,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: bodyData,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Error updating business ${businessId}: ${response.status} ${response.statusText}`, {
      businessId,
      status: response.status,
      statusText: response.statusText,
      responseBody: errorBody,
    });
    throw new Error(`Error updating business ${businessId}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as BusinessResponse;
  return data;
}