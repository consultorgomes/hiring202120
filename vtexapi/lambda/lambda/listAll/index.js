'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = (e, cta, callback) => {
  var params = {
    TableName : 'prospects-clients'
  }; 
  docClient.scan(params, function(err, data){
      if(err){
          callback(err,null);
      }else{
          callback(null, data);
      }      
  });    
};