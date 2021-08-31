'use strict'
const AWS = require('aws-sdk');
// const Util = require('./Util');
// const clientes = Util.getTableName('prospects-clients')

// console.log(clientes.email);

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  const timestamp = new Date().getTime();
  let email = event.email;
let telephone = event.telephone
let clientType = event.clientType
let fullName = event.fullName
  
  const params = {
    TableName: 'prospects-clients',
    Key: {
      email,
    },
    UpdateExpression:
      'set updated_by = :byUser, is_deleted = :boolValue , clientType = :cT, fullName = :fN, telephone = :tel, clientTimeStamp = :cTS',
    ConditionExpression: ' email = :email',
    ExpressionAttributeValues: {
      // ':byUser': 'updateUser',
      // ':boolValue': 'is_deleted',
      ':cT': clientType,
       ':email': email,
      ':fN': fullName,
      ':tel': telephone,
      ":cTS": timestamp
    },
    ReturnValues: 'UPDATED_NEW',
  };

  // update the todo in the database
    dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'email não existe, favor digitar e-mail correto',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};