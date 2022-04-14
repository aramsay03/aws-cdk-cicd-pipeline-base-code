#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCodepipelineProjectStack } from '../lib/aws-codepipeline-project-stack';
import * as config from '../config.json';

const app = new cdk.App();
new AwsCodepipelineProjectStack(app, 'AwsCodepipelineProjectStack', {

  // to create a new isntance of the class AwsCdkCodePipelineStack. This class is defined in lib directory
  // it is this section wehere we can all the details of the cdk pipeline
  
  env: config.cdk_pipeline.build_environment,

});