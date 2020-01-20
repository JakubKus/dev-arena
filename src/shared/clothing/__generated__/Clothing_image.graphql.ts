/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Clothing_image = {
    readonly imageUrl: string;
    readonly name: string;
};
export type Clothing_image$data = Clothing_image;
export type Clothing_image$key = {
    readonly " $data"?: Clothing_image$data;
    readonly " $fragmentRefs": FragmentRefs<"Clothing_image">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Clothing_image",
  "type": "Clothing",
  "metadata": {
    "mask": false
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "imageUrl",
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
(node as any).hash = '75b8010054228a2a9075a32f26b4ba52';
export default node;
