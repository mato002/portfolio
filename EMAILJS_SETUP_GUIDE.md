# EmailJS Template Setup Guide

## Step 1: Create EmailJS Account (if you don't have one)
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)

## Step 2: Add Email Service
1. In EmailJS Dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. **Copy your Service ID** (e.g., `service_xxxxx`)

## Step 3: Create Email Template
1. Go to **Email Templates** in dashboard
2. Click **Create New Template**
3. Use the template below:

### Template Settings:
- **Template Name**: Portfolio Contact Form
- **Subject**: New Contact Form Submission from Portfolio

### Template Content (HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #ff004f, #ff6b6b);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: bold;
            color: #ff004f;
            display: block;
            margin-bottom: 5px;
        }
        .field-value {
            background: white;
            padding: 12px;
            border-radius: 5px;
            border-left: 3px solid #ff004f;
        }
        .message-box {
            background: white;
            padding: 15px;
            border-radius: 5px;
            border-left: 3px solid #ff004f;
            white-space: pre-wrap;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>New Contact Form Submission</h2>
        <p>You received a new message from your portfolio website</p>
    </div>
    
    <div class="content">
        <div class="field">
            <span class="field-label">From Name:</span>
            <div class="field-value">{{from_name}}</div>
        </div>
        
        <div class="field">
            <span class="field-label">Email Address:</span>
            <div class="field-value">{{from_email}}</div>
        </div>
        
        <div class="field">
            <span class="field-label">Message:</span>
            <div class="message-box">{{message}}</div>
        </div>
        
        <div class="field">
            <span class="field-label">Submitted At:</span>
            <div class="field-value">{{date}}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>This email was sent from your portfolio contact form.</p>
        <p>Reply directly to: {{from_email}}</p>
    </div>
</body>
</html>
```

## Step 4: Template Variables
Make sure these variables are in your template (they're already included above):
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email (for reply)
- `{{message}}` - The message content
- `{{date}}` - Submission date (optional)

## Step 5: Save Template
1. Click **Save** in EmailJS template editor
2. **Copy your Template ID** (e.g., `template_xxxxx`)

## Step 6: Get Public Key
1. Go to **Account** → **General** in EmailJS dashboard
2. Find **Public Key**
3. **Copy your Public Key** (e.g., `xxxxxxxxxxxxxxx`)

## Step 7: Update Portfolio Code
After you have all three values:
1. Service ID
2. Template ID
3. Public Key

Share them with me and I'll update your portfolio code!

---

## Quick Test Template (Simple Version)
If you want a simpler template, use this:

**Subject:** New Message from Portfolio Contact Form

**Content:**
```
Hello,

You received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Reply to: {{from_email}}
```
