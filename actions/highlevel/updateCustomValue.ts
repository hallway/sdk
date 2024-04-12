export interface UpdateCustomValueParams {
  locationId: string;
  customValueId: string;
  accessToken: string;
  name: string;
  value: string;
}

export interface UpdateCustomValueResponse {
  customValue: {
    id: string;
    name: string;
    fieldKey: string;
    value: string;
    locationId: string;
  };
}

export default async function updateCustomValue({
  locationId,
  customValueId,
  accessToken,
  name,
  value,
}: UpdateCustomValueParams): Promise<UpdateCustomValueResponse> {
  const url = `https://services.leadconnectorhq.com/locations/${locationId}/customValues/${customValueId}`;

  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Version': '2021-07-28',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ name, value }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to update custom value: ${errorBody}`);
  }

  const data: UpdateCustomValueResponse = await response.json();
  return data;
}