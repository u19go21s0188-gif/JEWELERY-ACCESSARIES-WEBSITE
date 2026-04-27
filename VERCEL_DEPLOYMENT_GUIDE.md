# Vercel Deployment Guide - Maison Émeraude

This guide provides step-by-step instructions to deploy your jewelry e-commerce platform to Vercel.

## ✅ Pre-Deployment Checklist

- ✅ Git repository initialized
- ✅ All code committed to git
- ✅ Production build tested successfully
- ✅ Environment variables configured
- ✅ Supabase project configured
- ✅ Database migrations applied
- ✅ Admin account creation ready

## 🚀 Deployment Steps

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New Repository"
3. Repository name: `jewelry-ecommerce` (or your preferred name)
4. Choose "Public" or "Private"
5. Click "Create repository"

### Step 2: Push Code to GitHub

In your terminal, run these commands:

```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/jewelry-ecommerce.git

# Rename branch to main
git branch -M main

# Push code to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" or "Log in" (sign up with GitHub for easier integration)
3. Click "New Project"
4. Click "Import Git Repository"
5. Select your newly created GitHub repository
6. Click "Import"

### Step 4: Configure Environment Variables in Vercel

In the Vercel dashboard, before deploying:

1. Go to "Environment Variables" section
2. Add the following variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_SUPABASE_URL` | `https://lyseweefepvnkawfiafw.supabase.co` | Your Supabase project URL |
| `VITE_SUPABASE_PROJECT_ID` | `lyseweefepvnkawfiafw` | Your Supabase project ID |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Your public Supabase key |
| `SUPABASE_URL` | `https://lyseweefepvnkawfiafw.supabase.co` | Same as VITE_SUPABASE_URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Your service role key (KEEP SECRET) |
| `ADMIN_SIGNUP_CODE` | `DYqzWhvC7WAVQvU` | Secret admin signup code |

> ⚠️ **Important**: The `SUPABASE_SERVICE_ROLE_KEY` is sensitive. Only add it to Vercel (never commit to git).

### Step 5: Deploy

1. Review the build settings (should auto-detect):
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

2. Click "Deploy"
3. Wait for deployment to complete (usually 2-3 minutes)
4. You'll receive a URL like: `https://your-project.vercel.app`

## 🔄 Post-Deployment Steps

### 1. Verify Deployment

```bash
# Visit your Vercel URL in browser
https://your-project.vercel.app
```

Test these features:
- ✅ Homepage loads with products
- ✅ Category navigation works
- ✅ Product cards display correctly
- ✅ WhatsApp order integration works

### 2. Test Admin Panel

1. Navigate to: `https://your-project.vercel.app/auth`
2. Create admin account using signup code: `DYqzWhvC7WAVQvU`
3. Access admin dashboard: `https://your-project.vercel.app/admin`
4. Test:
   - ✅ Dashboard loads
   - ✅ Products page accessible
   - ✅ Orders visible
   - ✅ Can add/edit categories

### 3. Configure Custom Domain (Optional)

1. In Vercel dashboard, go to "Settings"
2. Click "Domains"
3. Enter your custom domain
4. Follow DNS configuration instructions from your domain registrar
5. Update Supabase CORS settings to include your domain

### 4. Update Supabase CORS Settings

To prevent CORS errors:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Add your Vercel URL to "Allowed origins":
   - `https://your-project.vercel.app`
   - `https://your-custom-domain.com` (if using custom domain)

## 🛠️ Troubleshooting

### Build Fails on Vercel

**Issue**: Build succeeds locally but fails on Vercel

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set correctly
3. Verify Node version compatibility (should use Node 18+)
4. Clear cache: Settings → Deployments → Clear cache and redeploy

### CORS Errors

**Issue**: "CORS policy: The request doesn't have required..." error

**Solution**:
1. Add Vercel URL to Supabase allowed origins
2. Check that `VITE_SUPABASE_URL` is correct
3. Verify Supabase project is active and running

### Admin Login Issues

**Issue**: Cannot create admin account or login

**Solution**:
1. Verify `ADMIN_SIGNUP_CODE` is set correctly in Vercel
2. Check Supabase authentication is enabled
3. Ensure user is created in Supabase Auth
4. Check browser console for detailed error messages

### WhatsApp Integration Not Working

**Issue**: "Order on WhatsApp" button not responding

**Solution**:
1. Verify product phone number is in correct format
2. Check WhatsApp integration in `src/lib/whatsapp.ts`
3. Test with a valid phone number
4. Check browser console for errors

## 📊 Monitoring Deployment

### Vercel Dashboard
- **Deployments**: View all deployment history
- **Logs**: Check build and runtime logs
- **Analytics**: Monitor performance and usage
- **Environment**: Manage variables and secrets

### Supabase Dashboard
- **Logs**: Database and API activity
- **Realtime**: Monitor live subscriptions
- **Auth**: User accounts and sessions
- **Database**: Table structure and data

## 🔐 Security Best Practices

1. **Never commit secrets** - Keep `.env` file local only
2. **Use Vercel secrets** for sensitive keys
3. **Enable branch protection** on GitHub
4. **Review deployments** before production
5. **Monitor Supabase logs** for suspicious activity
6. **Rotate keys regularly** if needed
7. **Use strong admin signup code** (change from default)

## 🚀 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update: description"
git push origin main

# Vercel automatically builds and deploys
# Check status at: https://vercel.com/dashboard
```

## 📈 Performance Optimization

Your deployment includes:
- ✅ Automatic HTTPS
- ✅ Global CDN distribution
- ✅ Image optimization
- ✅ Code splitting
- ✅ Edge caching
- ✅ Serverless functions

## 💡 Tips for Success

1. **Test before pushing**: Run `npm run build && npm run preview` locally
2. **Use proper commit messages**: Makes deployment history clear
3. **Keep environment variables secret**: Never share `.env` files
4. **Monitor analytics**: Check Vercel dashboard regularly
5. **Update dependencies**: Keep packages current for security
6. **Backup database**: Regular Supabase backups are recommended

## 📞 Getting Help

- **Vercel Support**: https://vercel.com/support
- **Supabase Docs**: https://supabase.com/docs
- **TanStack Docs**: https://tanstack.com/start
- **GitHub Issues**: Check repository for known issues

## ✨ Deployment Complete!

Your Maison Émeraude jewelry e-commerce platform is now live! 🎉

**Dashboard**: https://vercel.com/dashboard
**Site**: https://your-project.vercel.app
**Admin**: https://your-project.vercel.app/admin

---

**Last Updated**: April 27, 2026
**Status**: Production Ready ✅
