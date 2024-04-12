export interface GetCustomFieldsParams {
    accessToken: string;
    locationId: string;
    model?: string;
    apiVersion?: string;
}

export interface CustomFieldResponse {
    customFields: CustomField[];
}

export default async function getCustomFields({
    accessToken,
    locationId,
    model = "all",
    apiVersion = "2021-07-28"
}: GetCustomFieldsParams): Promise<CustomFieldResponse> {
    const url = `https://services.leadconnectorhq.com/locations/${locationId}/customFields?model=${model}`;
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
        console.error(`Error fetching custom fields: ${response.status} ${response.statusText}`, {
            status: response.status,
            statusText: response.statusText,
            responseBody: errorBody,
        });
        throw new Error(`Error fetching custom fields: ${response.status} ${response.statusText}`);
    }

    const data: CustomFieldResponse = await response.json();
    return data;
}