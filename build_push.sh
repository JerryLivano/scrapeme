#!/bin/bash
IMAGE_NAME="JerryLivano/scrapeme"
DEFAULT_TAG="latest"

echo "Select the environment:"
echo "1. Staging"
echo "2. Production"
read -p "Enter 1 or 2: " ENV_OPTION

if [ "$ENV_OPTION" == "1" ]; then
  ENVIRONMENT="staging"
  IMAGE_TAG="$DEFAULT_TAG"
  DOCKERFILE_PATH="./Dockerfile.stg"
elif [ "$ENV_OPTION" == "2" ]; then
  ENVIRONMENT="production"
  read -p "Enter the custom tag (default is $DEFAULT_TAG): " CUSTOM_TAG
  IMAGE_TAG=${CUSTOM_TAG:-$DEFAULT_TAG}
  DOCKERFILE_PATH="./Dockerfile"
else
  echo "Invalid option. Please enter 1 or 2."
  exit 1
fi

docker build -t $IMAGE_NAME:$IMAGE_TAG -f $DOCKERFILE_PATH $BUILD_ARGS .

docker push $IMAGE_NAME:$IMAGE_TAG

docker rmi $IMAGE_NAME:$IMAGE_TAG