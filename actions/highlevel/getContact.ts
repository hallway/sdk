export interface GetContactParams {
  accessToken: string;
  contactId: string;
  apiVersion?: string;
}

export interface ContactDetails {
  id: string;
  name: string;
  locationId: string;
  firstName: string;
  lastName: string;
  email: string;
  emailLowerCase: string;
  timezone: string;
  companyName: string;
  phone: string;
  dnd: boolean;
  address1: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  website: string;
  tags: string[];
  dateOfBirth: string;
  dateAdded: string;
  dateUpdated: string;
  customFields: Array<{ id: string; value: string }>;
  businessId: string;
}

export default async function getContact({
  accessToken,
  contactId,
  apiVersion = "2021-07-28",
}: GetContactParams): Promise<ContactDetails> {
  const url = `https://services.leadconnectorhq.com/contacts/${contactId}`;
  
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
    throw new Error(`Error fetching contact ${contactId}: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  return data.contact;
}