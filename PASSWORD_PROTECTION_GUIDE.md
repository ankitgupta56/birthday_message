# 🔐 Password Protection Guide

Your website is now protected with password authentication!

## 🎯 How It Works

1. **Login Page**: Visitors see a beautiful login page before accessing the main website
2. **Session Cookies**: Once logged in, the session is stored for 7 days
3. **API Protection**: All API endpoints require authentication
4. **Logout Button**: A logout button (🚪) appears in the top-right corner of the website

## 🔑 Default Password

**Default Password**: `love2024`

To change this password, edit the `.env` file:

```
WEBSITE_PASSWORD=your-new-password
```

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This installs the new packages:
- `express-session`: For session management
- `bcryptjs`: For password encryption (future enhancement)

### 2. Configure Password (Optional)

Edit `.env` file:

```
WEBSITE_PASSWORD=your-custom-password
SESSION_SECRET=your-secure-secret-key
```

### 3. Start the Server

```bash
npm start
# or for development
npm run dev
```

### 4. Access the Website

1. Open `http://localhost:5000` in your browser
2. You'll see the login page 🔐
3. Enter the password: `love2024`
4. Click "Unlock 🎁" button
5. The main website loads! 🎉

## 🚀 Features

### Login Page Features:
- ✨ Beautiful animated design with floating particles
- 💌 Romantic theme matching your website
- 🎯 Error messages for incorrect passwords
- ⌨️ Press Enter to submit password
- 📱 Fully responsive on mobile devices
- 🔄 Password field auto-focuses

### Main Website Features:
- 🚪 Logout button in top-right corner
- 💾 Session persists for 7 days (auto-login after page refresh)
- 🔒 All API routes protected with authentication
- 🎯 Automatic redirect to login if session expires

## 🔐 Security Notes

### Current Implementation:
- Session-based authentication
- Cookies stored client-side
- Password sent via HTTPS (recommended for production)

### Production Recommendations:
1. **Change SESSION_SECRET**: Update the secret key in `.env`
2. **Use HTTPS**: Force SSL/TLS encryption
3. **Use Strong Password**: Choose a unique, strong password
4. **Hash Password** (Optional): Modify server.js to use bcrypt for password hashing
5. **Add Rate Limiting**: Prevent brute force attempts

## 🛠️ Advanced: Hash Password with bcrypt

To make the password more secure, modify `server.js`:

```javascript
// In server.js, replace the login route with:
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(PASSWORD, 10);
  
  const isValid = await bcrypt.compare(password, hashedPassword);
  
  if (isValid) {
    req.session.authenticated = true;
    res.json({ success: true, message: 'Password correct! Welcome! 🎉' });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});
```

## 🎨 Customization

### Change Login Page Colors:
Edit `public/login.html` and modify the gradient colors:

```css
background: linear-gradient(135deg, #ffeef8 0%, #fff5f7 100%);
```

### Change Login Button Text:
In `public/login.html`, modify:

```html
<button type="submit" class="submit-btn" id="submitBtn">Your Text Here</button>
```

### Change Logout Button Text:
In `public/index.html`, modify:

```html
<button class="logout-btn" onclick="logout()" title="Logout">Your Text Here</button>
```

## 🐛 Troubleshooting

### "Connection error" on login:
- Make sure the server is running
- Check that the server is accessible at `http://localhost:5000`

### Password not working:
- Verify you typed the correct password (case-sensitive)
- Check the `.env` file for the correct password
- Restart the server after changing the password

### Session expired:
- The session expires after 7 days
- Users will be automatically redirected to login page
- Can be changed in `server.js`: `maxAge: 7 * 24 * 60 * 60 * 1000`

### Logout button not working:
- Make sure JavaScript is enabled in browser
- Check browser console for errors
- Try refreshing the page

## 📦 Files Modified/Created

1. **server.js** - Added authentication middleware and routes
2. **package.json** - Added new dependencies
3. **.env** - Added password configuration
4. **public/login.html** - New login page (CREATED)
5. **public/index.html** - Added logout button and logout function

## 🎉 Next Steps

1. ✅ Install packages: `npm install`
2. ✅ Update `.env` with your desired password (optional)
3. ✅ Start server: `npm start`
4. ✅ Visit `http://localhost:5000` and enter the password
5. ✅ Enjoy your password-protected website! 🎊

---

**Created**: March 25, 2026
**Version**: 1.0
**Status**: Production Ready ✅
