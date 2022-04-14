import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code, FunctionBase } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class ApplicationStack extends cdk.Stack{
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps){
        super(scope, id, props);

        // Build project stack here (Add in assets like Amplify, DynamoDB, Lambdas, API Gateways etc.)

        new Function(this, 'LambdaFunction', {
            runtime: Runtime.NODEJS_12_X, 
            handler: 'handler.handler',
            code: Code.fromAsset(path.join(__dirname, 'lambda')),
            environment: {"stageName" : stageName}
        });

    }
}


