# OJS Integration Summary - AJVS Website

## ✅ What Was Done

### Infrastructure Prepared

1. **Configuration System Created**
   - `src/config/ojs.ts` - Central OJS URL configuration
   - Environment variable support via `VITE_OJS_URL`
   - Easy to update when OJS is installed

2. **User Interface Components**
   - `src/components/ojs/OJSRedirectNotice.tsx` - Informative redirect screens
   - `src/components/ojs/OJSExternalLink.tsx` - Reusable external link buttons
   - Clear messaging about external OJS system

3. **Navigation Updates**
   - Submit Manuscript page now shows OJS redirect notice
   - Header links prepared for OJS integration
   - External link icons added for clarity

4. **Documentation Created**
   - `README.md` - Updated with OJS integration info
   - `OJS_INTEGRATION_GUIDE.md` - Comprehensive setup guide
   - `README_OJS_SETUP.md` - Quick start guide
   - `DEPLOYMENT_CHECKLIST.md` - Step-by-step deployment tasks
   - `.env.example` - Environment variable template

## 🎯 Current State

### What Works Now
✅ Public browsing of articles and issues  
✅ Responsive, professional design  
✅ User authentication (for React site)  
✅ Admin dashboard for content management  
✅ Payment processing infrastructure  
✅ Editorial board display  
✅ Archives and current issue pages  

### What Redirects to OJS
🔗 Manuscript submission  
🔗 Author dashboard (when implemented)  
🔗 Reviewer dashboard (when implemented)  
🔗 Editor workflow (when implemented)  

## 📋 Your Next Steps

### Immediate (Before OJS Installation)
1. Review the documentation created
2. Plan your OJS hosting infrastructure
3. Decide on server/hosting provider for OJS

### After OJS Installation
1. **Configure OJS URL**
   ```bash
   # Add to your .env file or update src/config/ojs.ts
   VITE_OJS_URL=https://your-ojs-installation.org
   ```

2. **Verify OJS Routes**
   - Check that OJS paths match configuration
   - Test submission URL works
   - Verify login/registration URLs

3. **Test Integration**
   - Click "Submit Manuscript" on React site
   - Confirm redirect to OJS works
   - Test complete submission in OJS
   - Verify editorial workflows in OJS

4. **Publish First Article**
   - Publish article in OJS
   - Add article metadata to React admin
   - Upload PDF and verify display
   - Test public viewing

### Ongoing Maintenance
- Sync published articles from OJS to React site
- Keep issue information synchronized
- Monitor both systems for errors
- Update content as needed

## 🔧 Integration Points

### Files That Link to OJS
- `src/pages/SubmitManuscript.tsx` - Main submission redirect
- `src/components/layout/Header.tsx` - Navigation links
- `src/config/ojs.ts` - OJS URL configuration

### Files That Display OJS Content
- `src/pages/CurrentIssue.tsx` - Shows published articles
- `src/pages/Archives.tsx` - Shows all issues
- Admin dashboard - Manages displayed content

## 📱 User Experience Flow

### Author Journey
1. **Discover** → Browse journal on React site
2. **Submit** → Click "Submit Manuscript" → Redirect to OJS
3. **Account** → Create OJS account (one-time)
4. **Upload** → Submit manuscript through OJS
5. **Track** → Monitor status in OJS dashboard
6. **Published** → Article appears on React site

### Reviewer Journey
1. **Invite** → Receive email from OJS
2. **Access** → Click link to OJS review system
3. **Review** → Complete review in OJS
4. **Submit** → Recommendations sent via OJS

### Public Reader Journey
1. **Browse** → View journal on React site
2. **Discover** → Find articles in current issue or archives
3. **Read** → Download PDFs from React site
4. **Cite** → Get citation info from article page

## 🎨 What Stays on React Site

The React site remains the public face of the journal:
- Homepage and journal information
- Editorial board display
- Current issue showcase
- Archives of published articles
- About, policies, and guidelines
- News and announcements
- Contact information

## ⚙️ What Happens in OJS

OJS handles all backend workflows:
- Manuscript submission forms
- Author accounts and profiles
- Peer review assignments
- Reviewer evaluations
- Editorial decisions
- Copyediting and proofreading
- Publication finalization
- Email notifications

## 🔒 Authentication Strategy

### Separate Systems
- **React Site Auth**: For admin content management only
- **OJS Auth**: For all manuscript-related activities

### No SSO Required
- Users create separate accounts for OJS
- Simpler setup, no complex integration
- Clear separation of concerns

## 📊 Data Flow

```
OJS                          React Site
────                         ──────────
Manuscript Submitted    →    (Not visible)
Peer Review            →    (Not visible)
Editorial Decision     →    (Not visible)
Article Published      →    Admin adds to React
                       →    Public views on React
```

## 🆘 Troubleshooting

### "Submit Manuscript" shows placeholder
- **Cause**: OJS URL not configured
- **Fix**: Update `VITE_OJS_URL` in environment or config

### Redirect not working
- **Check**: OJS installation is complete and accessible
- **Check**: URL format is correct (include https://)
- **Check**: OJS paths match configuration

### Users confused about separate login
- **Solution**: Clear notices already implemented
- **Consider**: Add FAQ about dual system
- **Action**: Include in author guidelines

## 🎓 Resources

### OJS Learning
- [OJS Documentation](https://docs.pkp.sfu.ca/)
- [OJS Community Forum](https://forum.pkp.sfu.ca/)
- [OJS Demo Site](https://demo.publicknowledgeproject.org/)

### This Integration
- See `OJS_INTEGRATION_GUIDE.md` for detailed setup
- See `README_OJS_SETUP.md` for quick start
- See `DEPLOYMENT_CHECKLIST.md` for deployment steps

## ✨ Benefits of This Approach

1. **Professional OJS Features**: Full journal management system
2. **Custom Public Portal**: Beautiful, fast React frontend
3. **Clear Separation**: Each system does what it does best
4. **Easy Maintenance**: Update systems independently
5. **Scalable**: OJS handles submission load
6. **Flexible**: Can enhance either system as needed

## 📝 Notes

- OJS installation is **your responsibility** (not Lovable)
- React site deploys through Lovable as usual
- Keep both systems updated for security
- Document your specific OJS configuration
- Train editorial team on both systems

## 🚀 Ready to Proceed

Your React site is now **OJS-ready**! Once you install OJS:

1. Update the configuration
2. Test the integration
3. Train your team
4. Launch! 🎉

For questions or issues during OJS setup, refer to the comprehensive guides created or consult the OJS community resources.
