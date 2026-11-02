# Render Remotion otomatis di GitHub

Upload project Remotion ke folder `projects/`, GitHub Actions akan merender jadi MP4.

## Cara upload (pilih salah satu)
1. **Satu file ZIP** (paling gampang dari HP): taruh zip di `projects/`, misalnya `projects/horor.zip`.
   Isi zip boleh langsung berisi `package.json`, `src/`, `public/`, atau dibungkus satu folder.
   Jangan sertakan `node_modules`.
2. **Folder biasa**: `projects/horor/package.json`, `projects/horor/src/...`, `projects/horor/public/...`

Nama project = nama folder atau nama zip (tanpa `.zip`).

## Yang terjadi
- Push yang menyentuh `projects/` merender hanya project yang berubah.
- Hasilnya muncul di tab **Releases** (link download MP4 langsung) dan di **Actions > run > Artifacts**.
- Render manual: tab **Actions > Render Remotion > Run workflow**, isi nama project dan (opsional) ID composition.

## Opsional: render.json di dalam project
```json
{
  "entry": "src/index.ts",
  "composition": "HorrorStory",
  "args": ["--scale=1"]
}
```
Kalau tidak ada, entry dicari otomatis (`src/index.ts|tsx|js|jsx`) dan composition yang dipakai adalah yang pertama di daftar.

## Catatan
- Settings > Actions > General > Workflow permissions harus mengizinkan Actions membuat Release (workflow ini sudah meminta `contents: write`).
- Repo publik: Release bisa diunduh siapa saja. Pakai repo private kalau kontennya tidak ingin dibagikan.
