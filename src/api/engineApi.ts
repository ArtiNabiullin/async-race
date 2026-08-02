import type {
  DriveResponse,
  EngineResponse,
  EngineStatus,
} from "../models/engine";

const BASE_URL = "http://localhost:3000";

export class EngineApi {
  public async startEngine(id: number): Promise<EngineResponse> {
    return this.sendRequest<EngineResponse>(id, "started");
  }

  public async stopEngine(id: number): Promise<EngineResponse> {
    return this.sendRequest<EngineResponse>(id, "stopped");
  }

  public async driveEngine(id: number): Promise<DriveResponse> {
    return this.sendRequest<DriveResponse>(id, "drive");
  }

  public async sendRequest<ResponseData>(
    id: number,
    status: EngineStatus,
  ): Promise<ResponseData> {
    const params = new URLSearchParams({
      id: String(id),
      status,
    });

    const response = await fetch(`${BASE_URL}/engine?${params.toString()}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      throw new Error(`Failed to set engine status: ${status}`);
    }

    const data: ResponseData = await response.json();

    return data;
  }
}
