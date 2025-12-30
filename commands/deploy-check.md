# Deploy Check (Pre-Deployment Verification)

Run pre-deployment checks:

## 1. Build Verification
```bash
npm run build
```

## 2. Production Deployment
```bash
# Vercel
npx vercel --prod

# Or your deployment command
npm run deploy
```

## 3. Region/Environment Check (if applicable)
```bash
# Vercel example - verify deployment region
npx vercel inspect <deployment-url> --wait

# AWS example
aws configure get region
```
**Important**: Verify deployment matches your compliance requirements (GDPR, data residency, etc.)

## 4. Post-Deploy Verification
- Check main API endpoints
- Verify legal pages (privacy policy, imprint)
- Test authentication flow

## Success Criteria:
- Build without errors
- Deployment in correct region/environment
- All endpoints reachable
- Compliance requirements met

If region/environment doesn't match requirements: **Stop immediately and warn!**

---
## Origin

Originally developed for [fabrikIQ](https://fabrikiq.com) - AI-powered manufacturing data analysis.
