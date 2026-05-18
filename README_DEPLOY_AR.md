# رفع موقع VolT على GitHub Pages

## الملفات الجاهزة

- `index.html`
- `styles.css`
- `script.js`
- `CNAME`
- مجلد `assets`
- مجلد `downloads`

## خطوات الرفع

1. اعمل Repository جديد على GitHub باسم مناسب مثل `volt-eg-site`.
2. ارفع كل محتويات هذا المجلد إلى الريبو.
3. من Settings > Pages اختار:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
4. في خانة Custom domain اكتب:
   ```text
   volt-eg.site
   ```
5. من لوحة الدومين ضيف DNS الخاص بـ GitHub Pages.

## DNS المقترح

للدومين الأساسي:

```text
A  @  185.199.108.153
A  @  185.199.109.153
A  @  185.199.110.153
A  @  185.199.111.153
```

للـ www:

```text
CNAME  www  your-github-username.github.io
```

بعد الربط فعل `Enforce HTTPS` من GitHub Pages عندما يصبح متاحا.
