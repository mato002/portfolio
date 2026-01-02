# EmailJS Troubleshooting Guide

## Current Configuration
- **Service ID:** `service_b3w5fu1`
- **Template ID:** `template_gn3n04j`
- **Public Key:** `RBLQC1t5BLQc0K7GC`
- **Recipient Email:** `mathiasodhis@gmail.com`

## Common Errors & Solutions

### 1. Check Browser Console (F12)
Open Developer Tools (F12) → Console tab to see detailed error messages.

### 2. Verify EmailJS Library is Loaded
- Check Network tab in DevTools
- Look for `email.min.js` - should show status 200
- If missing, check your internet connection

### 3. Check EmailJS Dashboard
Go to https://dashboard.emailjs.com/ and verify:
- ✅ Service `service_b3w5fu1` is **Active**
- ✅ Template `template_gn3n04j` exists and is **saved**
- ✅ Template contains variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- ✅ Your account has remaining email quota (200/month free)

### 4. Verify Template Variables
Your template MUST include these exact variable names:
- `{{from_name}}`
- `{{from_email}}`
- `{{message}}`
- `{{date}}` (optional)

### 5. Check Service Connection
- Go to EmailJS Dashboard → Email Services
- Click on `service_b3w5fu1`
- Verify it's connected to `mathiasodhis@gmail.com`
- Test the connection if there's a test button

### 6. Common Error Messages

**"Invalid template ID"**
- Template doesn't exist or ID is wrong
- Solution: Verify template ID in EmailJS dashboard

**"Invalid service ID"**
- Service doesn't exist or ID is wrong
- Solution: Verify service ID in EmailJS dashboard

**"Public key is invalid"**
- Public key is incorrect
- Solution: Get correct public key from Account → General

**"Template variables missing"**
- Template expects variables that aren't being sent
- Solution: Check template variables match code

**"Service quota exceeded"**
- You've used all free emails (200/month)
- Solution: Wait for next month or upgrade plan

### 7. Test Steps
1. Open browser console (F12)
2. Fill out contact form
3. Submit form
4. Check console for any errors
5. Check EmailJS Dashboard → Logs for delivery status

### 8. Debug Information
The code now logs:
- EmailJS initialization status
- Data being sent
- Success/error responses
- Detailed error messages

Check browser console for these logs.

## Quick Fix Checklist
- [ ] Cleared browser cache (Ctrl + Shift + R)
- [ ] Verified EmailJS library loads (Network tab)
- [ ] Checked EmailJS dashboard - service is active
- [ ] Checked EmailJS dashboard - template exists
- [ ] Verified template variables match
- [ ] Checked browser console for errors
- [ ] Checked EmailJS dashboard logs

## Still Having Issues?
1. Copy the exact error message from browser console
2. Check EmailJS Dashboard → Logs
3. Verify all IDs are correct
4. Test with a simple template first
