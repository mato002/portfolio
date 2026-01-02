# EmailJS Recipient Email Setup Guide

## Error: "The recipients address is empty"

This error means EmailJS doesn't know where to send the email. The recipient email must be configured in your EmailJS Service settings, NOT in the code.

## ✅ How to Fix:

### Step 1: Set Recipient Email in EmailJS Service

1. **Go to EmailJS Dashboard:** https://dashboard.emailjs.com/
2. **Navigate to:** Email Services
3. **Click on your service:** `service_3f1hams`
4. **Click "Edit" or "Settings"**
5. **Find "Default Email" or "To Email" field**
6. **Enter your email:** `matechodhis@gmail.com`
7. **Click "Save"**

### Step 2: Alternative - Set in Template (if service doesn't have option)

1. Go to **Email Templates**
2. Open template: `template_gn3n04j`
3. In the template editor, look for **"To Email"** or **"Recipient"** field
4. Enter: `matechodhis@gmail.com`
5. **Save** the template

### Step 3: Verify Service Connection

1. Make sure your email service (Gmail, etc.) is properly connected
2. In EmailJS Dashboard → Email Services → Your Service
3. Verify connection status is "Connected" or "Active"

### Step 4: Test

1. Submit the contact form again
2. Check your email inbox
3. The error should be resolved

## 📋 What Was Changed:

- **Removed** `to_email` from the code (EmailJS doesn't use this as a variable)
- **Added** `reply_to: email` so you can reply directly to the sender
- Recipient email now must be set in EmailJS Dashboard settings

## 🔍 Where to Set Recipient Email:

### Option A: In Service Settings (Recommended)
- EmailJS Dashboard → Email Services → `service_3f1hams` → Edit → Default Email

### Option B: In Template Settings
- EmailJS Dashboard → Email Templates → `template_gn3n04j` → Settings → To Email

### Option C: In Service Connection
- When you connected your email service, there should be a "To Email" or "Default Recipient" field

## ✅ After Setup:

Once you set the recipient email in EmailJS Dashboard:
1. The form will send emails to `matechodhis@gmail.com`
2. You can reply directly to the sender (reply_to is set)
3. No more "recipients address is empty" error

---

**Important:** The recipient email address should be configured in the EmailJS Dashboard, not in the JavaScript code.
