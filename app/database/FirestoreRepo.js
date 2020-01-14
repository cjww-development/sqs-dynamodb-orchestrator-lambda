/*
 * Copyright 2019 CJWW Development
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const admin = require("firebase-admin");
const acc   = require("../../service-account.json");

module.exports = class FirestoreRepo {
    constructor(collectionName) {
        this.collectionName = collectionName;
        admin.initializeApp({ credential: admin.credential.cert(acc)});
        this.raw = admin.firestore();
    }

    create(documentId, data) {
        return this.raw
            .collection(this.collectionName)
            .doc(documentId)
            .set(data)
            .then(() => { return {documentId, data} });
    }

    read(documentId) {
        return this.raw
            .collection(this.collectionName)
            .doc(documentId)
            .get()
            .then(doc => { return doc.data() })
    }
};
