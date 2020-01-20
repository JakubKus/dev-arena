/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Developer_shared = {
    readonly damage: {
        readonly min: number;
        readonly max: number;
    };
    readonly hp: number;
    readonly avatarUrl: string;
    readonly fullName: string;
};
export type Developer_shared$data = Developer_shared;
export type Developer_shared$key = {
    readonly " $data"?: Developer_shared$data;
    readonly " $fragmentRefs": FragmentRefs<"Developer_shared">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Developer_shared",
  "type": "Developer",
  "metadata": {
    "mask": false
  },
  "argumentDefinitions": [],
  "selections": [
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
          "name": "min",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "max",
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
      "name": "avatarUrl",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "fullName",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '895d9e5463f180cd472134e6b10499d3';
export default node;
