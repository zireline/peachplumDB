# PeachPlumDB API

![image](https://github.com/scriptsynergy/peachplumDB/assets/64959978/2aa03117-039d-43d7-bd28-b3afed70babb)
<br />
This API provides a basic CRUD (Create, Read, Update, Delete) functionality for collections and documents stored in PeachPlumDB.

## Getting Started

### Intall Globally
```bash
npm i -g peachplumdb
```

### Run the server
Start the server by running `peach`. The server listens on port `6060`

## Usage
```typescript
const collectionId = 'yourCollectionId';
const docId = 'yourDocId';

fetch(`/collections/${collectionId}/${docId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Document data:', data);
    // You can handle the retrieved data here
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle error cases here
  });
```

## Endpoints
The following endpoints are available:

- `GET /collections/:collectionId/:docId`: Retrieves a specific document in a collection.
- `GET /collections/:collectionId`: Retrieves all documents in a collection.
- `POST /collections/:collectionId/:docId`: Creates a new document in a collection.
- `PUT /collections/:collectionId/:docId`: Updates a specific document in a collection.
- `DELETE /collections/:collectionId/:docId`: Deletes a specific document in a collection.

## Request and Response Format

All requests and responses use JSON format.

### GET /collections/:collectionId/:docId

- Parameters:
  - `collectionId`: the ID of the collection to retrieve the document from
  - `docId`: the ID of the document to retrieve
- Response: the JSON data of the retrieved document

### GET /collections/:collectionId

- Parameters:
  - `collectionId`: the ID of the collection to retrieve all documents from
- Response: an array of JSON data of all documents in the collection

### POST /collections/:collectionId/:docId

- Parameters:
  - `collectionId`: the ID of the collection to create a new document in
  - `docId`: the ID of the new document
- Request body: the JSON data of the new document
- Response: status code `201` if the document was created successfully

### PUT /collections/:collectionId/:docId

- Parameters:
  - `collectionId`: the ID of the collection to update the document in
  - `docId`: the ID of the document to update
- Request body: the JSON data to update the document with
- Response: status code `204` if the document was updated successfully

### DELETE /collections/:collectionId/:docId

- Parameters:
  - `collectionId`: the ID of the collection to delete the document from
  - `docId`: the ID of the document to delete
- Response: status code `204` if the document was deleted successfully
