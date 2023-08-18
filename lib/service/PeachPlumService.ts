import express from 'express';
import { CollectionManager } from '../io/manager/CollectionManager.js';
import { JsonFileManager } from '../io/jsonfilemanager/JsonFileManager.js';
import { AppDataDirProvider } from '../io/dir/AppDirProvider.js';
import { JsonData } from '../io/jsonfilemanager/JsonData.js';
import bodyParser from 'body-parser';

const app = express();
const appName = 'PeachPlumDB';

const dir = new AppDataDirProvider().getAppDataDir(appName);
const fileManager = new JsonFileManager(dir);
const collectionManager = new CollectionManager(dir, fileManager);

app.use(bodyParser.json());

// Add CORS headers middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// GET /collections/:collectionId/:docId
app.get(
  '/collections/:collectionId/:docId',
  (
    req: { params: { collectionId: any; docId: any } },
    res: { send: (arg0: JsonData) => void; sendStatus: (arg0: number) => void }
  ) => {
    console.info('[GET]', req);

    const { collectionId, docId } = req.params;
    const doc = collectionManager.collection(collectionId).doc(docId);

    doc
      .get()
      .then((docData) => {
        console.info(docData);
        res.send(docData);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
        res.send(err);
      });
  }
);

// GET /collections/:collectionId
app.get(
  '/collections/:collectionId',
  (
    req: { params: { collectionId: any; docId: any } },
    res: { send: (arg0: JsonData) => void; sendStatus: (arg0: number) => void }
  ) => {
    console.info('[GET]', req);

    const { collectionId } = req.params;
    const docs = collectionManager.collection(collectionId);

    docs
      .read()
      .then((docData) => {
        console.info(docData);
        res.send(docData);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
);

// POST /collections/:collectionId/:docId
app.post(
  '/collections/:collectionId/:docId',
  (
    req: { params: { collectionId: any; docId: any }; body: any },
    res: { sendStatus: (arg0: number) => void }
  ) => {
    console.info('[POST]', req);

    const { collectionId, docId } = req.params;
    const docManager = collectionManager.collection(collectionId).doc(docId);

    docManager
      .set(req.body)
      .then(() => {
        console.info('posted: ' + req.body);
        res.sendStatus(201);
      })
      .catch((e) => {
        console.error(e);
        res.sendStatus(500);
      });
  }
);

// PUT /collections/:collectionId/:docId
app.put(
  '/collections/:collectionId/:docId',
  (
    req: { params: { collectionId: any; docId: any }; body: any },
    res: { sendStatus: (arg0: number) => void }
  ) => {
    console.info('[PUT]', req);

    const { collectionId, docId } = req.params;
    const docManager = collectionManager.collection(collectionId).doc(docId);

    docManager
      .update((data) => {
        Object.assign(data, req.body);
      })
      .then(() => {
        console.info('updated: ' + req.body);
        res.sendStatus(204);
      })
      .catch((e) => {
        console.error(e);
        res.sendStatus(500);
      });
  }
);

// DELETE /collections/:collectionId/:docId
app.delete(
  '/collections/:collectionId/:docId',
  (
    req: { params: { collectionId: any; docId: any } },
    res: { sendStatus: (arg0: number) => void }
  ) => {
    console.info('[DELETE]', req);

    const { collectionId, docId } = req.params;
    const docManager = collectionManager.collection(collectionId).doc(docId);

    docManager
      .delete()
      .then(() => {
        console.info('deleted: ' + collectionId + '/' + docId);
        res.sendStatus(204);
      })
      .catch((e) => {
        console.error(e);
        res.sendStatus(500);
      });
  }
);

export function startServer() {
  // Start the server
  const port = 6060;
  app.listen(port, () => {
    console.log(`[PeachPlumDB] Server listening on port ${port}`);
  });
}
