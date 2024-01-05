@installing aws cdk
npm install -g aws-cdk
cdk --version

cdk init app --language=typescript

my-cdk-app/
|-- lib/
|   |-- my-stack.js
|   lambda
|   |-- my-lambda.js
|-- cdk.json
|-- package.json

cdk diff
cdk deploy
cdk synth
cdk deploy my-stack (if not in cdk.json)

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

#es6 app hosted by ebs
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, CDK! This is your simple GET endpoint.' }),
  };
};

#sqs and lambda stack for a mail sender used in ebs
const cdk = require('aws-cdk-lib');
const sqs = require('aws-cdk-lib/aws-sqs');
const lambda = require('aws-cdk-lib/aws-lambda');
const events = require('aws-cdk-lib/aws-events');
const targets = require('aws-cdk-lib/aws-events-targets');

class SqsLambdaStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // SQS Queue
    const queue = new sqs.Queue(this, 'MyQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // Lambda Function
    const handler = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda-code'), // Path to your Lambda function code
      environment: {
        SQS_QUEUE_URL: queue.queueUrl,
      },
    });

    // Grant permissions for Lambda to receive messages from SQS
    queue.grantConsumeMessages(handler);

    // Schedule the Lambda function to run every week on Sundays
    new events.Rule(this, 'WeeklySchedule', {
      schedule: events.Schedule.cron({ minute: '0', hour: '0', day: 'SUN' }),
      targets: [new targets.LambdaFunction(handler)],
    });
  }
}

module.exports = { SqsLambdaStack };

#lambda function code
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const sqs = new AWS.SQS();
  const queueUrl = process.env.SQS_QUEUE_URL;

  // Logic to send emails based on messages retrieved from SQS
  // This could involve querying the queue for messages, processing them, and sending emails

  console.log('Lambda function executed successfully.');

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Lambda executed successfully.' }),
  };
};
#elastic beanstalk calling mail queue

const cdk = require('aws-cdk-lib');
const elasticbeanstalk = require('aws-cdk-lib/aws-elasticbeanstalk');
const sqs = require('aws-cdk-lib/aws-sqs');

class ElasticBeanstalkStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // SQS Queue
    const queue = sqs.Queue.fromQueueArn(
      this,
      'MyQueue',
      'arn:aws:sqs:your-region:your-account-id:MyQueue'
    );

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

#ecs-stack.js (CDK Stack for ECS and Lambda):
const cdk = require('aws-cdk-lib');
const ecs = require('aws-cdk-lib/aws-ecs');
const sqs = require('aws-cdk-lib/aws-sqs');
const lambda = require('aws-cdk-lib/aws-lambda');
const events = require('aws-cdk-lib/aws-events');
const targets = require('aws-cdk-lib/aws-events-targets');

class EcsLambdaStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // SQS Queue
    const queue = new sqs.Queue(this, 'MyQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // ECS Cluster
    const cluster = new ecs.Cluster(this, 'MyCluster');

    // ECS Task Definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'MyTaskDefinition');

    // Define your container details here
    const container = taskDefinition.addContainer('MyContainer', {
      //image: ecs.ContainerImage.fromRegistry('your-docker-image'),
      image: ecs.ContainerImage.fromRegistry('php:8.2-cli),
    });

    // ECS Service
    const service = new ecs.FargateService(this, 'MyService', {
      cluster,
      taskDefinition,
    });

    // Lambda Function
    const handler = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'), // Path to your Lambda function code
      environment: {
        ECS_CLUSTER_NAME: cluster.clusterName,
        ECS_SERVICE_NAME: service.serviceName,
        SQS_QUEUE_URL: queue.queueUrl,
      },
    });

    // Grant permissions for Lambda to receive messages from SQS
    queue.grantConsumeMessages(handler);

    // Schedule the Lambda function to run every week on Sundays
    new events.Rule(this, 'WeeklySchedule', {
      schedule: events.Schedule.cron({ minute: '0', hour: '0', day: 'SUN' }),
      targets: [new targets.LambdaFunction(handler)],
    });
  }
}

module.exports = { EcsLambdaStack };


#lambda for this ecs
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const sqs = new AWS.SQS();
  const queueUrl = process.env.SQS_QUEUE_URL;

  // Logic to send emails based on messages retrieved from SQS
  // This could involve querying the queue for messages, processing them, and sending emails

  console.log('Lambda function executed successfully.');

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Lambda executed successfully.' }),
  };
};


@ts syntax:

import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

export class MazCdkEcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
  super(scope, id, props);

  // SQS Queue
  const queue = new sqs.Queue(this, 'MyQueue', {
    visibilityTimeout: cdk.Duration.seconds(300),
  });

  // ECS Cluster
  const cluster = new ecs.Cluster(this, 'MyCluster');

  // ECS Task Definition
  const taskDefinition = new ecs.FargateTaskDefinition(this, 'MyTaskDefinition');

  // Define your container details here
  const container = taskDefinition.addContainer('MyContainer', {
    image: ecs.ContainerImage.fromRegistry('php:8.2-cli'),
  });

  // ECS Service
  const service = new ecs.FargateService(this, 'MyService', {
    cluster,
    taskDefinition,
  });

  // Lambda Function
  const handler = new lambda.Function(this, 'MyLambdaFunction', {
    runtime: lambda.Runtime.NODEJS_14_X,
    handler: 'index.handler',
    code: lambda.Code.fromAsset('lambda-code'), // Path to your Lambda function code
    environment: {
      ECS_CLUSTER_NAME: cluster.clusterName,
      ECS_SERVICE_NAME: service.serviceName,
      SQS_QUEUE_URL: queue.queueUrl,
    },
  });

  // Grant permissions for Lambda to receive messages from SQS
  queue.grantConsumeMessages(handler);

  // Schedule the Lambda function to run every week on Sundays
  new events.Rule(this, 'WeeklySchedule', {
  schedule: events.Schedule.cron({ minute: '0', hour: '0', day: 'SUN' }),
targets: [new targets.LambdaFunction(handler)],
});
}
}

