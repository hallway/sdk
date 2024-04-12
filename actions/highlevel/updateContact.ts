export interface UpdateContactParams {
    accessToken: string;
    contactId: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    phone?: string;
    address1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    website?: string;
    timezone?: string;
    dnd?: boolean;
    tags?: string[];
    customFields?: CustomField[];
    source?: string;
    country?: string;
    version?: string;
}

export interface ContactResponse {
    id: string;
    name: string;
    locationId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    website: string;
    timezone: string;
    tags: string[];
    customFields: CustomField[];
    source: string;
    country: string;
    dnd: boolean;
}

export default async function updateContact({ accessToken, contactId, version = "2021-07-28", ...bodyParams }: UpdateContactParams): Promise<ContactResponse> {
    const url = `https://services.leadconnectorhq.com/contacts/${contactId}`;
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Version': version,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(bodyParams)
    };

    const response = await fetch(url, options);
    
    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Error updating contact ${contactId}: ${response.status} ${response.statusText}`, {
            contactId,
            status: response.status,
            statusText: response.statusText,
            requestBody: bodyParams,
            responseBody: errorBody,
        });
        throw new Error(`Error updating contact ${contactId}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const { contact } = data;

    return {
        id: contact.id,
        name: contact.name,
        locationId: contact.locationId,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        address1: contact.address1,
        city: contact.city,
        state: contact.state,
        postalCode: contact.postalCode,
        website: contact.website,
        timezone: contact.timezone,
        tags: contact.tags,
        customFields: contact.customFields,
        source: contact.source,
        country: contact.country,
        dnd: contact.dnd
    };
}