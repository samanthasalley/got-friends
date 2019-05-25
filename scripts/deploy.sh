  echo "Processing deploy.sh"
  # Set EB BUCKET as env variable
  EB_BUCKET=elasticbeanstalk-us-west-2-809870753536
  # Set ECR REPO as env variable NOTE: why?
  ECR_REPO=809870753536.dkr.ecr.us-west-2.amazonaws.com/got-friends
  # Set the default region for aws cli
  aws configure set default.region us-west-2
  # securely log in to ECR
  eval $(aws ecr get-login --no-include-email --region us-west-2)
  docker --version
  # Build docker image based on Dockerfile(-prod)
  # NO SPACES between scopes e.g. scopes-1,scopes-2,scopes-3
  docker build -t samanthasalley/got-friends .
  # tag the image with the Travis-CI SHA
  docker tag samanthasalley/got-friends:latest $ECR_REPO:$TRAVIS_COMMIT
  # Push built image to ECS
  docker push $ECR_REPO:$TRAVIS_COMMIT
  # Use the linux sed command to replace the text '<VERSION>' in our Dockerrun file with the Travis-CI SHA
  sed -i='' "s/<VERSION>/$TRAVIS_COMMIT/" Dockerrun.aws.json
  # Zip modified Dockerrun with any ebextensions
  zip -r got-friends-prod-deploy.zip Dockerrun.aws.json .ebextensions
  # Upload zip file to s3 bucket
  aws s3 cp got-friends-prod-deploy.zip s3://$EB_BUCKET/got-friends-prod-deploy.zip
  # Create a new application version with new Dockerrun
  aws elasticbeanstalk create-application-version --application-name codesmith-auth --version-label $TRAVIS_COMMIT --source-bundle S3Bucket=$EB_BUCKET,S3Key=got-friends-prod-deploy.zip
  # Update environment to use new version number
  aws elasticbeanstalk update-environment --environment-name got-friends-prod --version-label $TRAVIS_COMMIT