/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Enemy_avatar = {
    readonly avatarUrl: string;
    readonly name: string;
};
export type Enemy_avatar$data = Enemy_avatar;
export type Enemy_avatar$key = {
    readonly " $data"?: Enemy_avatar$data;
    readonly " $fragmentRefs": FragmentRefs<"Enemy_avatar">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Enemy_avatar",
  "type": "Enemy",
  "metadata": {
    "mask": false
  },
  "argumentDefinitions": [],
  "selections": [
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
(node as any).hash = '40602da44921da94134eee79d03ffb1c';
export default node;
