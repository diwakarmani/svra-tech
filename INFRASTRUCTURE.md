# SVRA Tech – Infrastructure & Migration Record

> **Last updated:** 2026-05-10  
> **Migration:** AWS S3 + CloudFront → Vercel  
> **Status:** Live on Vercel. AWS services still running (not yet disabled).

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

## 2. AWS Infrastructure (Preserved — Not Yet Disabled)

### 2a. S3 Bucket

| Property | Value |
|---|---|
| **Bucket name** | `new-svra-tech.com` |
| **Region** | `us-east-1` |
| **Access** | Private (no public ACL) |
| **Website config** | None — served via CloudFront only |
| **Public access** | Blocked (`IsPublic: false`) |

**Files in bucket (original static site):**

```
.gitignore
css/style.css
images/about.png
images/about1.webp
images/about2.webp
images/app.jpg
images/home.webp
images/network.jpg
images/remote.jpg
images/security.jpg
index.html
```

> All images have been copied to `public/images/` in this Next.js project.

---

### 2b. CloudFront Distribution

| Property | Value |
|---|---|
| **Distribution ID** | `E3364IZCRTIOQ8` |
| **CloudFront domain** | `dzafvc09mbdmn.cloudfront.net` |
| **Status** | `Deployed` |
| **Enabled** | `true` (still active — not yet disabled) |
| **Origin** | `new-svra-tech.com.s3.us-east-1.amazonaws.com` |
| **Aliases** | `svra-tech.com`, `www.svra-tech.com` |
| **Viewer protocol** | `redirect-to-https` |
| **HTTP version** | `http2` |
| **Price class** | `PriceClass_All` |
| **SSL Certificate** | ACM `arn:aws:acm:us-east-1:420536192656:certificate/55847843-f965-47a9-b5a8-c350bf0b2d62` |

> CloudFront is still deployed but DNS no longer points to it.  
> It will not receive any traffic as of 2026-05-10 DNS cut-over.

---

### 2c. ACM Certificate (AWS Certificate Manager)

| Property | Value |
|---|---|
| **ARN** | `arn:aws:acm:us-east-1:420536192656:certificate/55847843-f965-47a9-b5a8-c350bf0b2d62` |
| **Status** | `ISSUED` |
| **Primary domain** | `svra-tech.com` |
| **SANs** | `svra-tech.com`, `www.svra-tech.com`, `*.svra-tech.com` |
| **Region** | `us-east-1` (required for CloudFront) |
| **Validation method** | DNS (CNAME records in Route53) |

> Do **not** delete this certificate until CloudFront is fully disabled.

---

### 2d. Route53 Hosted Zone

| Property | Value |
|---|---|
| **Hosted Zone ID** | `Z07261622F1KO4ONRGJUP` |
| **Zone name** | `svra-tech.com.` |
| **Nameservers (AWS)** | `ns-884.awsdns-46.net`, `ns-1558.awsdns-02.co.uk`, `ns-1074.awsdns-06.org`, `ns-155.awsdns-19.com` |

#### Current DNS Records (as of 2026-05-10 after migration)

| Name | Type | Value | Notes |
|---|---|---|---|
| `svra-tech.com` | A | `76.76.21.21` | **Vercel** — updated during migration |
| `www.svra-tech.com` | CNAME | `cname.vercel-dns.com` | **Vercel** — updated during migration |
| `svra-tech.com` | MX | `0 SVRATECH-COM01b.mail.protection.outlook.com` | **Email — Microsoft 365 — DO NOT TOUCH** |
| `svra-tech.com` | TXT | `v=spf1 include:spf.protection.outlook.com -all` | **SPF email auth — DO NOT TOUCH** |
| `autodiscover.svra-tech.com` | CNAME | `autodiscover.outlook.com` | **Email autodiscover — DO NOT TOUCH** |
| `_7fe683584ed3f707e69fc05a0b55177c.svra-tech.com` | CNAME | `_89445ff61b90620411b07afd64145bd4.jkddzztszm.acm-validations.aws.` | ACM cert validation — safe to keep |
| `_e22c648eb671820810dbe9881e5427d3.www.svra-tech.com` | CNAME | `_c4258be20a7fdf55cd8d4e1ec338e0ae.jkddzztszm.acm-validations.aws.` | ACM cert validation — safe to keep |

#### DNS Records Changed During Migration (2026-05-10)

| Record | Before | After |
|---|---|---|
| `svra-tech.com` A | Alias → `dzafvc09mbdmn.cloudfront.net` | `76.76.21.21` (Vercel) |
| `svra-tech.com` AAAA | Alias → `dzafvc09mbdmn.cloudfront.net` | **Deleted** |
| `www.svra-tech.com` A | Alias → `dzafvc09mbdmn.cloudfront.net` | **Deleted** |
| `www.svra-tech.com` AAAA | Alias → `dzafvc09mbdmn.cloudfront.net` | **Deleted** |
| `www.svra-tech.com` CNAME | (none) | `cname.vercel-dns.com` (Vercel) |

---

## 3. Email Configuration (Microsoft 365)

> Email for `@svra-tech.com` is hosted on **Microsoft 365 / Exchange Online**.  
> These DNS records were **preserved** during the migration and must never be removed.

| Record | Value |
|---|---|
| MX | `0 SVRATECH-COM01b.mail.protection.outlook.com` |
| TXT (SPF) | `v=spf1 include:spf.protection.outlook.com -all` |
| CNAME autodiscover | `autodiscover.outlook.com` |

> If you ever switch DNS to Vercel nameservers, you **must** re-add these records in Vercel's DNS panel **before** switching — otherwise email will break.

---

## 4. Vercel Configuration

| Property | Value |
|---|---|
| **Project name** | `svra-tech` |
| **Account** | `diwakar-manis-projects` (diwakermani-4294) |
| **Framework** | Next.js |
| **Root directory** | `svra-tech` (monorepo subfolder) |
| **Production branch** | `main` |
| **Preview URL** | https://svra-tech.vercel.app |
| **Custom domain** | `svra-tech.com`, `www.svra-tech.com` |
| **SSL** | Auto-provisioned by Vercel (Let's Encrypt) |

### Environment Variables on Vercel

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_ENQUIRY_API_URL` | `https://svra-tms-native-latest.onrender.com/api/public/enquiry` |
| `NEXT_PUBLIC_ENTITY_CODE` | `SVRA-TECH` |

> These have safe defaults in code — only set them on Vercel if you need to override.

---

## 5. Next Steps — AWS Wind-Down (Do In Order)

### Step 1 — Verify Vercel is serving traffic ✅ Ready to check
```bash
curl -sI https://svra-tech.com | head -5
# Should show: server: Vercel  (not x-cache: Hit from cloudfront)
```

### Step 2 — Wait 24–48 hours
Allow DNS TTL (60s) to propagate globally. Monitor that the site loads via both `svra-tech.com` and `www.svra-tech.com`.

### Step 3 — Disable CloudFront Distribution
```bash
# 1. Get current ETag (required for update)
ETAG=$(aws cloudfront get-distribution-config --id E3364IZCRTIOQ8 \
  --query 'ETag' --output text)

# 2. Download current config
aws cloudfront get-distribution-config --id E3364IZCRTIOQ8 \
  --query 'DistributionConfig' > /tmp/cf-config.json

# 3. Edit /tmp/cf-config.json — set "Enabled": false

# 4. Update distribution
aws cloudfront update-distribution \
  --id E3364IZCRTIOQ8 \
  --distribution-config file:///tmp/cf-config.json \
  --if-match $ETAG

# 5. Wait for status to become "Deployed" (~10 min)
aws cloudfront wait distribution-deployed --id E3364IZCRTIOQ8
```

### Step 4 — (Optional) Empty and delete S3 bucket
> Only do this after confirming Vercel is working and you no longer need the original files.
```bash
# Empty the bucket
aws s3 rm s3://new-svra-tech.com --recursive

# Delete the bucket
aws s3 rb s3://new-svra-tech.com
```

### Step 5 — (Optional) Delete ACM Certificate
> Only after CloudFront is fully disabled.
```bash
aws acm delete-certificate \
  --certificate-arn arn:aws:acm:us-east-1:420536192656:certificate/55847843-f965-47a9-b5a8-c350bf0b2d62
```

### Step 6 — (Optional) Clean up ACM validation CNAMEs in Route53
Remove the two `_xxx.svra-tech.com` CNAME records used for ACM validation (they are no longer needed once the cert is deleted).

---

## 6. Roll-Back to AWS (If Needed)

If you ever need to move back from Vercel to AWS CloudFront + S3:

### Step 1 — Re-enable CloudFront
```bash
# (Same as disable steps above but set "Enabled": true)
aws cloudfront update-distribution \
  --id E3364IZCRTIOQ8 \
  --distribution-config file:///tmp/cf-config.json \
  --if-match $ETAG
```

### Step 2 — Restore Route53 DNS records
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
            "DNSName": "dzafvc09mbdmn.cloudfront.net.",
            "EvaluateTargetHealth": false
          }
        }
      },
      {
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "svra-tech.com.", "Type": "AAAA",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "dzafvc09mbdmn.cloudfront.net.",
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
            "DNSName": "dzafvc09mbdmn.cloudfront.net.",
            "EvaluateTargetHealth": false
          }
        }
      },
      {
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "www.svra-tech.com.", "Type": "AAAA",
          "AliasTarget": {
            "HostedZoneId": "Z2FDTNDATAQYW2",
            "DNSName": "dzafvc09mbdmn.cloudfront.net.",
            "EvaluateTargetHealth": false
          }
        }
      }
    ]
  }'
```

### Step 3 — Remove Vercel custom domains
```bash
vercel domains rm svra-tech.com --scope diwakar-manis-projects
vercel domains rm www.svra-tech.com --scope diwakar-manis-projects
```

---

## 7. AWS Resource IDs Quick Reference

| Resource | ID / ARN |
|---|---|
| S3 Bucket | `new-svra-tech.com` (us-east-1) |
| CloudFront Distribution | `E3364IZCRTIOQ8` |
| CloudFront Domain | `dzafvc09mbdmn.cloudfront.net` |
| Route53 Hosted Zone | `Z07261622F1KO4ONRGJUP` |
| ACM Certificate | `arn:aws:acm:us-east-1:420536192656:certificate/55847843-f965-47a9-b5a8-c350bf0b2d62` |
| CloudFront Hosted Zone (for alias) | `Z2FDTNDATAQYW2` |

---

## 8. Key Contacts & Access

| System | Account |
|---|---|
| AWS | Configured via local AWS CLI (`~/.aws/credentials`) |
| Vercel | `diwakermani-4294` / `diwakar-manis-projects` |
| GitHub | https://github.com/diwakarmani/svra-tech |
| Email (Microsoft 365) | MX → `SVRATECH-COM01b.mail.protection.outlook.com` |
| Support/Enquiry API | `https://svra-tms-native-latest.onrender.com/api/public/enquiry` |
