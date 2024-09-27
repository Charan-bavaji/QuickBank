import { databases } from "./config";
import { ID } from "appwrite";
const db = {};
const collections = [
    {
        dbId: '66e4443f003bfa937d45',
        id: '66e44459001164dc5179',
        name: "users",
    },
    {
        dbId: '66e4443f003bfa937d45',
        id: '66e58919001f63dd5d2f',
        name: "profiles"

    },
    {
        dbId: '66e4443f003bfa937d45',
        id: '66e5d5380029ec306103',
        name: "transactions",
    },
];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload, permissions, id = ID.unique()) =>
            databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            databases.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

        list: (queries = []) =>
            databases.listDocuments(col.dbId, col.id, queries),

        get: (id) => databases.getDocument(col.dbId, col.id, id),
    };
});

export default db; 