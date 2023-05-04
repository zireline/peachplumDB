import * as path from 'path';

export class AppDataDirProvider {
  public getAppDataDir(appName: string): string {
    const appDir = path.dirname(process.argv[1]); // Use the directory of the main module
    return path.join(appDir, appName);
  }
}
