# Deployment

Deployment is triggered by Travis upon merging a pull request.
Refer to `Travis.md` for details

The following steps detail the deployment workflow within the Travis Node instance:
1. Dockerfile-prod is used to build production image within the Travis instance
2. Once built, the image is then pushed to ECS, tagged with the current Travis commit SHA
3. Dockerrun.aws.json is updated to specify the current Travis commit SHA to target the current version of codesmith-public-site-react on ECS
4. Dockerrun.aws.json is uploaded to our S3 bucket (there is only one version of this file in the bucket. Newer versions will override the current copy)
5. Our AWS Elastic Beanstalk application and environment will be updated according to the newly created Dockerrun.aws.json, which has a reference to the location of the Docker container in ECS.
