
# DevOpsFlow - CI/CD Pipeline Demo

A beginner-friendly Node.js project for learning automated testing,
Docker image building, and publishing through GitHub Actions.

## Technologies

- Node.js
- HTML, CSS and JavaScript
- Git and GitHub
- GitHub Actions
- Docker
- Docker Hub

## Run locally

Open CMD inside the project folder and run:

```bat
npm test
node app.js
```

On Windows, Chrome should open automatically.

If it does not open, visit:

http://localhost:3000

## Health check

Open this URL:

http://localhost:3000/api/health

Expected response:

```json
{
  "status": "success",
  "message": "Node.js backend is working!"
}
```

## Build the Docker image

Make sure Docker Desktop is running:

```bat
docker build -t nodejs-demo-app .
docker run --rm -p 3000:3000 nodejs-demo-app
```

Then visit http://localhost:3000.

## GitHub Actions setup

1. Create a Docker Hub repository named nodejs-demo-app.
2. Create a Docker Hub access token.
3. Open your GitHub repository's Settings.
4. Go to Secrets and variables, then Actions.
5. Add these repository secrets:

   - DOCKERHUB_USERNAME
   - DOCKERHUB_TOKEN

6. Push the project to the main branch.
7. Open the Actions tab and inspect the workflow.

The workflow tests the application, builds a Docker image,
and pushes the image to Docker Hub.

Image name:

YOUR_DOCKERHUB_USERNAME/nodejs-demo-app:latest

This workflow publishes a Docker image. Deploying to a live
hosting server requires an additional deployment step.

## Security

Never commit passwords or access tokens to your repository.
Use GitHub Actions secrets for Docker Hub credentials.
