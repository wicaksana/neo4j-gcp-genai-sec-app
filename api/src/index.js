import  { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server";
import * as neo4j from "neo4j-driver";
import { typeDefs } from "./graphql-schema.js";

const driver = neo4j.driver(
    process.env.NEO$J_URI || "bolt://localhost:7687",
    neo4j.auth.basic(
        process.env.NEO4J_USER || "neo4j",
        process.env.NEO4J_PASSWORD || "password"
    )
);

const neoSchema = new Neo4jGraphQL({typeDefs, driver});

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });

    server.listen({port: process.env.GRAPHQL_LITSTEN_PORT || '4001'}).then(({url}) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})