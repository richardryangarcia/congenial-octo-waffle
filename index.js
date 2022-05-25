const createClient = require("graphql-ws").createClient;
const WebSocket = require("ws");

const main = async () => {
  const client = createClient({
    url: "wss://indexer-dev-rinkeby.zora.co/v1/graphql",
    webSocketImpl: WebSocket,
  });

  client.subscribe(
    {
      query:
        'subscription { Token (where: {_and: [{tokenId: {_eq: "133"}}, {address: {_eq: "0x775B572e0CEB816625Af9779Bb686A8b47975876"}}]}){tokenId v3Ask{id}} }',
    },
    {
      next: data => {
        console.log("data", data?.data?.Token[0]);
      },
      error: error => {
        console.error("error", error);
      },
      complete: () => {
        console.log("no more greetings");
      },
    }
  );
};

main();
