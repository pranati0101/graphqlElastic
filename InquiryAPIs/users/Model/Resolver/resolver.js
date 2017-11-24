
/**
 * declaring required modules
 */
const queryUtil = require('../../../DB/queryUtil.js')
 /**
 * defining resolver functions
 */
const resolvers = {
    Query: {
  /**
 * fetches user details 
 * @param {*} _ contains root object i.e. parent result
 * @param {*} args arguments provided in the query
 * @param {*} context contains db settings defined in server config. In this caes elastic search client
 */
    getUserDetails(_, args,context){
          if(args.userId){
            console.log(args.userId)
            body={
                "query": {
                  "match":{
                      "id":args.userId
                  }
                }
              }
            return queryUtil.getUserDetails(context,'user',body)
         }
            
      },
  /**
 * fetches active user details 
 * @param {*} _ contains root object i.e. parent result
 * @param {*} args arguments provided in the query
 * @param {*} context contains db settings defined in server config. In this caes elastic search client
 */
    getActiveUsers(_,args,context){
      // return userData
      var body = {
        "query": {
          "match":{
            "isActive":true
          }
        }
      };
          return queryUtil.getActiveUsers(context,'user',body)
    }
      ,
  /**
 * fetches all todos of a particular user 
 * @param {*} _ contains root object i.e. parent result
 * @param {*} args arguments provided in the query
 * @param {*} context contains db settings defined in server config. In this caes elastic search client
 */
    getToDos(_,args,context){
      var body = {
        "query": {
          "match":{
            "userId":args.userId
          }
        }
      };
        if(args.userId)
          return  queryUtil.getToDos(context,'todo',body)
    },
  /**
 * fetches todo details
 * @param {*} _ contains root object i.e. parent result
 * @param {*} args arguments provided in the query
 * @param {*} context contains db settings defined in server config. In this caes elastic search client
 */
    getToDo(_,args,context){
      var body = {
        "query": {
          "match":{
            "id":args.id
          }
        }
      };
        if(args.id)
          return  queryUtil.getToDo(context,'todo',body)
    }
    //,
    // /**
    //  * retrieves all active todos of a particular user
    //  * @param {*} root 
    //  * @param {*} args 
    //  * @param {*} ctx 
    //  * @param {*} info 
    //  */
    // getActiveToDos(root,args,ctx,info){
    //     if(args.userId)
    //         return query.getToDos(root,args,ctx,info)
    // }
     },
     /**
      * defining type user
      */
     User:{
/**
 * fetches user details 
 * @param {*} _ contains root object i.e. parent result
 * @param {*} args arguments provided in the query
 * @param {*} context contains db settings defined in server config. In this caes elastic search client
 */
      todos(_,args,context){
        var body = {
          "query": {
            "match":{
              "userId":_.id
            }
          }
        };
        return queryUtil.getToDos(context,'todo',body) 
     }
     }
    }
  
module.exports= resolvers;