import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { printSchema, buildClientSchema } from "graphql/utilities";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import introspectionResult from "../schema.json";

const AutoMockedProvider = ({ children, mockResolvers }) => {
  const defaultMocks = {
    Book: () => ({
      title: () => "Book 1",
      id: () => "1",
      author: () => ({
        firstName: () => "A",
        lastName: () => "B",
      }),
      s,
    }),
  };
  //convert from JSON to schemaDefLanguage
  const schemaDL = printSchema(
    buildClientSchema({
      __schema: introspectionResult.__schema,
    })
  );
  //make converted schema executable
  const schema = makeExecutableSchema({
    typeDefs: schemaDL,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });
  //Apply mock resolvers to execuatable schema
  addMocksToSchema({
    schema,
    mocks: { ...defaultMocks, ...mockResolvers },
  });
  //define apollo client
  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });
  //return apollo provider
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AutoMockedProvider;
