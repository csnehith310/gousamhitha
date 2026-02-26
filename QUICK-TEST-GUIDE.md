# Quick Test Guide - SPA Version

## 🚀 Quick Start

1. **Start server:**
   ```bash
   start-frontend.bat
   ```

2. **Open SPA:**
   ```
   http://localhost:8000/main.html
   ```

3. **Test navigation - Click these in order:**
   - Home
   - Shop
   - About
   - Gowshala
   - Contact
   - Cart
   - Orders (requires login)
   - Profile (requires login)

## ✅ What to Verify

### Navigation Test (2 minutes)
- [ ] Click each nav link
- [ ] Page content changes instantly
- [ ] No white flash/reload
- [ ] URL shows #pagename
- [ ] Browser back button works

### Functionality Test (5 minutes)
- [ ] Click "Shop Now" button on home
- [ ] Browse products on shop page
- [ ] Add product to cart
- [ ] Cart count increases
- [ ] View cart page
- [ ] Proceed to checkout
- [ ] Fill checkout form
- [ ] Complete order

### Auth Test (3 minutes)
- [ ] Click profile icon
- [ ] Login modal opens
- [ ] Login with credentials
- [ ] Profile dropdown appears
- [ ] Click "My Orders"
- [ ] Orders page loads
- [ ] Click "My Profile"
- [ ] Profile page loads

## 🎯 Success Criteria

If ALL these work, SPA is successful:
- ✅ Navigation is instant (no reload)
- ✅ All pages load correctly
- ✅ Cart system works
- ✅ Checkout works
- ✅ Orders display
- ✅ Login/auth works
- ✅ No console errors

## ❌ If Something Breaks

1. **Check console (F12)**
   - Look for red errors
   - Note which page/action caused it

2. **Use fallback**
   - Open original: `http://localhost:8000/index.html`
   - Original files still work normally

3. **Report issue**
   - Which page?
   - What action?
   - Error message?

## 📊 Comparison

### Test Both Versions:

**Original (index.html):**
- Click Shop → Full page reload
- Click About → Full page reload
- Notice the white flash

**SPA (main.html):**
- Click Shop → Instant, no reload
- Click About → Instant, no reload
- Smooth experience

## 🔧 Quick Fixes

### Products don't load on shop page
- Check console for errors
- Verify Supabase is connected
- Try refreshing page

### Cart is empty
- Add products from shop page first
- Check cart count in navbar

### Can't login
- Use existing credentials
- Or create new account
- Check console for errors

### Page shows "Loading..."
- Check internet connection
- Verify /pages/public/ folder exists
- Check browser console

## 📱 Mobile Test

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device
4. Test navigation
5. Verify responsive design

## ⏱️ Performance Check

**Before (Multi-page):**
- Time how long it takes to navigate
- Notice the page reload

**After (SPA):**
- Navigation should be instant
- No visible loading

## 🎉 Success!

If everything works:
- ✅ SPA migration successful
- ✅ Ready for Phase 2 (admin pages)
- ✅ Can proceed with full deployment

## 📞 Need Help?

Check these files:
- SPA-COMPLETE.md - Full documentation
- TEST-SPA.md - Detailed testing guide
- SPA-MIGRATION-STATUS.md - Migration details

---

**Quick test should take ~10 minutes**
**If all tests pass, SPA is ready! 🎉**
