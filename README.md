# SEC App on Google Cloud

## Introduction

Adapted from this [workshop material](https://github.com/neo4j-partners/hands-on-lab-neo4j-and-vertex-ai). 
This repo deploys the chatbot app into a Cloud Run instance.

## Steps

### Create Neo4j Sandbox instance

TBA.

### Import data

[Notebook](notebook/01_parse_data.ipynb)

### Build and test the app locally.
```shell
cd sec-app

docker build -t <APP-NAME> .

docker run \
--env NEO4J_URI=<NEO4J_URI> \
--env NEO4J_USERNAME=<NEO4J_USERNAME> \
--env NEO4J_PASSWORD=<NEO4J_PASSWORD> \
-dp 8080:8080 <APP-NAME>
```

### Deploy the app

Obviously, the best practice is not to put the credentials as environment variables.
Don't do this on production.

```shell
cd sec-app

gcloud run deploy <APP-NAME> \
--source=./ \
--set-env-vars "NEO4J_URI=<NEO4J_URI>" \
--set-env-vars "NEO4J_USERNAME=<NEO4J_USERNAME>" \
--set-env-vars "NEO4J_PASSWORD=<NEO4J_PASSWORD>"
```
