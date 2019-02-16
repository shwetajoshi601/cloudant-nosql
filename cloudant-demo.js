// Load the Cloudant library. 
var Cloudant = require('cloudant');
var fs = require('fs');
var me = 'your username here'; // Set this to your own account 
var password = 'your password here';

// Initialize the library with my account. 
var cloudant = Cloudant({account:me, password:password, plugin:'retry',maxAttempts: 5, retryTimeout:10000});

/**
Function to ping and verify the cloudant connection
*/
cloudant.ping(function(err, res) {
  console.log(res);
});

/**
List all databases in your service instance
*/
cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
});


/**
Create a new database
@param name of the database
*/
cloudant.db.create('nodetest',function(err,res){
	if(err)
		console.log(err);
	else
		console.log(res);
});

/**
Get database details
*/
cloudant.db.get('nodedb',function(err,res){
	console.log("\n ---- retrieve by Id Database ----");
	if(err)
		console.log(err);
	else
		console.log(res);
});

// perform operations on a database
var newdb=cloudant.db.use('testdb');
var doc={};

/**
Inserting documents in a database with _id
*/
for(var i=2;i<102;i++)
{
newdb.insert({'_id':'doc'+i,'name':'student'+i, 'marks': i+20 },function(err,res){
	console.log("\n ---- create Document ---")
if(err)
			console.log(err);
		else{
			console.log(res);
			}
});
}

/**
List all documents in a database with details
*/
newdb.list({include_docs:true,conflicts:true,attachments:false},function(err,res){
console.log("\n ---- retrieveAll Document---")
if(err)
			console.log(err);
		else
			console.log(res);
});


/**
List only design documents from a database
*/
newdb.list({startkey: "_design",endkey:"_design0",include_docs:true},function(err,res){
console.log("\n ---- retrieveAll Design Document---")
if(err)
			console.log(err);
		else
			console.log(res);
});

/**
Find documents based on some criteria
*/
newdb.find({selector:{marks:45}},function(err,res){
console.log("\n ---- retrieve by where Document----");
if(err)
			console.log(err);
		else
			console.log(res);
});

/**
Get a single document by ID
*/
var rev;
newdb.get('doc1',function(err,res){
console.log("\n ---- retrieve by Id Document----");
if(err)
			console.log(err);
		else{
			console.log(res);
			rev=res._rev;
			}
});

/**
Update a document. Cloudant performs a destructive replace. _id and _rev are mandatory fields
*/
newdb.insert({ _id: 'doc1', _rev: '2-86c2df061cc76b94d06fab88d921e3ce', "name": "CIAppConnect-PSL",
  "teamSize": 50,
  "BU":"IBM"}, function(err, body) {
console.log("\n ---- Update Document----");
  if (err)
    console.log(err);
  else
	console.log(body);
});

/**
Insert a document with an inline attachment
*/

newdb.insert({'marks':45,'grade':'D', _attachments:{"myAttach":{"content_type":"image/png", "data":"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"}}},function(err,res){
	console.log("\n ---- create Document with Attach ---")
if(err)
			console.log(err);
		else
			console.log(res);

});


/**
Create an attachment on an existing document
*/
fs.readFile('testJson.json',function(err,data){
		newdb.attachment.insert('doc1', 'attachJSON2', data, 'application/json', {"rev": "16-335fd3b08da8f9854d8bc840cfb31e43"}, function(err,res){
console.log("\n\n ---- Create Attachment ----");
if(err)
	console.log(err);
else
	console.log(res);
});
});

function b64toBlob(b64Data, contentType) {
  /*contentType = contentType || '';
  sliceSize = 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;*/
  var buf=Buffer.from(b64Data,'base64');
  var buf = Convert.FromBase64String(str);
  return buf;
}

var blob=b64toBlob('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','image/png');
console.log("----------BLOB-------------");
console.log(blob);
newdb.attachment.insert('docTest','jsonInB64',new Buffer("ew0KCSJOYW1lIjoiU2h3ZXRhIiwNCgkiQ2l0eSI6IlB1bmUiDQp9","base64"),'application/json', {rev:"7-a9118a999f1a0f9c6a673e405087a0e5"}, function(err,res){
console.log("\n\n ---- Create Attachment 2 ----");
if(err)
	console.log(err);
else
	console.log(res);
});



/**
Retrieve an attachment. The API returns the image in BLOB format. 
*/
newdb.attachment.get('doc1', 'attachHTML',{}, function(err,res){
console.log("\n\n ---- getById Attachment ----");
if(err)
	console.log(err);
else{
	console.log(res.toString("utf8"));
	console.log(typeof res);
	if(Buffer.isBuffer(res))
		{
			var data = {"data":new Buffer(res,'binary').toString("base64")};
			console.log(data);
		}else{
			console.log(res);
		}
		console.log(res);
		var data = {"data":JSON.parse(new Buffer(res,'binary').toString("utf-8"))};
		console.log(data);
	}
	console.log(res);
	
});
//Supported mime types for attachment
//https://en.wikipedia.org/wiki/Media_type#List_of_common_media_types

/**
Querying a view
*/

newdb.view('viewDemo', 'getMarks2', {reduce:false}, function(err,res){
	console.log("\n\n ---- query a view ----");
	if(err)
		console.log(err);
	else
		console.log(res);
});

/**
Querying a List Function
*/
newdb.viewWithList('listfunc', 'myView', 'listdemofunc', {}, function(err,res){
	console.log("\n\n ---- List function ----");
	if(err)
		console.log(err);
	else
		console.log(res);
});

/**
Querying a Show function
*/
newdb.show('showFunc', 'showDemo', '1854f2cf2cdce34a71c7a043a391ae0f',function(err,res){
	console.log("\n\n ---- Show function ----");
	if(err)
		console.log(err);
	else
		console.log(res);
});

/**
Querying an update handler
*/
newdb.atomic('update-handler', 'myUpdateHandler', 'testdoc1',{"name":"SJ","College":"MESCOE"}, function(err,res){
	console.log("\n\n ---- Update Handler function ----");
	if(err)
		console.log(err);
	else
		console.log(res);
});















