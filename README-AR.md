# إضافات نشاما درايف

## الملفات (انسخ مجلد src فوق مشروعك)
- `src/auth/` تسجيل الدخول: يدوي (بريد أو هاتف + كلمة مرور) وGoogle وApple
- `src/screens/` الشاشات الخمس من الصورة + غلاف بتنقل سفلي
- `src/App.example.tsx` طريقة الربط
- `.env.example` متغيرات Google وApple

## الخطوات
1. انسخ `src/auth` و`src/screens` إلى مشروعك.
2. اجعل `src/App.tsx` مثل `App.example.tsx`.
3. في `index.html` أضف خط تجوال/Cairo داخل head:
   `<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&display=swap" rel="stylesheet">`
4. انسخ `.env.example` إلى `.env` وضع المفاتيح، وأضفها في Vercel (Settings > Environment Variables) ثم أعد النشر.
5. `npm run dev` للتجربة.

## مهم قبل الإطلاق
- الحسابات اليدوية الآن تُحفظ في المتصفح فقط (للتجربة). استبدل `registerUser` و`loginUser` و`socialLogin` في `authService.ts` باستدعاءات لسيرفرك.
- رمز Google وApple يجب التحقق منه في السيرفر.
- Apple لا يعمل على localhost ويحتاج Services ID ودومين موثق.
- بيانات الشاشات تجريبية في `screens/data.ts`، والخريطة SVG توضيحية (يمكن استبدالها بـ Leaflet أو Google Maps).
