#stack.js

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Function
    const handler = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'app.handler', // Assuming your Node.js file is named app.js and the handler function is named handler
      code: lambda.Code.fromAsset('path/to/your/node-app'), // Path to your Node.js app code
    });

    // API Gateway
    const api = new apigateway.RestApi(this, 'MyApi', {
      restApiName: 'My API',
      description: 'Sample API',
    });

    // API Gateway Resource
    const resource = api.root.addResource('sample');

    // Integration between API Gateway and Lambda Function
    const integration = new apigateway.LambdaIntegration(handler);
    resource.addMethod('GET', integration);
  }
}
#app.ts

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, CDK! This is your simple GET endpoint.' }),
  };
};


#ebs

  import * as cdk from 'aws-cdk-lib';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snsSubscriptions from 'aws-cdk-lib/aws-sns-subscriptions';

export class ElasticBeanstalkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // SQS Queue
    const queue = new sqs.Queue(this, 'MyQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // SNS Topic
    const topic = new sns.Topic(this, 'MyTopic');

    // Subscribe SQS Queue to SNS Topic
    topic.addSubscription(new snsSubscriptions.SqsSubscription(queue));

    // Elastic Beanstalk Environment
    const ebEnvironment = new elasticbeanstalk.CfnEnvironment(this, 'MyEBEnvironment', {
      applicationName: 'MyEBApplication', // You can create an Elastic Beanstalk application in a separate stack if needed
      environmentName: 'MyEBEnvironment',
      solutionStackName: '64bit Amazon Linux 2 v4.4.5 running Node.js', // Choose the appropriate Node.js version
      optionSettings: [
        {
          namespace: 'aws:elasticbeanstalk:application:environment',
          optionName: 'SQS_QUEUE_URL',
          value: queue.queueUrl,
        },
      ],
    });

    // Elastic Beanstalk Application Version
    const ebApplicationVersion = new elasticbeanstalk.CfnApplicationVersion(
      this,
      'MyEBApplicationVersion',
      {
        applicationName: 'MyEBApplication',
        sourceBundle: {
          s3Bucket: 'your-s3-bucket-for-application-code',
          s3Key: 'path/to/your/application-code.zip',
        },
      }
    );

    // Output the Elastic Beanstalk Environment URL
    new cdk.CfnOutput(this, 'EBEnvironmentURL', {
      value: `http://${ebEnvironment.attrCname}`,
      description: 'Elastic Beanstalk Environment URL',
    });
  }
}
#sqs

  
  import * as cdk from 'aws-cdk-lib';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ElasticBeanstalkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // SQS Queue
    const queue = new sqs.Queue(this, 'MyQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // Elastic Beanstalk Environment
    const ebEnvironment = new elasticbeanstalk.CfnEnvironment(this, 'MyEBEnvironment', {
      applicationName: 'MyEBApplication', // You can create an Elastic Beanstalk application in a separate stack if needed
      environmentName: 'MyEBEnvironment',
      solutionStackName: '64bit Amazon Linux 2 v4.4.5 running Node.js', // Choose the appropriate Node.js version
      optionSettings: [
        {
          namespace: 'aws:elasticbeanstalk:application:environment',
          optionName: 'SQS_QUEUE_URL',
          value: queue.queueUrl,
        },
      ],
    });

    // Elastic Beanstalk Application Version
    const ebApplicationVersion = new elasticbeanstalk.CfnApplicationVersion(
      this,
      'MyEBApplicationVersion',
      {
        applicationName: 'MyEBApplication',
        sourceBundle: {
          s3Bucket: 'your-s3-bucket-for-application-code',
          s3Key: 'path/to/your/application-code.zip',
        },
      }
    );

    // Output the Elastic Beanstalk Environment URL
    new cdk.CfnOutput(this, 'EBEnvironmentURL', {
      value: `http://${ebEnvironment.attrCname}`,
      description: 'Elastic Beanstalk Environment URL',
    });
  }
}

#es6 stack app.js

const cdk = require('aws-cdk-lib');
const { ElasticBeanstalkStack } = require('./stack');

const app = new cdk.App();
new ElasticBeanstalkStack(app, 'MyStack');

#es6 
stack.js

const cdk = require('aws-cdk-lib');
const elasticbeanstalk = require('aws-cdk-lib/aws-elasticbeanstalk');
const sqs = require('aws-cdk-lib/aws-sqs');

class ElasticBeanstalkStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // SQS Queue
    const queue = new sqs.Queue(this, 'MyQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // Elastic Beanstalk Environment
    const ebEnvironment = new elasticbeanstalk.CfnEnvironment(this, 'MyEBEnvironment', {
      applicationName: 'MyEBApplication',
      environmentName: 'MyEBEnvironment',
      solutionStackName: '64bit Amazon Linux 2 v4.4.5 running Node.js',
      optionSettings: [
        {
          namespace: 'aws:elasticbeanstalk:application:environment',
          optionName: 'SQS_QUEUE_URL',
          value: queue.queueUrl,
        },
      ],
    });

    // Elastic Beanstalk Application Version
    const ebApplicationVersion = new elasticbeanstalk.CfnApplicationVersion(
      this,
      'MyEBApplicationVersion',
      {
        applicationName: 'MyEBApplication',
        sourceBundle: {
          s3Bucket: 'your-s3-bucket-for-application-code',
          s3Key: 'path/to/your/application-code.zip',
        },
      }
    );

    // Output the Elastic Beanstalk Environment URL
    new cdk.CfnOutput(this, 'EBEnvironmentURL', {
      value: `http://${ebEnvironment.attrCname}`,
      description: 'Elastic Beanstalk Environment URL',
    });
  }
}

module.exports = { ElasticBeanstalkStack };

#es6 lambda
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, CDK! This is your simple GET endpoint.' }),
  };
};
