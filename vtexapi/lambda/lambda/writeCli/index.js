const AWS = require('aws-sdk');


const dynamoDb = new AWS.DynamoDB.DocumentClient();

   exports.handler = (event, context, callback) => {
  const timestamp = new Date();
 // const data = JSON.parse(event.body);
  //let id = event.id
    let email = event.email;
    let telephone = event.telephone;
    let fullName =  event.fullName;
    let clientType = "prospecto";

  const params = {
    TableName: 'prospects-clients',
    Item: {
      email,
      telephone,
      fullName,
      clientType,
      createdAt: new Date().toISOString(),
      
      
   
       },
      ConditionExpression: 'attribute_not_exists(email)'
     };

  // write the todo to the database
   dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'E-mail já existe no no banco de dados, favor cadastrar um novo e-mail.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};