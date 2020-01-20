/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Developer_avatar = {
    readonly avatarUrl: string;
    readonly fullName: string;
};
export type Developer_avatar$data = Developer_avatar;
export type Developer_avatar$key = {
    readonly " $data"?: Developer_avatar$data;
    readonly " $fragmentRefs": FragmentRefs<"Developer_avatar">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Developer_avatar",
  "type": "Developer",
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
      "name": "fullName",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '190be574b87b447c2cd6051e4cd631de';
export default node;
