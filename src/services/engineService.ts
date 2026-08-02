import { EngineApi } from "../api/engineApi";
import type { DriveResponse, EngineResponse } from "../models/engine";

export class EngineService {
  private readonly engineApi = new EngineApi();

  public async startEngine(id: number): Promise<EngineResponse> {
    return this.engineApi.startEngine(id);
  }

  public async stopEngine(id: number): Promise<EngineResponse> {
    return this.engineApi.stopEngine(id);
  }

  public async driveEngine(id: number): Promise<DriveResponse> {
    return this.engineApi.driveEngine(id);
  }
}
