import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';

interface OutputStackProps extends cdk.StackProps {
  stackName: string;
  secret: ISecret;
}

export default class OutputStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: OutputStackProps) {
    const { stackName, secret } = props;

    super(scope, id, {
      ...props,
      stackName,
    });

    new cdk.CfnOutput(this, 'AuroraSecretName', {
      value: secret.secretName,
    });
  }
}
