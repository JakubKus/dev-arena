/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Enemy_enemy = {
    readonly attackSpeed: number;
    readonly damage: {
        readonly max: number;
        readonly min: number;
    };
    readonly hp: number;
    readonly quotes: ReadonlyArray<string>;
    readonly avatarUrl: string;
    readonly name: string;
};
export type Enemy_enemy$data = Enemy_enemy;
export type Enemy_enemy$key = {
    readonly " $data"?: Enemy_enemy$data;
    readonly " $fragmentRefs": FragmentRefs<"Enemy_enemy">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Enemy_enemy",
  "type": "Enemy",
  "metadata": {
    "mask": false
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "attackSpeed",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "damage",
      "storageKey": null,
      "args": null,
      "concreteType": "Damage",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "max",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "min",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hp",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "quotes",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "avatarUrl",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '34c64fc11b494365072b8c3fd15d0202';
export default node;
