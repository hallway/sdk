export interface UpdateOpportunityParams {
  accessToken: string;
  opportunityId: string;
  pipelineId: string;
  name: string;
  pipelineStageId: string;
  status: 'open' | 'won' | 'lost' | 'abandoned' | 'all';
  monetaryValue: number;
  assignedTo: string;
  customFields: CustomFieldInput[];
  apiVersion?: string;
}

export interface CustomFieldInput {
  id?: string;
  key?: string;
  field_value: string;
}

export default async function updateOpportunity({
  accessToken,
  opportunityId,
  pipelineId,
  name,
  pipelineStageId,
  status,
  monetaryValue,
  assignedTo,
  customFields,
  apiVersion = "2021-07-28"
}: UpdateOpportunityParams): Promise<any> {
  const url = `https://services.leadconnectorhq.com/opportunities/${opportunityId}`;
  const body = JSON.stringify({
    pipelineId,
    name,
    pipelineStageId,
    status,
    monetaryValue,
    assignedTo,
    customFields
  });

  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Version': apiVersion,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: body
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Error updating opportunity ${opportunityId}: ${response.status} ${response.statusText}`);
    throw new Error(`Error updating opportunity ${opportunityId}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}