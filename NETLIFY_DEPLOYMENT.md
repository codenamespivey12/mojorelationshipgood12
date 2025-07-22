# Netlify Deployment Guide for Relationship Mojo

This guide will help you deploy your Relationship Mojo application to Netlify.

## Prerequisites

1. A Netlify account (free tier is sufficient for testing)
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Environment variables from your `.env` file

## Step 1: Prepare Your Repository

Make sure your project is committed and pushed to your Git repository:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your `relationshipmojo` repository

## Step 3: Configure Build Settings

Netlify should automatically detect the settings from `netlify.toml`, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `build/client`
- **Functions directory**: `netlify/functions`

## Step 4: Set Environment Variables

In your Netlify site dashboard, go to **Site settings** → **Environment variables** and add:

### Required Environment Variables

```
DATABASE_URL=postgresql://neondb_owner:npg_XWM8qkREcp3O@ep-little-paper-aeifvyce-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

CLERK_PUBLISHABLE_KEY=pk_test_aGVscGZ1bC1jaWNhZGEtMi5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_jN5xhXIPakVPigT2ZUETiUIpDLLfy4y5snpWp6R1O9
CLERK_SIGN_IN_URL=https://helpful-cicada-2.accounts.dev/sign-in
CLERK_SIGN_UP_URL=https://helpful-cicada-2.accounts.dev/sign-up
CLERK_AFTER_SIGN_IN_URL=/dashboard
CLERK_AFTER_SIGN_UP_URL=/assessment/intro

OPENAI_API_KEY=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
XAI_API_KEY=xai-HUqKF5M4tyXAGd81HATtoTQo0k12HYqjUatjy0KjGPzX2dcKLWAzOI92mcgql12vPNCSXLowiB9F4MiQ
GOOGLE_AI_API_KEY=AIzaSyAUMSG67lNdqrgnmhX-SpaRvFpyR6mcz8Y

NODE_ENV=production
```

## Step 5: Deploy

1. Click "Deploy site" in Netlify
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be available at a random Netlify URL like `https://amazing-name-123456.netlify.app`

## Step 6: Custom Domain (Optional)

1. In your site dashboard, go to **Domain settings**
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS

## Troubleshooting

### Common Issues

1. **Build fails with "Cannot find module"**
   - Make sure all dependencies are in `package.json`
   - Try clearing the build cache in Netlify

2. **Environment variables not working**
   - Double-check variable names (case-sensitive)
   - Make sure there are no extra spaces
   - Redeploy after adding variables

3. **Functions not working**
   - Check that `netlify/functions/server.ts` exists
   - Verify the build command includes the postbuild step

4. **Database connection issues**
   - Ensure your Neon database allows connections from Netlify
   - Check that the DATABASE_URL is correct

### Build Logs

If deployment fails, check the build logs in Netlify:
1. Go to your site dashboard
2. Click on the failed deploy
3. Check the "Deploy log" for error messages

## Testing Your Deployment

Once deployed, test these key features:

1. **Homepage**: Should load without errors
2. **Assessment Flow**: Navigate to `/assessment/section/1`
3. **Question Navigation**: Test previous/next buttons
4. **All Question Types**: Test multiple choice, free text, yes/no
5. **Section Navigation**: Test moving between sections
6. **Responsive Design**: Test on mobile and desktop

## Performance Optimization

For better performance on Netlify:

1. **Enable Asset Optimization**
   - Go to Site settings → Build & deploy → Post processing
   - Enable "Bundle CSS" and "Minify CSS and JS"

2. **Configure Caching**
   - The `netlify.toml` file already includes cache headers
   - Static assets will be cached for 1 year

3. **Monitor Performance**
   - Use Netlify Analytics to monitor site performance
   - Check Core Web Vitals in the dashboard

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to Git
2. **API Keys**: Rotate keys regularly
3. **HTTPS**: Netlify provides free SSL certificates
4. **Headers**: Security headers are configured in `netlify.toml`

## Updating Your Site

To update your deployed site:

1. Make changes locally
2. Commit and push to your repository
3. Netlify will automatically rebuild and deploy

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Remix on Netlify Guide](https://docs.netlify.com/integrations/frameworks/remix/)
- [Netlify Community Forum](https://community.netlify.com/)

---

Your Relationship Mojo app should now be successfully deployed on Netlify! 🎉
