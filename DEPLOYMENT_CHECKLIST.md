# AJVS Deployment Checklist

## Pre-Deployment: OJS Setup

### OJS Installation
- [ ] Server with PHP 7.3+ configured
- [ ] OJS 3.x installed
- [ ] Database configured
- [ ] Journal created with abbreviation: `ajvs`
- [ ] Email server configured
- [ ] User roles set up (Author, Reviewer, Editor, Admin)
- [ ] Submission workflow configured
- [ ] Email templates customized

### OJS Configuration
- [ ] Journal sections defined (e.g., Research Articles, Reviews)
- [ ] Submission requirements configured
- [ ] Review forms created
- [ ] Author guidelines added
- [ ] Editorial team accounts created
- [ ] Test submission completed successfully

## React Site Configuration

### Environment Variables
- [ ] Copy `.env.example` to `.env` (already exists in Lovable Cloud)
- [ ] Add OJS URL to environment:
  ```
  VITE_OJS_URL=https://your-ojs-installation.org
  ```

### Content Setup
- [ ] Update contact information in Footer
- [ ] Add editorial board members (if not already done)
- [ ] Create initial journal issue
- [ ] Add "About" page content
- [ ] Configure author guidelines
- [ ] Add journal policies

### Testing
- [ ] Test "Submit Manuscript" redirect to OJS
- [ ] Verify OJS login works
- [ ] Test complete submission flow in OJS
- [ ] Check article display on React site
- [ ] Test responsive design on mobile
- [ ] Verify all navigation links work
- [ ] Test payment flow (if applicable)

## Integration Verification

### User Flows
- [ ] Author can find submission link
- [ ] Redirect notice displays clearly
- [ ] OJS account creation works
- [ ] Manuscript submission completes
- [ ] Reviewer receives email notifications
- [ ] Editor can access editorial dashboard
- [ ] Published articles appear on React site

### Data Synchronization
- [ ] Document workflow for publishing articles
- [ ] Test adding published article to React site
- [ ] Verify article metadata accuracy
- [ ] Check PDF links work correctly
- [ ] Ensure issue information matches

## Post-Deployment

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Monitor OJS server resources
- [ ] Track user registrations
- [ ] Review submission statistics

### Documentation
- [ ] Share OJS login URL with editorial team
- [ ] Provide training for editors
- [ ] Create user guides for authors
- [ ] Document article publishing workflow
- [ ] Update website with OJS information

### Communication
- [ ] Email announcement to potential authors
- [ ] Update social media with submission link
- [ ] Add OJS link to email signatures
- [ ] Inform reviewers of new system
- [ ] Notify editorial board

## Maintenance Tasks

### Weekly
- [ ] Check for pending submissions in OJS
- [ ] Monitor review timelines
- [ ] Update React site with new articles
- [ ] Respond to author inquiries

### Monthly
- [ ] Review user registrations
- [ ] Check system performance
- [ ] Update content as needed
- [ ] Review and improve workflows

### Quarterly
- [ ] OJS software updates
- [ ] Security patch review
- [ ] User feedback analysis
- [ ] Process improvement review

## Emergency Contacts

| Role | Contact | Notes |
|------|---------|-------|
| Server Admin | ___ | OJS hosting |
| React Site Admin | ___ | Lovable/hosting |
| Editor-in-Chief | ___ | Content decisions |
| Technical Support | ___ | Integration issues |

## Rollback Plan

If OJS integration has issues:
1. Revert `src/pages/SubmitManuscript.tsx` to use internal submission form
2. Comment out OJS config in `src/config/ojs.ts`
3. Re-enable internal submission workflow
4. Notify users of temporary system
5. Debug OJS issues separately

## Success Criteria

- [ ] Authors can successfully submit manuscripts
- [ ] Reviewers can access and complete reviews
- [ ] Editors can manage editorial workflow
- [ ] Published articles display on public site
- [ ] Users understand dual-system setup
- [ ] No broken links or error messages
- [ ] System performance is acceptable
- [ ] Support requests are manageable
