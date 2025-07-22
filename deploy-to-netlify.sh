#!/bin/bash

# Deploy to Netlify Script
echo "🚀 Preparing Relationship Mojo for Netlify deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git remote add origin <your-repo-url>"
    exit 1
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Fix Netlify deployment issues

- Remove Material UI and framer-motion dependencies causing build errors
- Simplify Button component to use CSS-only animations
- Remove all Material UI imports from components
- Fix deepmerge dependency issue for serverless deployment
- Maintain full assessment functionality with 50 questions
- Use simple, fast HTML/CSS components for better performance"

# Push to repository
echo "⬆️ Pushing to repository..."
git push origin main

echo "✅ Code pushed to repository!"
echo ""
echo "🌐 Next steps:"
echo "1. Go to https://netlify.com and sign in"
echo "2. Click 'Add new site' → 'Import an existing project'"
echo "3. Connect your Git repository"
echo "4. Add environment variables from your .env file"
echo "5. Deploy!"
echo ""
echo "📖 See NETLIFY_DEPLOYMENT.md for detailed instructions"
