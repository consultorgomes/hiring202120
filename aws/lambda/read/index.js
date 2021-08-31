'use strict'
const AWS = require('aws-sdk');


exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB();
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let  idemail = event.email;
  const params = {
  
    TableName : 'prospects-clients',
    Key : {
      email: idemail
    }
  }

  try {
    const data = await documentClient.get(params).promise();
    console.log(data);
  } catch (err) {
    body: "email não encontrado";
  }
}