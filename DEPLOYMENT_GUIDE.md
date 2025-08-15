# Commitly Deployment Guide for Render

This guide will walk you through deploying the Commitly application (both frontend and backend) on Render.

## Prerequisites

1. A GitHub account with your Commitly repository
2. A Render account (sign up at [render.com](https://render.com))
3. Your database credentials (if using an external database)

## Deployment Steps

### 1. Connect Your GitHub Repository to Render

1. Log in to your Render dashboard
2. Click on "New" and select "Blueprint"
3. Connect your GitHub account if you haven't already
4. Select your Commitly repository
5. Render will detect the `render.yaml` file and show you the resources to be created
6. Click "Apply" to create the services

### 2. Configure Environment Variables

After your services are created, you'll need to set up some environment variables:

1. **Backend Service**:
   - Navigate to your backend service in the Render dashboard
   - Go to "Environment" tab
   - Add the following environment variables:
     - `JWT_SECRET`: A secure random string for JWT token signing
     - Any other environment variables your backend needs

2. **Frontend Service**:
   - Navigate to your frontend service
   - Go to "Environment" tab
   - Verify `VITE_API_URL` is set to your backend URL (should be automatically set)

### 3. Database Setup

If you're using the Postgres service defined in the render.yaml:

1. The database will be automatically created
2. The connection string will be automatically injected into your backend service
3. You may need to run migrations manually the first time:
   - Go to your backend service's "Shell" tab
   - Run your migration command (e.g., `npm run migrate`)

### 4. Verify Deployment

1. Wait for all services to show "Live" status
2. Click on the frontend service URL to access your application
3. Test key functionality to ensure everything is working

### 5. Set Up CI/CD with GitHub Actions

The repository includes a GitHub Actions workflow that will:

1. Build and test your frontend code on every push to main
2. Deploy to Render automatically when tests pass

To enable automatic deployment from GitHub Actions:

1. Get your Render API key from your Render account settings
2. Add it as a GitHub repository secret named `RENDER_API_KEY`
3. Update the service ID in `.github/workflows/frontend-ci-cd.yml`:
   - Find the line with `curl -X POST https://api.render.com/deploy/srv-YOUR_SERVICE_ID`
   - Replace `YOUR_SERVICE_ID` with your actual Render service ID (found in the service settings)

## Troubleshooting

### Frontend Not Loading API Data
- Check that `VITE_API_URL` is correctly set
- Verify CORS is properly configured on your backend

### Database Connection Issues
- Check that your database is running
- Verify connection string is correct
- Check network access rules

### Deployment Failures
- Check build logs in Render dashboard
- Ensure all dependencies are correctly specified in package.json
- Verify that your start command is correct

## Scaling (Future Considerations)

As your application grows:

1. Upgrade your database plan for more storage and connections
2. Add a Redis service for caching and session management
3. Configure auto-scaling for your web services

## Support

If you encounter issues with Render deployment, consult:
- [Render Documentation](https://render.com/docs)
- [Render Support](https://render.com/support)
