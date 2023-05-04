import { DocManager } from './DocManager.js';
import { JsonFileManager } from '../jsonfilemanager/JsonFileManager.js';
import { JsonData } from '../jsonfilemanager/JsonData.js';

export class CollectionManager {
  private readonly collectionPath: string;
  private readonly jsonFileManager: JsonFileManager;

  constructor(collectionPath: string, jsonFileManager: JsonFileManager) {
    this.collectionPath = collectionPath;
    this.jsonFileManager = jsonFileManager;
  }

  collection(collectionId: string): CollectionManager {
    const collectionPath = `${this.collectionPath}/${collectionId}`;
    return new CollectionManager(collectionPath, this.jsonFileManager);
  }

  doc(docId: string): DocManager {
    const docPath = `${this.collectionPath}/${docId}.json`;
    return new DocManager(docPath, this.jsonFileManager);
  }

  async read(): Promise<JsonData[]> {
    return await this.jsonFileManager.readDir(this.collectionPath);
  }
}
