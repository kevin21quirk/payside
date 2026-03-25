# Zapier Setup Instructions for PaySide Contact Form

This document explains how to set up Zapier to handle contact form submissions and send emails to support@paysidesolutions.com.

## Prerequisites

- Zapier account (free or paid)
- Access to support@paysidesolutions.com email (hosted on Fasthosts.co.uk)

## Step-by-Step Setup

### 1. Create a New Zap in Zapier

1. Log in to your Zapier account at https://zapier.com
2. Click **"Create Zap"** button
3. Name your Zap: "PaySide Contact Form to Email"

### 2. Set Up the Trigger (Webhooks by Zapier)

1. **Choose App & Event:**
   - Search for and select **"Webhooks by Zapier"**
   - Choose event: **"Catch Hook"**
   - Click **Continue**

2. **Set Up Trigger:**
   - Leave "Pick off a Child Key" blank
   - Click **Continue**

3. **Copy Your Webhook URL:**
   - Zapier will generate a unique webhook URL
   - It will look like: `https://hooks.zapier.com/hooks/catch/XXXXXX/XXXXXX/`
   - **IMPORTANT:** Copy this URL - you'll need it in the next step

### 3. Update Your Website Code

1. Open the file: `script.js` in your PaySide project
2. Find this line (around line 312):
   ```javascript
   const zapierWebhookUrl = 'YOUR_ZAPIER_WEBHOOK_URL_HERE';
   ```
3. Replace `'YOUR_ZAPIER_WEBHOOK_URL_HERE'` with your actual Zapier webhook URL
4. Save the file
5. Commit and push to GitHub:
   ```bash
   git add script.js
   git commit -m "Add Zapier webhook URL"
   git push origin main
   ```

### 4. Test the Webhook

1. Go to your live website: https://your-vercel-domain.vercel.app/contact.html
2. Fill out the contact form with test data
3. Submit the form
4. Go back to Zapier and click **"Test trigger"**
5. You should see your test form data appear in Zapier
6. Click **Continue**

### 5. Set Up the Action (Email)

1. **Choose App & Event:**
   - Search for and select **"Email by Zapier"**
   - Choose event: **"Send Outbound Email"**
   - Click **Continue**

2. **Set Up Action:**
   - **To:** `support@paysidesolutions.com`
   - **From Name:** `PaySide Contact Form`
   - **From Email:** Use your Zapier email or a verified email
   - **Reply To:** Click the field and select `Email` from the webhook data
   - **Subject:** `New Contact Form Submission - PaySide Solutions`
   - **Body:** Create a formatted email body using the webhook data:

   ```
   New contact form submission from PaySide Solutions website:

   USER TYPE: {{userType}}
   
   CONTACT INFORMATION:
   Name: {{firstName}} {{lastName}}
   Email: {{email}}
   Phone: {{phone}}
   
   COMPANY DETAILS (if agency):
   Company: {{company}}
   Number of Employees: {{employees}}
   Service Interest: {{service}}
   
   CONTRACTOR DETAILS (if contractor):
   Rate of Pay: {{rateOfPay}}
   
   MESSAGE:
   {{message}}
   
   ---
   Submitted: {{timestamp}}
   Source: {{source}}
   ```

3. Click **Continue**

### 6. Test the Action

1. Click **"Test action"**
2. Zapier will send a test email to support@paysidesolutions.com
3. Check your email inbox to confirm receipt
4. Click **Continue**

### 7. Publish Your Zap

1. Review your Zap settings
2. Click **"Publish"** or **"Turn on Zap"**
3. Your Zap is now live!

## How It Works

1. User fills out contact form on your website
2. JavaScript sends form data to Zapier webhook
3. Zapier receives the data
4. Zapier formats and sends email to support@paysidesolutions.com
5. User is redirected to thank-you page

## Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify webhook URL is correct in script.js
- Ensure Zap is turned on in Zapier

### Not receiving emails
- Check spam folder
- Verify email address in Zapier action
- Check Zapier task history for errors
- Ensure Zap is published and turned on

### Webhook not catching data
- Submit a test form
- Check Zapier task history
- Verify webhook URL matches in script.js

## Zapier Limits

**Free Plan:**
- 100 tasks/month
- Single-step Zaps
- 15-minute update time

**Paid Plans:**
- More tasks per month
- Multi-step Zaps
- Faster update times
- Premium apps

For a contact form, the free plan should be sufficient for most small businesses.

## Alternative: Using Email by Zapier with Fasthosts

If you want emails to come from your Fasthosts email:

1. In Zapier, you can use **"Gmail"** or **"Email by Zapier"**
2. For Fasthosts SMTP, you may need to use **"SMTP by Zapier"** (Premium)
3. Or keep using **"Email by Zapier"** which works fine for notifications

## Support

For Zapier support: https://help.zapier.com
For PaySide website issues: Contact your developer
