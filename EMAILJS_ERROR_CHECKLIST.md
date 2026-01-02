# EmailJS Error Troubleshooting Checklist

## Current Configuration:
- **Service ID:** `service_3f1hams`
- **Template ID:** `template_gn3n04j`
- **Public Key:** `RBLQC1t5BLQc0K7GC`

## Error: "Error sending message"

### Step 1: Check Browser Console (F12)
1. Open your portfolio page
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Submit the form
5. Look for error messages starting with ❌ or Error

**Look for:**
- Error Status (400, 401, 404, etc.)
- Error Text or Error Message
- Any configuration errors

### Step 2: Common Error Codes

#### Error 400 - Bad Request
**Cause:** Template variables don't match
**Solution:**
- Check that your template uses: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- Verify variable names match exactly (case-sensitive)

#### Error 401 - Unauthorized
**Cause:** Invalid Public Key
**Solution:**
- Verify Public Key in EmailJS Dashboard → Account → General
- Make sure it matches: `RBLQC1t5BLQc0K7GC`

#### Error 404 - Not Found
**Cause:** Template ID or Service ID doesn't exist
**Solution:**
- Verify Template ID `template_gn3n04j` exists in EmailJS
- Verify Service ID `service_3f1hams` exists in EmailJS
- Check for typos (case-sensitive)

#### Error 413 - Payload Too Large
**Cause:** Message too long
**Solution:**
- Reduce message length

#### Error 429 - Too Many Requests
**Cause:** Rate limit exceeded (free plan: 200 emails/month)
**Solution:**
- Check EmailJS Dashboard → Account for usage
- Wait or upgrade plan

### Step 3: Verify EmailJS Setup

1. **Check Service Status:**
   - EmailJS Dashboard → Email Services
   - Verify `service_3f1hams` is active and connected

2. **Check Template:**
   - EmailJS Dashboard → Email Templates
   - Verify `template_gn3n04j` exists
   - Verify it's saved
   - Check template variables match:
     - `{{from_name}}`
     - `{{from_email}}`
     - `{{message}}`
     - `{{date}}` (optional)

3. **Check Public Key:**
   - EmailJS Dashboard → Account → General
   - Verify Public Key matches

### Step 4: Test EmailJS Configuration

1. Go to EmailJS Dashboard
2. Navigate to your template `template_gn3n04j`
3. Click "Test" or "Send Test Email"
4. See if it works from the dashboard

### Step 5: Check EmailJS Logs

1. Go to EmailJS Dashboard
2. Navigate to **Logs** or **Activity**
3. Check recent attempts
4. Look for error details

### Step 6: Common Issues

#### Issue 1: Template Not Saved
- Open template in EmailJS
- Make sure you clicked **Save**

#### Issue 2: Service Not Connected
- Go to Email Services
- Verify your email service is connected (Gmail, etc.)
- Reconnect if needed

#### Issue 3: Template Variables Wrong
Your template must use these exact names:
```
{{from_name}}
{{from_email}}
{{message}}
{{date}}
```

#### Issue 4: CORS/Browser Issues
- Try different browser
- Clear cache
- Try incognito/private mode

### Step 7: Quick Fixes

1. **Hard Refresh Page:** `Ctrl + F5`
2. **Clear Browser Cache:** `Ctrl + Shift + Delete`
3. **Try Incognito Mode:** Test in private browsing
4. **Check Network Tab:** F12 → Network → Look for failed requests

### What to Share for Help:

1. Error Status (from console)
2. Error Text/Message (from console)
3. EmailJS Dashboard status (service connected?)
4. Template variables used in template
5. Screenshot of console error (if possible)

### Temporary Workaround:

If EmailJS continues to fail, you can:
1. Use the direct email link: `matechodhis@gmail.com`
2. The form shows this as fallback option

---

## Next Steps:
1. Open browser console (F12)
2. Submit form again
3. Copy the error message you see
4. Share the error details with me
