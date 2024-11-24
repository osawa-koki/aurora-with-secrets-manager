import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';

import NetworkStack from './network/network';
import DatabaseStack from './database/database';
import OutputStack from './output/output';
import { BASE_STACK_NAME } from './const';

dotenv.config();

export class AuroraWithSecretsManagerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const networkStack = new NetworkStack(this, 'NetworkStack', {
      stackName: `${BASE_STACK_NAME}-network`,
    });

    const databaseStack = new DatabaseStack(this, 'DatabaseStack', {
      stackName: `${BASE_STACK_NAME}-database`,
      vpc: networkStack.vpc,
    });

    const secret = databaseStack.aurora.secret!;

    new OutputStack(this, 'OutputStack', {
      stackName: `${BASE_STACK_NAME}-output`,
      secret,
    });
  }
}
