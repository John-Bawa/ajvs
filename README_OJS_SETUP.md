# Quick Start: OJS Integration for AJVS

## Current Status
✅ React site configured for OJS integration  
⏳ OJS installation pending  
🔗 Integration method: Redirects/External links

## Immediate Next Steps

### 1. Configure OJS URL (After OJS Installation)

**Add to `.env` file:**
```env
VITE_OJS_URL=https://your-ojs-installation.org
```

**Or edit `src/config/ojs.ts`:**
```typescript
export const OJS_BASE_URL = 'https://your-ojs-installation.org';
```

### 2. Test Integration

After configuring URL, test these flows:
- Click "Submit Manuscript" → Should redirect to OJS
- Check redirect notices appear correctly
- Verify external link icons display

### 3. OJS Journal Setup

In your OJS installation, configure:
- Journal abbreviation: `ajvs`
- Enable user registration
- Set up editorial workflow
- Configure email templates
- Add journal sections (e.g., Research Articles, Reviews, etc.)

## User Flows

### Authors
1. Browse journal on React site ✅
2. Click "Submit" → Redirect to OJS 🔗
3. Create OJS account (one-time) 
4. Submit through OJS
5. Track in OJS dashboard

### Published Content Display
1. Articles published in OJS
2. Admin adds article to React site
3. Public views on React site ✅

## Files Modified for OJS

```
src/
├── config/
│   └── ojs.ts                      # OJS URL configuration
├── components/
│   └── ojs/
│       ├── OJSRedirectNotice.tsx   # Redirect information component
│       └── OJSExternalLink.tsx     # External link button component
└── pages/
    └── SubmitManuscript.tsx        # Now shows OJS redirect

Documentation:
├── OJS_INTEGRATION_GUIDE.md        # Comprehensive integration guide
└── README_OJS_SETUP.md             # This quick start guide
```

## System Separation

| Feature | React Site (Public) | OJS (Backend) |
|---------|-------------------|---------------|
| Browse articles | ✅ | ❌ |
| View current issue | ✅ | ✅ |
| Submit manuscript | 🔗 Redirect | ✅ |
| Peer review | ❌ | ✅ |
| Editorial workflow | ❌ | ✅ |
| User accounts | Browsing only | Full submission accounts |

## Support

For detailed information, see `OJS_INTEGRATION_GUIDE.md`

For OJS-specific help:
- Documentation: https://docs.pkp.sfu.ca/
- Community Forum: https://forum.pkp.sfu.ca/
