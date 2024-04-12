export interface GetPipelineParams {
  accessToken: string;
  locationId: string;
  pipelineName: string;
  apiVersion?: string;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: any[];
  showInFunnel: boolean;
  showInPieChart: boolean;
  locationId: string;
}

export interface GetPipelineResponse {
  pipelines: Pipeline[];
}

export default async function getPipelineByName({
  accessToken,
  locationId,
  pipelineName,
  apiVersion = "2021-07-28"
}: GetPipelineParams): Promise<Pipeline | null> {
  let url = `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`;

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
    console.error(`Error fetching pipelines: ${response.status} ${response.statusText}`, {
      status: response.status,
      statusText: response.statusText,
      responseBody: errorBody,
    });
    throw new Error(`Error fetching pipelines: ${response.status} ${response.statusText}`);
  }

  const data: GetPipelineResponse = await response.json();
  const pipeline = data.pipelines.find(p => p.name === pipelineName);

  return pipeline || null;
}