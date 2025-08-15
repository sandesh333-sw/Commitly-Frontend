# Step-by-Step Render Deployment Guide for Commitly

This guide provides detailed steps to deploy your Commitly application on Render.

## Step 1: Commit and Push Your Code

```bash
git commit -m "Add deployment configuration and CI/CD pipeline"
git push origin main
```

## Step 2: Create a Render Account

1. Go to [render.com](https://render.com/) and sign up for an account
2. Verify your email address

## Step 3: Connect Your GitHub Repository

1. In the Render dashboard, click on "New" in the top right
2. Select "Blueprint"
3. Click "Connect account" next to GitHub
4. Authorize Render to access your repositories
5. Find and select your Commitly repository

## Step 4: Deploy Using Blueprint (render.yaml)

1. Render will detect your `render.yaml` file
2. Review the services that will be created:
   - commitly-frontend (Static Site)
   - commitly-backend (Web Service)
   - commitly-db (PostgreSQL)
3. Click "Apply" to create all services

## Step 5: Configure Environment Variables

### For Backend Service:

1. After services are created, go to the commitly-backend service
2. Click on "Environment" in the left sidebar
3. Add these environment variables:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: Generate a secure random string (e.g., `openssl rand -base64 32`)
   - Any other required variables for your backend

### For Frontend Service:

1. Go to the commitly-frontend service
2. Click on "Environment" in the left sidebar
3. Verify `VITE_API_URL` is set to your backend URL
   - It should be: `https://commitly-backend.onrender.com`
   - Update if necessary

## Step 6: Set Up the Database

1. The PostgreSQL database will be created automatically
2. Get the database connection details:
   - Go to the commitly-db service
   - Copy the "Internal Database URL"
3. Run initial migrations:
   - Go to the commitly-backend service
   - Click on "Shell" in the left sidebar
   - Run your migration command (e.g., `npm run migrate`)

## Step 7: Enable Automatic Deployments via GitHub Actions

1. Get your Render API key:
   - Go to your Render account settings (click your avatar → Account Settings)
   - Click on "API Keys" in the left sidebar
   - Create a new API key and copy it

2. Add the API key to GitHub:
   - Go to your GitHub repository
   - Click on "Settings" → "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Name: `RENDER_API_KEY`
   - Value: Paste your Render API key
   - Click "Add secret"

3. Get your Render service ID:
   - Go to your frontend service in Render
   - The service ID is in the URL: `https://dashboard.render.com/static/srv-XXXXXXXXXXXX`
   - Copy the `srv-XXXXXXXXXXXX` part

4. Update the GitHub workflow file:
   - Edit `.github/workflows/frontend-ci-cd.yml`
   - Replace `YOUR_SERVICE_ID` with your actual service ID
   - Commit and push the changes

## Step 8: Verify Deployment

1. Wait for all services to show "Live" status (this may take a few minutes)
2. Click on the frontend service URL to access your application
3. Test the application functionality:
   - User authentication
   - API connectivity
   - Database operations

## Step 9: Set Up Custom Domain (Optional)

1. Go to your frontend service
2. Click on "Settings" in the left sidebar
3. Under "Custom Domain", click "Add Custom Domain"
4. Follow the instructions to configure your domain

## Step 10: Monitor Your Application

1. Go to each service in Render
2. Click on "Logs" to view application logs
3. Set up alerts (if needed):
   - Go to service settings
   - Click on "Alerts" in the left sidebar
   - Configure alerts for outages or high resource usage

## Troubleshooting Common Issues

### Frontend Can't Connect to Backend
- Check that `VITE_API_URL` is set correctly
- Ensure your backend service is running
- Check CORS configuration in your backend code

### Database Connection Issues
- Verify the database connection string
- Check that your backend service has the correct environment variables
- Ensure your database migrations have run successfully

### Build Failures
- Check the build logs in Render
- Ensure all dependencies are correctly specified in package.json
- Verify that your start command is correct

### Deployment Not Triggering from GitHub Actions
- Check that the service ID is correct in the workflow file
- Verify the API key is correctly set in GitHub secrets
- Check the GitHub Actions workflow run logs for errors
