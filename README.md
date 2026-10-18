# الوكالة - منصة B2B

## الإعداد (PostgreSQL)

### 1. شغّل PostgreSQL

**بـ Docker (موصى به):**

```bash
npm run db:docker
```

**أو PostgreSQL محلي** — عدّل `DATABASE_URL` في `.env`

### 2. أنشئ الجداول واملأ البيانات

```bash
npm install
npm run db:setup
```

### 3. شغّل المشروع

```bash
npm run dev
```

## حسابات تجريبية

| الدور | البريد | كلمة المرور |
|-------|--------|-------------|
| الوكالة (Admin) | admin@el-wekala.com | admin123 |
| محل (Buyer) | buyer@example.com | buyer123 |

## PostgreSQL

| الإعداد | القيمة |
|---------|--------|
| Host | localhost:5432 |
| Database | el_wekala |
| User | elwekala |
| Password | elwekala |

```
DATABASE_URL="postgresql://elwekala:elwekala@localhost:5432/el_wekala?schema=public"
```

## أوامر مفيدة

```bash
npm run db:docker   # تشغيل PostgreSQL في Docker
npm run db:setup    # إنشاء الجداول + seed
npm run db:reset    # مسح وإعادة seed (تحذير: يحذف كل البيانات)
npm run db:push     # تطبيق تغييرات schema فقط
```

## Supabase / Neon / Railway

انسخ connection string من لوحة التحكم وضعه في `.env`:

```
DATABASE_URL="postgresql://user:pass@host:5432/dbname?schema=public"
```

ثم:

```bash
npm run db:setup
```

## متغيرات البيئة

انسخ `.env.example` إلى `.env` وعدّل `NEXTAUTH_SECRET` في الإنتاج.

## WhatsApp Notifications

Uses **Meta WhatsApp Cloud API**. Without config, messages log to the terminal (mock mode).

### Setup

1. Create an app at [Meta for Developers](https://developers.facebook.com/)
2. Add **WhatsApp** product → get **Phone Number ID** and **Access Token**
3. Add a test recipient number in the WhatsApp dashboard
4. Update `.env`:

```env
WHATSAPP_ENABLED=true
WHATSAPP_API_TOKEN=your_permanent_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ADMIN_PHONES=01001234567
```

5. In admin dashboard → **واتساب** tab → save agency phone + send test message

### When messages are sent

| Event | Recipient |
|-------|-----------|
| New order | Agency (admin phone) |
| Order status change | Shop (shop phone) |
| Order cancelled | Agency |
| Price drop | All shops with phone |
| Large stock arrival | All shops with phone |

Shop phone is set at registration. Agency phone: admin dashboard or `WHATSAPP_ADMIN_PHONES` in `.env`.
