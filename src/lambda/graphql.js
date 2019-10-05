const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require("./api/typedefs");
const resolvers = require("./api/resolvers");
const connectToMongoDB = require("./api/db");

exports.handler = async function(event, context) {
  const user = context.clientContext && context.clientContext.user;
  // const db = await connectToMongoDB();
  const db = null;
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(db),
    context: () => ({ user }),
  });
  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler()(event, context, cb);
  });
};
