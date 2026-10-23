# DevOpsFlow - CI/CD Pipeline Demo

A beginner-friendly Node.js project demonstrating automated testing, Docker image building, and publishing through GitHub Actions.

## Technologies

- Node.js
- HTML, CSS, and JavaScript
- Git and GitHub
- GitHub Actions
- Docker
- Docker Hub

## Run Locally

Open CMD inside the project folder and run:

```bat
npm test
node app.js
```

If Chrome does not open automatically, visit:

http://localhost:3000

## Health Check

Open:

http://localhost:3000/api/health

Expected response:

```json
{
  "status": "success",
  "message": "Node.js backend is working!"
}
```

## Build and Run the Docker Image

Make sure Docker Desktop is running.

```bat
docker build -t devopsflow-cicd-demo .
docker run --rm -p 3000:3000 devopsflow-cicd-demo
```

Then visit http://localhost:3000.

## GitHub Actions CI/CD Pipeline

The GitHub Actions workflow automates the following steps:

1. Tests the Node.js application.
2. Builds the Docker image.
3. Logs in to Docker Hub using GitHub repository secrets.
4. Pushes the image to Docker Hub.

### GitHub Secrets

The following repository secrets are configured in GitHub:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

Credentials are stored securely using GitHub Actions secrets and are not included in the source code.

## Docker Hub Image

**Image name:**

`varshithap123/devopsflow-cicd-demo:latest`

**Docker Hub repository:**

https://hub.docker.com/r/varshithap123/devopsflow-cicd-demo

## GitHub Repository

https://github.com/varshith-017/Devops-1st-Task

## Result

The CI/CD pipeline successfully tests the application, builds the Docker image, and publishes it to Docker Hub.

This project demonstrates CI/CD automation. Deploying the application to a live hosting server would require an additional deployment step.

## Security

Never commit passwords, access tokens, or other secrets to the repository. Use GitHub Actions secrets for Docker Hub credentials.
