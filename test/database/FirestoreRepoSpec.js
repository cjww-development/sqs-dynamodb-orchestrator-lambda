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

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;

const FirestoreRepo = require("../../app/database/FirestoreRepo");
const mockfirestore = new firebasemock.MockFirestore();

const {isEquivalent} = require("../utils/ObjectUtils");

const testDocId = "testDocId";
const testData  = {abc: 123};

describe("Firestore repository tests", () => {
    const testRepo = new FirestoreRepo("test-collection");
    testRepo.raw

    it("create a new document within the db", () => {
        return testRepo.create(testDocId, testData).then(res => {
            expect(res.documentId).to.equal(testDocId);
            expect(res.data).to.equal(testData);
        });
    });

    it("get an existing document from the db", () => {
        return testRepo.read(testDocId).then(res => {
            expect(isEquivalent(res, testData)).to.equal(true)
        });
    });

    it("error getting a non existent document", () => {
        return testRepo.read("invalidTestDocId").then(res => {
            expect(res).to.equal(undefined);
        });
    });
});
