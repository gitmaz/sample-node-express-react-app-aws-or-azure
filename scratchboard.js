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
