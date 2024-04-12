export interface OpportunityParams {
  id: string;
  accessToken: string;
  apiVersion?: string;
}

export interface OpportunityResponse {
  id: string;
  name: string;
  monetaryValue: number;
  pipelineId: string;
  pipelineStageId: string;
  assignedTo: string;
  status: string;
  lastStatusChangeAt: string;
  lastStageChangeAt: string;
  lastActionDate: string;
  indexVersion: number;
  createdAt: string;
  updatedAt: string;
  contactId: string;
  locationId: string;
  contact: {
    id: string;
    name: string;
    companyName: string;
    email: string;
    phone: string;
    tags: string[];
  };
}

export default async function getOpportunity({
  id,
  accessToken,
  apiVersion = "2021-07-28"
}: OpportunityParams): Promise<OpportunityResponse> {
  const url = `https://services.leadconnectorhq.com/opportunities/${id}`;

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
    console.error(`Error fetching opportunity ${id}: ${response.status} ${response.statusText}`, {
      opportunityId: id,
      status: response.status,
      statusText: response.statusText,
      responseBody: errorBody,
    });
    throw new Error(`Error fetching opportunity ${id}: ${response.status} ${response.statusText}`);
  }

  const data: OpportunityResponse = await response.json();
  return data;
}