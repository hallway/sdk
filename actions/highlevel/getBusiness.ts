
export interface BusinessResponse {
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
  country?: string;
  updatedBy?: UpdatedBy;
  locationId: string;
  createdBy?: CreatedBy;
  createdAt: string;
  updatedAt: string;
}

export interface GetBusinessParams {
  businessId: string;
  accessToken: string;
  apiVersion: string;
}

export default async function getBusiness({
  businessId,
  accessToken,
  apiVersion = "2021-04-15"
}: GetBusinessParams): Promise<BusinessResponse> {
  const url = `https://services.leadconnectorhq.com/businesses/${businessId}`;

  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Version': apiVersion,
      'Accept': 'application/json',
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Error fetching business ${businessId}: ${response.status} ${response.statusText}`, {
      businessId,
      status: response.status,
      statusText: response.statusText,
      responseBody: errorBody,
    });
    throw new Error(`Error fetching business ${businessId}: ${response.status} ${response.statusText}`);
  }

  const data: { business: BusinessResponse } = await response.json();

  return data.business;
}
