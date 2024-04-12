export interface DeleteBusinessParams {
  businessId: string;
  accessToken: string;
  apiVersion: string;
}

export default async function deleteBusiness({
  businessId,
  accessToken,
  apiVersion,
}: DeleteBusinessParams): Promise<{ success: boolean; businessId: string }> {
  const url = `https://services.leadconnectorhq.com/businesses/${businessId}`;
  const options = {
    method: 'DELETE',
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
      `Error deleting business ${businessId}: ${response.status} ${response.statusText}`,
      {
        businessId,
        status: response.status,
        statusText: response.statusText,
        responseBody: errorBody,
      }
    );
    throw new Error(
      `Error deleting business ${businessId}: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return {
    success: data.success,
    businessId: businessId,
  };
}