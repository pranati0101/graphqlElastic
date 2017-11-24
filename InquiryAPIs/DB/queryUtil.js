/**
 * defining queries
 *
 * 
 * */
const _=require('lodash')

/**
 * fetches user details 
 * @param {*} context contains db settings defined in server config. In this caes elastic search client
 * @param {*} typeName type and index name
 * @param {*} body query 
 */
   exports.getUserDetails=function (context,typeName, body) {
      return new Promise(function(resolve,reject){
       context.search({
           index: typeName,
           type: typeName,
           body: body
       }).then(function (res) {
        if(res.hits.total>0){
            var results=res.hits.hits;
            resolve(results[0]._source)
        }
    
       }).catch(function (err) {
           reject(err);
         });
      })
           
   }
   /**
   * fetches list of active users
   * @param {*} context contains db settings defined in server config. In this caes elastic search client
   * @param {*} typeName type and index name
   * @param {*} body query 
   */
   exports.getActiveUsers=function (context,typeName, body) {
       return new Promise(function(resolve,reject){
        context.search({
            index: typeName,
            type: typeName,
            body: body
            }
        ).then(function (res) {
            var results=res.hits.hits;
            finalResult=_.map(results,function(obj){
                return obj._source
            })
            resolve(finalResult)
        }).catch(function (err) {
            console.log("Error",err);
            reject(err);
          });
       })
            
    }
     /**
   * fetches todos of a particular user
   * @param {*} context contains db settings defined in server config. In this caes elastic search client
   * @param {*} typeName type and index name
   * @param {*} body query 
   */
    exports.getToDos=function (context,typeName, body) {
        return new Promise(function(resolve,reject){
         context.search({
             index: typeName,
             type: typeName,
             body: body
             }
         ).then(function (res) {
             var results=res.hits.hits;
             finalResult=_.map(results,function(obj){
                 return obj._source
             })
             resolve(finalResult)
         }).catch(function (err) {
             console.log("Error",err);
             reject(err);
           });
        })    
     }

     /**
   * fetches todo of a particular id
   * @param {*} context contains db settings defined in server config. In this caes elastic search client
   * @param {*} typeName type and index name
   * @param {*} body query 
   */
  exports.getToDo=function (context,typeName, body) {
    return new Promise(function(resolve,reject){
     context.search({
         index: typeName,
         type: typeName,
         body: body
         }
     ).then(function (res) {
        if(res.hits.total>0){
            var results=res.hits.hits;
            resolve(results[0]._source)
        }
    
       }).catch(function (err) {
           reject(err);
         });
    })    
 }