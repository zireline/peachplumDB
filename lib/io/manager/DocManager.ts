import { JsonData } from '../jsonfilemanager/JsonData.js';
import { JsonFileManager } from '../jsonfilemanager/JsonFileManager.js';
import { DocData } from './DocData.js';

export class DocManager {
  private readonly docPath: string;
  private readonly jsonFileManager: JsonFileManager;

  constructor(docPath: string, jsonFileManager: JsonFileManager) {
    this.docPath = docPath;
    this.jsonFileManager = jsonFileManager;

    this.jsonFileManager.setPath(this.docPath);
  }

  async get(): Promise<JsonData> {
    return await this.jsonFileManager.read();
  }

  async set(data: DocData): Promise<void> {
    await this.jsonFileManager.write(data);
  }

  async update(updateFn: (data: DocData) => void): Promise<void> {
    await this.jsonFileManager.update(updateFn);
  }

  async delete(): Promise<void> {
    await this.jsonFileManager.delete();
  }
}
