/**
 * defining shema for todos
 */
const typeDef=`
type ToDo{
  id:String
  text:String
  userId:String
  done:Boolean
  targetDate:String
  }

`
module.exports=typeDef

// type Query{
//   #defining find todo based on specific id
//   getToDo(id:String): ToDo
// }