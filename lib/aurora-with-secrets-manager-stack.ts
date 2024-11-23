import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import NetworkStack from './network/network';
import { BASE_STACK_NAME } from './const';

export class AuroraWithSecretsManagerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new NetworkStack(this, 'NetworkStack', {
      stackName: `${BASE_STACK_NAME}-network`,
    });
  }
}
