# Continuous Integration

## On Pull Request and Push events

Travis will run the following tasks:
1. Run npm install in its local environment
2. Run build:dev script to build the bundle
3. Run the test suite


## On Merge events

A GitHub Merge will trigger actions defined for deployment:
1. Travis will run the same tasks as PR/Push
2. After npm test passes, before_deploy tasks are run
  - AWS CLI and AWSEB CLI are installed in anticipation for the deploy script
3. Deploy tasks are run (only if this merge is performed on master branch)
  - deploy.sh script is run. For more details, refer to `Deployment.md`
