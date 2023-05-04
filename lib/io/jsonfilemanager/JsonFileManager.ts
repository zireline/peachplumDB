import { existsSync } from 'fs';
import { parseError } from '../../util/parseError.js';
import { FileManager } from './FileManager.js';
import { JsonData } from './JsonData.js';
import fs, { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export class JsonFileManager implements FileManager {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  setPath(path: string): void {
    this.filePath = path;
  }

  async read(): Promise<JsonData> {
    try {
      const data = await fs.readFile(this.filePath);
      const jsonData = JSON.parse(data.toString());
      return jsonData;
    } catch (e) {
      throw new Error(`Error parsing JSON: ${parseError(e)}`);
    }
  }

  async readDir(collectionPath: string): Promise<JsonData[]> {
    const files = await fs.readdir(collectionPath);
    const jsonDataList: JsonData[] = [];

    for (const file of files) {
      const filePath = path.join(collectionPath, file);

      try {
        const fileManager = new JsonFileManager(filePath);
        const jsonData = await fileManager.read();
        jsonDataList.push(jsonData);
      } catch (e) {
        console.error(`Error reading file ${filePath}: ${parseError(e)}`);
      }
    }

    return jsonDataList;
  }

  async write(data: JsonData): Promise<void> {
    const jsonData = JSON.stringify(data);
    const dirPath = path.dirname(this.filePath);

    await mkdir(dirPath, { recursive: true });
    await writeFile(this.filePath, jsonData);
  }

  async delete(): Promise<void> {
    await fs.unlink(this.filePath);
  }

  async update(updateFn: (data: JsonData) => void): Promise<void> {
    try {
      const data = await this.read();
      updateFn(data);
      await this.write(data);
    } catch (e) {
      throw new Error(`Error updating data: ${parseError(e)}`);
    }
  }
}
