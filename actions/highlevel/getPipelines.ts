export interface PipelineStage {
  showInFunnel: boolean;
  showInPieChart: boolean;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[][];
  locationId: string;
}

export interface GetPipelinesResponse {
  pipelines: Pipeline[];
}

export interface GetPipelinesParams {
  accessToken: string;
  locationId: string;
  apiVersion?: string;
}

export default async function getPipelines({
  accessToken,
  locationId,
  apiVersion = "2021-07-28"
}: GetPipelinesParams): Promise<GetPipelinesResponse> {
  const url = `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`;
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
      `Error fetching pipelines: ${response.status} ${response.statusText}`,
      {
        status: response.status,
        statusText: response.statusText,
        responseBody: errorBody,
      }
    );
    throw new Error(
      `Error fetching pipelines: ${response.status} ${response.statusText}`
    );
  }

  const data: GetPipelinesResponse = await response.json();
  return data;
}