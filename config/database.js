//declaring module
var elasticsearch = require('elasticsearch');
var index="assignment01",type="user";
var fs=require('fs')
//instantiating elastic search client
exports.connectToES = function(){
	return new Promise(function(resolve,reject){
		var esClient = new elasticsearch.Client({
			host: 'localhost:9200',
			log: 'error'
			});
			initIndex(index,type,esClient)
			if(esClient) resolve(esClient)
			else reject ("error")
	})
}
/**
 * create index
 */
createIndex=function(indexName,typeName,esClient){
	return new Promise(function(resolve,reject){
		esClient.indices.create({
			index:"user",
			updateAllTypes:true,
			mappings : {
				"user" : {
						"properties" : {
								"userId" : { "type" : String },
								"fname" : { "type" : String },
								"lname" : { "type" : String },
								"birthDate" : { "type" : String },
								"pinCode" : {"type":Boolean},
								"email" : {"type":String},
								"isActive" : {"type" : Boolean}
						}
				}
			}	
		},function(err,resp){
		  if(err)	reject(err);	  
			else{
				esClient.indices.create({
					index:"todo",
					updateAllTypes:true,
					mappings : {
						"todo" : {
							"properties" : {
									"id" : { "type" : String },
									"text" : { "type" : String },
									"userId" : { "type" : String },
									"targetDate" : { "type" : String },
									"done" : {"type":Boolean}
							}
					}
				}	
				},function(err,resp){
					if(err) reject(err);
					else	resolve("success");
				});
			}
		});
	});
  }
  
  /*
  * function to check whether index exists or not
  */
  indexExists=function(indexName,esClient) {
	  return new Promise(function(resolve,reject){
		esClient.indices.exists({
		  index:indexName
		},function(err,exists){
		  if(err) {
			  console.log(err)
			  reject(err)
		  }
		  console.log("exist",exists);
			if(exists)   resolve(true);
			else resolve(false)
		});
	  });
  }
  
  addDoc=function(indexName,typeName,esClient){
		var userData=fs.readFileSync('./config/userData.json','UTF8');
		userData=JSON.parse(userData)
		var todoData=fs.readFileSync('./config/todoData.json','UTF8');
		todoData=JSON.parse(todoData)

		todoData.data.forEach(element => {
				esClient.index({
					index: "todo",
					type: "todo",
					body:element
				},function(err,resp){
						console.log(err)
				})
});
		userData.data.forEach(element => {
			esClient.index({
				index: "user",
				type: "user",
				body:element
				},function(err,resp){
						console.log(err)
				})
});
}
	
  initIndex=function(index,type,esClient){
	// indexExists(index,esClient).then(function(res){
	// 	if(!res){
	// 		console.log("creating index")
	// 			createIndex(index,type,esClient).then(function(){
	// 			addDoc(index,type,esClient)
	// 		})
	// 	}
	// 	else{
	// 		esClient.indices.delete({
	// 			index: 'assignment01'
	// 		}, function (error, response) {
	// 			console.log(error,response)
	// 		});
	// 	}
	// }).catch(function(error){
	// 	console.log(error)
	// })
  }