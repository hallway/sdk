export interface GetCustomValuesParams {
  accessToken: string;
  locationId: string;
  apiVersion?: string;
}

export interface CustomValue {
  id: string;
  name: string;
  fieldKey: string;
  value: string;
  locationId: string;
}

export interface CustomValuesResponse {
  customValues: CustomValue[];
}

export default async function getCustomValues({
  accessToken,
  locationId,
  apiVersion = "2021-07-28"
}: GetCustomValuesParams): Promise<CustomValuesResponse> {
  const url = `https://services.leadconnectorhq.com/locations/${locationId}/customValues`;
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
    console.error(
      `Error fetching custom values for location ${locationId}: ${response.status} ${response.statusText}`,
      {
        locationId,
        status: response.status,
        statusText: response.statusText,
        responseBody: errorBody,
      }
    );
    throw new Error(
      `Error fetching custom values for location ${locationId}: ${response.status} ${response.statusText}`
    );
  }

  const data: CustomValuesResponse = await response.json();
  return data;
}