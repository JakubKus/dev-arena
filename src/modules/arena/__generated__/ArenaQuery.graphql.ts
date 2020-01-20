/* tslint:disable */
/* eslint-disable */
/* @relayHash 9ebb71003abf0d192601ec6c7a148899 */

import { ConcreteRequest } from "relay-runtime";
export type BodyPart = "BOTTOM" | "MIDDLE" | "TOP" | "%future added value";
export type ArenaQueryVariables = {
    devId: string;
    enemyId: string;
    clothingIds: Array<string | null>;
};
export type ArenaQueryResponse = {
    readonly developer: {
      
        readonly weaponUrl: string;
        readonly damage: {
            readonly min: number;
            readonly max: number;
        };
        readonly hp: number;
        readonly avatarUrl: string;
        readonly fullName: string;
    } | null;
    readonly enemy: {
        readonly attackSpeed: number;
        readonly damage: {
            readonly max: number;
            readonly min: number;
        };
        readonly hp: number;
        readonly quotes: ReadonlyArray<string>;
        readonly avatarUrl: string;
        readonly name: string;
    } | null;
    readonly clothing: ReadonlyArray<{
        readonly bodyPart: BodyPart;
        readonly imageUrl: string;
        readonly name: string;
    } | null> | null;
};
export type ArenaQuery = {
    readonly response: ArenaQueryResponse;
    readonly variables: ArenaQueryVariables;
};



/*
query ArenaQuery(
  $devId: ID!
  $enemyId: ID!
  $clothingIds: [ID]!
) {
  developer(id: $devId) {
    weaponUrl
    damage {
      min
      max
    }
    hp
    avatarUrl
    fullName
    id
  }
  enemy(id: $enemyId) {
    attackSpeed
    damage {
      max
      min
    }
    hp
    quotes
    avatarUrl
    name
    id
  }
  clothing(ids: $clothingIds) {
    bodyPart
    imageUrl
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "devId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "enemyId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "clothingIds",
    "type": "[ID]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "devId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "weaponUrl",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "min",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "max",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "damage",
  "storageKey": null,
  "args": null,
  "concreteType": "Damage",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/)
  ]
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "hp",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "avatarUrl",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fullName",
  "args": null,
  "storageKey": null
},
v9 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "enemyId"
  }
],
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "attackSpeed",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "damage",
  "storageKey": null,
  "args": null,
  "concreteType": "Damage",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v3/*: any*/)
  ]
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quotes",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v14 = [
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "clothingIds"
  }
],
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "bodyPart",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "imageUrl",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArenaQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "developer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Developer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "enemy",
        "storageKey": null,
        "args": (v9/*: any*/),
        "concreteType": "Enemy",
        "plural": false,
        "selections": [
          (v10/*: any*/),
          (v11/*: any*/),
          (v6/*: any*/),
          (v12/*: any*/),
          (v7/*: any*/),
          (v13/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "clothing",
        "storageKey": null,
        "args": (v14/*: any*/),
        "concreteType": "Clothing",
        "plural": true,
        "selections": [
          (v15/*: any*/),
          (v16/*: any*/),
          (v13/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArenaQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "developer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Developer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v17/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "enemy",
        "storageKey": null,
        "args": (v9/*: any*/),
        "concreteType": "Enemy",
        "plural": false,
        "selections": [
          (v10/*: any*/),
          (v11/*: any*/),
          (v6/*: any*/),
          (v12/*: any*/),
          (v7/*: any*/),
          (v13/*: any*/),
          (v17/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "clothing",
        "storageKey": null,
        "args": (v14/*: any*/),
        "concreteType": "Clothing",
        "plural": true,
        "selections": [
          (v15/*: any*/),
          (v16/*: any*/),
          (v13/*: any*/),
          (v17/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArenaQuery",
    "id": null,
    "text": "query ArenaQuery(\n  $devId: ID!\n  $enemyId: ID!\n  $clothingIds: [ID]!\n) {\n  developer(id: $devId) {\n    weaponUrl\n    damage {\n      min\n      max\n    }\n    hp\n    avatarUrl\n    fullName\n    id\n  }\n  enemy(id: $enemyId) {\n    attackSpeed\n    damage {\n      max\n      min\n    }\n    hp\n    quotes\n    avatarUrl\n    name\n    id\n  }\n  clothing(ids: $clothingIds) {\n    bodyPart\n    imageUrl\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '839eff9b4fd7390cf571cbada71e5c09';
export default node;
