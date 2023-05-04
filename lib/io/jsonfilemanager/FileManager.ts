import { JsonData } from './JsonData.js';

export interface FileManager {
  read(): Promise<JsonData>;
  write(data: JsonData): Promise<void>;
  delete(): Promise<void>;
}
