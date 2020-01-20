import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const apiUrl = "https://dev-arena-api.azurewebsites.net";

const network = Network.create((operation, variables) => (
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    }),
  }).then(response => {
    return response.json();
  })
));

const store = new Store(new RecordSource());

export const environment = new Environment({
  network,
  store,
});
