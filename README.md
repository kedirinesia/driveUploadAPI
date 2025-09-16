# Drive Uploader API

API untuk upload file ke Google Drive menggunakan Next.js.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
Buat file `.env.local` dengan isi:
```
CLIENT_EMAIL=your-service-account-email@project-id.iam.gserviceaccount.com
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

3. Run development server:
```bash
npm run dev
```

## API Endpoint

**POST** `/api/upload`

Upload file ke Google Drive.

### Request
- Method: POST
- Content-Type: multipart/form-data
- Body: Form data dengan field `file`

### Response
- Success: `{ "success": true, "fileId": "google-drive-file-id", "fileName": "original-filename" }`
- Error: `{ "error": "error-message" }`

## Deployment ke Vercel

### 1. Setup Environment Variables di Vercel
Set environment variables di Vercel dashboard:
- `CLIENT_EMAIL`: Email service account Google
- `PRIVATE_KEY`: Private key Google (dengan \n untuk newlines)

### 2. Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Atau push ke GitHub dan connect ke Vercel
```

### 3. Konfigurasi Vercel
File `vercel.json` sudah dikonfigurasi untuk:
- Max duration: 30 detik
- Environment variables mapping

## Google Drive Setup

1. Buat project di Google Cloud Console
2. Enable Google Drive API
3. Buat Service Account
4. Download JSON credentials
5. Extract CLIENT_EMAIL dan PRIVATE_KEY dari JSON

## Production Checklist

✅ Next.js configuration  
✅ Error handling robust  
✅ File cleanup  
✅ Environment validation  
✅ Vercel configuration  
✅ Production-ready code
✅ Environment variable setup
