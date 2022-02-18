import http from "http";
import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";

import { typeDefs, books } from "./constants";

const resolvers = {
  Query: {
    books: () => books,
    book: () => [books[0]]
  }
};

(async function () {
  // config
  const PORT = 8080;

  // koa
  const app = new Koa();
  app
    .use(async (ctx, next) => {
      console.log(`ctx status with ${ctx.status}`);

      try {
        await next();
      } finally {
        console.log("flag 1");
      }
    })
    .on("error", (err, ctx) => {
      console.log("raised an error. see below details.");
      console.log(`error ctx ${ctx}`);
      console.log(err);
    });

  // apollo
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  // REF  https://www.apollographql.com/docs/apollo-server/v2/data/subscriptions/#using-with-middleware-integrations
  const httpServer = http.createServer(app.callback());
  //   below function does not exist on `apollo-server-koa@3`
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log("start listening graphql");
  });
})();
