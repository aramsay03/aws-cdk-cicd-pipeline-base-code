import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CDKPipelineStage } from './stage';
import * as config from '../config.json';

export class AwsCodepipelineProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // make const pipeline variable
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: config.cdk_pipeline.pipeline_name,
      selfMutation: true,
      crossAccountKeys: true,
      synth: new ShellStep('Synth', {        
        input: CodePipelineSource.gitHub(`${config.cdk_pipeline.repository_owner}/${config.cdk_pipeline.repository_name}`, config.cdk_pipeline.branch,
        {
          authentication: cdk.SecretValue.secretsManager('github-token', { jsonField: "github-token" }),
        }), // replace this with your github user name and repo name
          commands: ['npm ci',
                    'npm run build',
                    'npx cdk synth']
        }),
    });

    // add the following code snippet to pass the stage

    const testStage = pipeline.addStage(new CDKPipelineStage(this, "test", {
      env: config.environments.test.account            //replace this with your aws-account-id and aws-region
    }));

    testStage.addPost(new ManualApprovalStep('Manaul approval step'));

    const productionStage = pipeline.addStage(new CDKPipelineStage(this, "Prod", {
      env: config.environments.prod.account             //replace this with your aws-account-id and aws-region
    }));
  }
}