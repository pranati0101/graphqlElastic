
const typeDef = `
type User{
userId:String
fname:String
lname:String
email:String
isActive:Boolean
birthDate:String
pinCode:Int
todos(userId:String):[ToDo]
}
type Query{

#defining find user query
getUserDetails(userId:String): User

# defining find active users query
getActiveUsers : [User]

#retrieving all active todos of a particular user
getToDos(userId:String):[ToDo]

#defining find todo based on specific id
getToDo(id:String): ToDo
}
`

module.exports=typeDef




// #  find active todos of user whose targetDate is atmost tomorrow
//   getActiveToDos (userId:String) : [ToDo]