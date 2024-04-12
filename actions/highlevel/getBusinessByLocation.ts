export interface GetBusinessByLocationParams {
  accessToken: string;
  locationId: string;
  version: string;
}

export interface Business {
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
  createdAt?: string;
  updatedAt?: string;
}

export interface GetBusinessesResponse {
  businesses: Business[];
}

export default async function getBusinessByLocation({
  accessToken,
  locationId,
  version,
}: GetBusinessByLocationParams): Promise<Business[]> {
  const url = `https://services.leadconnectorhq.com/businesses/?locationId=${locationId}`;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Version': version,
      'Accept': 'application/json',
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Error fetching businesses for location ${locationId}: ${errorBody}`);
  }

  const { businesses }: GetBusinessesResponse = await response.json();
  return businesses;
}