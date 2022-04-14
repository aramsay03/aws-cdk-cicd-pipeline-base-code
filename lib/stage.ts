import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApplicationStack } from './aws-cdk-application-stack';

export class CDKPipelineStage extends cdk.Stage{
    constructor(scope: Construct, stageName: string, props?: cdk.StageProps){
        super(scope, stageName, props);
        const lambdastack = new ApplicationStack(this, 'LambdaStack', stageName);
    }
}