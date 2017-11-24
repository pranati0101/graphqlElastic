
const{
   makeExecutableSchema
 } = require('graphql-tools')
const graphql=require('graphql');
const apollo=require('apollo-server-express')
const userSchema = require('./users/Model/Schema/index')
const todoSchema = require('./todo//Model/Schema/index')
const resolver = require('./users/Model/Resolver/resolver')
/**
 * building graphqlSchema
 */
const schema = makeExecutableSchema(
 { typeDefs:[userSchema,todoSchema],resolvers:resolver});
/**
   * exporting schema
   */
module.exports=schema