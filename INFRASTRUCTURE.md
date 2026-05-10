# SVRA Tech – Infrastructure & Migration Record

> **Last updated:** 2026-05-10  
> **Migration:** AWS S3 + CloudFront → Vercel  
> **Status:** ✅ LIVE on Vercel. AWS wind-down 95% complete — one manual Console step remaining.

---

## 1. Current Live State

| Property | Value |
|---|---|
| **Live URL (Vercel)** | https://svra-tech.vercel.app |
| **Primary domain** | https://svra-tech.com |
| **www domain** | https://www.svra-tech.com |
| **GitHub repo** | https://github.com/diwakarmani/svra-tech |
| **Vercel project** | `svra-tech` under account `diwakar-manis-projects` |
| **Vercel team scope** | `diwakar-manis-projects` |

---

## 2. AWS Wind-Down Status (2026-05-10)

| Service | Status | Charges |
|---|---|---|
| **S3 Bucket** `new-svra-tech.com` | ✅ **Deleted** | $0 |
| **CloudFront** `E3364IZCRTIOQ8` | ⚠️ **Disabled** (not yet deleted — see §5) | $0 data transfer; WAF subscription ~$5–15/mo until cancelled |
| **WAF Web ACL** `CreatedByCloudFront-4156cd0e` | ⚠️ **Still exists** — must be removed via Console | ~$5–15/mo (base + 3 managed rule groups) |
| **ACM Certificate** | ⚠️ **Still exists** — free, auto-deleted after CloudFront is gone | **$0 — ACM is always free** |
| **Route53 Hosted Zone** | ✅ **Keep** — manages DNS + email records | ~$0.50/mo |

> **Only action left:** Cancel the CloudFront Security Bundle (WAF subscription) from the AWS Console.  
> See §5 for the exact 5-click steps.

---

## 3. What Was Done — Full Audit

### 3a. Migration (CLI)
| Date | Action |
|---|---|
| 2026-05-10 | Cloned GitHub repo `diwakarmani/svra-tech` (was empty) |
| 2026-05-10 | Synced all files from S3 `new-svra-tech.com` to local |
| 2026-05-10 | Built new Next.js 16 SPA in `svra-tms-4/svra-tech/` |
| 2026-05-10 | Pushed to GitHub `main` branch (commit `aa56d7a`) |
| 2026-05-10 | Installed Vercel CLI, logged in as `diwakermani-4294` |
| 2026-05-10 | Added `svra-tech.com` and `www.svra-tech.com` to Vercel project |
| 2026-05-10 | Updated Route53 DNS — cut over from CloudFront to Vercel |
| 2026-05-10 | Verified `svra-tech.com` returns `server: Vercel` |

### 3b. AWS Clean-Up (CLI)
| Date | Action | Result |
|---|---|---|
| 2026-05-10 | Disabled CloudFront `E3364IZCRTIOQ8` | ✅ Done — `Enabled: false` |
| 2026-05-10 | Emptied S3 bucket `new-svra-tech.com` (11 files) | ✅ Done |
| 2026-05-10 | Deleted S3 bucket `new-svra-tech.com` | ✅ Done |
| 2026-05-10 | Attempted to delete CloudFront distribution | ❌ Blocked — WAF Security Bundle subscription requires Console to cancel |
| 2026-05-10 | Attempted to delete ACM certificate | ❌ Blocked — still attached to disabled CloudFront (free anyway) |

---

## 4. Original AWS Infrastructure (Reference)

### S3 Bucket (deleted)

| Property | Value |
|---|---|
| **Bucket name** | `new-svra-tech.com` (us-east-1) — **DELETED** |
| **Files** | `index.html`, `css/style.css`, `images/*.webp/*.jpg/*.png` |

> All images were copied to `public/images/` in this project before deletion.

---

### CloudFront Distribution (disabled, pending deletion)

| Property | Value |
|---|---|
| **Distribution ID** | `E3364IZCRTIOQ8` |
| **CloudFront domain** | `dzafvc09mbdmn.cloudfront.net` |
| **Status** | `Deployed` (disabled) |
| **Origin** | `new-svra-tech.com.s3.us-east-1.amazonaws.com` (S3 deleted) |
| **Aliases** | `svra-tech.com`, `www.svra-tech.com` |
| **HTTP version** | `http2` |
| **Price class** | `PriceClass_All` |
| **WAF** | `CreatedByCloudFront-4156cd0e` (Security Bundle — **must cancel via Console**) |
| **SSL Certificate** | ACM `arn:aws:acm:us-east-1:420536192656:certificate/55847843-f965-47a9-b5a8-c350bf0b2d62` |

---

### ACM Certificate (still exists — free)

| Property | Value |
|---|---|
| **ARN** | `arn:aws:acm:us-east-1:420536192656:certificate/55847843-f965-47a9-b5a8-c350bf0b2d62` |
| **Status** | `ISSUED` |
| **Domains** | `svra-tech.com`, `www.svra-tech.com`, `*.svra-tech.com` |
| **Cost** | **$0 — ACM certificates are always free** |

> Will auto-delete once CloudFront distribution is deleted. Or delete manually via CLI after.

---

### Route53 Hosted Zone (keep — manages email DNS)

| Property | Value |
|---|---|
| **Hosted Zone ID** | `Z07261622F1KO4ONRGJUP` |
| **Zone name** | `svra-tech.com.` |
| **Cost** | ~$0.50/month |
| **Nameservers** | `ns-884.awsdns-46.net`, `ns-1558.awsdns-02.co.uk`, `ns-1074.awsdns-06.org`, `ns-155.awsdns-19.com` |

#### Current DNS Records (post-migration)

| Name | Type | Value | Notes |
|---|---|---|---|
| `svra-tech.com` | A | `76.76.21.21` | **Vercel** |
| `www.svra-tech.com` | CNAME | `cname.vercel-dns.com` | **Vercel** |
| `svra-tech.com` | MX | `0 SVRATECH-COM01b.mail.protection.outlook.com` | **Email — Microsoft 365 — DO NOT TOUCH** |
| `svra-tech.com` | TXT | `v=spf1 include:spf.protection.outlook.com -all` | **SPF — DO NOT TOUCH** |
| `autodiscover.svra-tech.com` | CNAME | `autodiscover.outlook.com` | **Email — DO NOT TOUCH** |
| `_7fe683584ed3f707e69fc05a0b55177c.svra-tech.com` | CNAME | `_89445ff61b90...acm-validations.aws.` | ACM validation — delete after CloudFront gone |
| `_e22c648eb671820810dbe9881e5427d3.www.svra-tech.com` | CNAME | `_c4258be20a7f...acm-validations.aws.` | ACM validation — delete after CloudFront gone |

#### DNS Records Changed During Migration

| Record | Before (CloudFront) | After (Vercel) |
|---|---|---|
| `svra-tech.com` A | Alias → `dzafvc09mbdmn.cloudfront.net` | `76.76.21.21` |
| `svra-tech.com` AAAA | Alias → `dzafvc09mbdmn.cloudfront.net` | Deleted |
| `www.svra-tech.com` A | Alias → `dzafvc09mbdmn.cloudfront.net` | Deleted |
| `www.svra-tech.com` AAAA | Alias → `dzafvc09mbdmn.cloudfront.net` | Deleted |
| `www.svra-tech.com` CNAME | (none) | `cname.vercel-dns.com` |

---

## 5. ⚠️ One Manual Step Remaining — Cancel CloudFront Security Bundle

The CloudFront distribution has an **AWS WAF Security Bundle subscription** that cannot be cancelled via CLI. This is billing ~$5–15/month. You must cancel it from the Console.

### Steps (5 clicks):

1. Open → https://console.aws.amazon.com/cloudfront/v4/home#/distributions
2. Click on distribution **`E3364IZCRTIOQ8`**
3. Click the **Security** tab
4. Under **"AWS WAF web ACL"**, look for **"Pricing plan"** or **"Security bundle"** — click **Cancel** or **Unsubscribe**
5. Once cancelled, return to the **General** tab and click **Delete**

### After deleting CloudFront, run these CLI commands to finish:

```bash
# Delete ACM certificate (no longer in use)
aws acm delete-certificate \
  --certificate-arn arn:aws:acm:us-east-1:420536192656:certificate/55847843-f965-47a9-b5a8-c350bf0b2d62

# Delete the ACM validation CNAME records from Route53
aws route53 change-resource-record-sets \
  --hosted-zone-id Z07261622F1KO4ONRGJUP \
  --change-batch '{
    "Changes": [
      {
        "Action": "DELETE",
        "ResourceRecordSet": {
          "Name": "_7fe683584ed3f707e69fc05a0b55177c.svra-tech.com.",
          "Type": "CNAME",
          "TTL": 300,
          "ResourceRecords": [{"Value": "_89445ff61b90620411b07afd64145bd4.jkddzztszm.acm-validations.aws."}]
        }
      },
      {
        "Action": "DELETE",
        "ResourceRecordSet": {
          "Name": "_e22c648eb671820810dbe9881e5427d3.www.svra-tech.com.",
          "Type": "CNAME",
          "TTL": 300,
          "ResourceRecords": [{"Value": "_c4258be20a7fdf55cd8d4e1ec338e0ae.jkddzztszm.acm-validations.aws."}]
        }
      }
    ]
  }'
```

---

## 6. Email Configuration — Microsoft 365 (DO NOT REMOVE)

> Email for `@svra-tech.com` is on **Microsoft 365 / Exchange Online**.  
> These Route53 records must remain regardless of where the website is hosted.

| Record | Value |
|---|---|
| MX | `0 SVRATECH-COM01b.mail.protection.outlook.com` |
| TXT (SPF) | `v=spf1 include:spf.protection.outlook.com -all` |
| CNAME autodiscover | `autodiscover.outlook.com` |

---

## 7. Vercel Configuration

| Property | Value |
|---|---|
| **Project name** | `svra-tech` |
| **Account** | `diwakar-manis-projects` (diwakermani-4294) |
| **Framework** | Next.js 16 (App Router) |
| **Root directory** | `svra-tech` |
| **Production branch** | `main` |
| **Preview URL** | https://svra-tech.vercel.app |
| **Custom domains** | `svra-tech.com`, `www.svra-tech.com` |
| **SSL** | Auto-provisioned by Vercel (Let's Encrypt — free) |
| **Deploy trigger** | Push to `main` branch on GitHub |

### Environment Variables

| Variable | Default in code | Purpose |
|---|---|---|
| `NEXT_PUBLIC_ENQUIRY_API_URL` | `https://svra-tms-native-latest.onrender.com/api/public/enquiry` | Contact form API |
| `NEXT_PUBLIC_ENTITY_CODE` | `TECH` | Form payload identifier |

---

## 8. Rollback to AWS (If Ever Needed)

If you need to move back to AWS CloudFront + S3 in the future:

### Step 1 — Re-create S3 bucket and upload files
```bash
# Create bucket
aws s3 mb s3://new-svra-tech.com --region us-east-1

# Upload files from this project's public/images + build output
aws s3 sync public/images/ s3://new-svra-tech.com/images/
```

### Step 2 — Re-create CloudFront distribution
Create a new distribution in the AWS Console pointing to the S3 bucket, with the ACM cert attached (or request a new one). Note the new CloudFront domain.

### Step 3 — Restore Route53 DNS records
```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z07261622F1KO4ONRGJUP \
  --change-batch '{
    "Changes": [
      {
        "Action": "DELETE",
        "ResourceRecordSet": {
          "Name": "svra-tech.com.", "Type": "A", "TTL": 60,
          "ResourceRecords": [{"Value": "76.76.21.21"}]
        }
      },
      {
        "Action": "DELETE",
        "ResourceRecordSet": {
          "Name": "www.svra-tech.com.", "Type": "CNAME", "TTL": 60,
          "ResourceRecords": [{"Value": "cname.vercel-dns.com"}]
        }
      },
      {
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "svra-tech.com.", "Type": "A",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "<new-cloudfront-domain>.cloudfront.net.",
            "EvaluateTargetHealth": false
          }
        }
      },
      {
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "www.svra-tech.com.", "Type": "A",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "<new-cloudfront-domain>.cloudfront.net.",
            "EvaluateTargetHealth": false
          }
        }
      }
    ]
  }'
```

### Step 4 — Remove Vercel custom domains
```bash
vercel domains rm svra-tech.com --scope diwakar-manis-projects
vercel domains rm www.svra-tech.com --scope diwakar-manis-projects
```

> Note: The Route53 nameservers (`ns-884.awsdns-46.net` etc.) are unchanged — the domain always resolves via AWS Route53. Only the A/CNAME targets change between Vercel and CloudFront.

---

## 9. AWS Resource IDs Quick Reference

| Resource | ID / Value | Status |
|---|---|---|
| S3 Bucket | `new-svra-tech.com` (us-east-1) | **DELETED** |
| CloudFront Distribution ID | `E3364IZCRTIOQ8` | Disabled — delete via Console |
| CloudFront Domain | `dzafvc09mbdmn.cloudfront.net` | Disabled |
| WAF Web ACL | `CreatedByCloudFront-4156cd0e` / `3d092337-54fa-4f97-8951-2e560b55fdbd` | Cancel via Console |
| Route53 Hosted Zone | `Z07261622F1KO4ONRGJUP` | Active (keep) |
| ACM Certificate ARN | `arn:aws:acm:us-east-1:420536192656:certificate/55847843-f965-47a9-b5a8-c350bf0b2d62` | In-use (free) — delete after CloudFront gone |
| CloudFront Alias HostedZoneId | `Z2FDTNDATAQYW2` | For rollback reference |

---

## 10. Key Access & Contacts

| System | Detail |
|---|---|
| AWS CLI | Configured at `~/.aws/credentials` |
| AWS Account ID | `420536192656` |
| Vercel CLI | `vercel whoami` → `diwakermani-4294` |
| Vercel scope | `diwakar-manis-projects` |
| GitHub repo | https://github.com/diwakarmani/svra-tech |
| Email host | Microsoft 365 — MX `SVRATECH-COM01b.mail.protection.outlook.com` |
| Enquiry API | `https://svra-tms-native-latest.onrender.com/api/public/enquiry` |
