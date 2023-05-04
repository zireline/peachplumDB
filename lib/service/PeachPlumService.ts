import express from 'express';
import { CollectionManager } from '../io/manager/CollectionManager.js';
import { JsonFileManager } from '../io/jsonfilemanager/JsonFileManager.js';
import { AppDataDirProvider } from '../io/dir/AppDirProvider.js';
import { JsonData } from '../io/jsonfilemanager/JsonData.js';
import { DocData } from '../io/manager/DocData.js';
import bodyParser from 'body-parser';

const app = express();
const appName = 'PeachPlumDB';

const dir = new AppDataDirProvider().getAppDataDir(appName);
const fileManager = new JsonFileManager(dir);
const collectionManager = new CollectionManager(dir, fileManager);

app.use(bodyParser.json());

// GET /collections/:collectionId/:docId
app.get(
  '/collections/:collectionId/:docId',
  async (
    req: { params: { collectionId: any; docId: any } },
    res: { send: (arg0: JsonData) => void; sendStatus: (arg0: number) => void }
  ) => {
    const { collectionId, docId } = req.params;
    const doc = collectionManager.collection(collectionId).doc(docId);

    try {
      const docData = await doc.get();
      res.send(docData);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
);

// GET /collections/:collectionId
app.get(
  '/collections/:collectionId',
  async (
    req: { params: { collectionId: any; docId: any } },
    res: { send: (arg0: JsonData) => void; sendStatus: (arg0: number) => void }
  ) => {
    const { collectionId } = req.params;
    const docs = collectionManager.collection(collectionId);

    try {
      const docData = await docs.read();
      res.send(docData);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
);

// POST /collections/:collectionId/:docId
app.post(
  '/collections/:collectionId/:docId',
  async (
    req: { params: { collectionId: any; docId: any }; body: any },
    res: { sendStatus: (arg0: number) => void }
  ) => {
    const { collectionId, docId } = req.params;
    const docManager = collectionManager.collection(collectionId).doc(docId);

    try {
      await docManager.set(req.body);
      res.sendStatus(201);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
);

// PUT /collections/:collectionId/:docId
app.put(
  '/collections/:collectionId/:docId',
  async (
    req: { params: { collectionId: any; docId: any }; body: any },
    res: { sendStatus: (arg0: number) => void }
  ) => {
    const { collectionId, docId } = req.params;
    const docManager = collectionManager.collection(collectionId).doc(docId);

    try {
      await docManager.update((data) => {
        Object.assign(data, req.body);
      });
      res.sendStatus(204);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
);

// DELETE /collections/:collectionId/:docId
app.delete(
  '/collections/:collectionId/:docId',
  async (
    req: { params: { collectionId: any; docId: any } },
    res: { sendStatus: (arg0: number) => void }
  ) => {
    const { collectionId, docId } = req.params;
    const docManager = collectionManager.collection(collectionId).doc(docId);

    try {
      await docManager.delete();
      res.sendStatus(204);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
);

export function startServer() {
  // Start the server
  const port = 6000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
