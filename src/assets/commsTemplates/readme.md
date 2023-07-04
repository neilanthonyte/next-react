# Overview

Contains all company specific communications templates. There shouldn't be a
need for generic templates. For example when sending issues report email it
still should be relevant to the company services it occurs and branded that way.

# Structure

```
- commsTemplates
    - email
        - transforms            // contains functions to convert model data
                                // used to presentational format
                                // that can be consumed by the email templates
        - company
            - templateName.ts   // repeated for each email template
            - index.tsx         // export component that show preview of all
                                // templates using EmailRenderer
            - readme.md         // display example component from index.tsx
                                // for styleguidist to show
    - notification
        - company
            - templateName.ts   // repeated for each notification template
```
# Email Templates

Templates are to be generated with [MailChimp](https://mailchimp.com/)

 - Create the template and save there.
 - Export the html and copy to the template file.
 - Any update is to be made in MailChimp first then copied across.
 
 **PLEASE DO NOT DIRECTLY UPDATE - PLEASE UPDATE MAILCHIMP AND COPY**
 
 Run examples with: 
 
 ```PATTERN="src/assets/commsTemplates/email/companyName/**/*.tsx" yarn dev```
