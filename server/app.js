const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
// connect tp atlas db
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://gql-ninja-user:test123@cluster0.uiuyq.mongodb.net/gql-ninja-db?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to DB");
});
// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
