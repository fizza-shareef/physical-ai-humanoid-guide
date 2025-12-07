# 🚀 DEPLOYMENT INSTRUCTIONS

## Quick Deploy (Choose One)

### Vercel (Fastest)

```powershell
cd e:\HACKATHON\book-site
npx vercel --prod
```

### GitHub Pages

```powershell
cd e:\HACKATHON\book-site

# Authenticate first
gh auth login

# Then push
git push -u origin main --force

# Enable Pages: GitHub Repo → Settings → Pages → Source: GitHub Actions
```

---

## Submission Form

**URL**: https://forms.gle/CQsSEGM3GeCrL43c8

**Fields to fill:**

- GitHub Repo URL: `https://github.com/fizza-shareef/physical-ai-humanoid-guide`
- Live Site URL: `https://book-site-a69i1dvkz-fizza-shareefs-projects.vercel.app`
- Demo Video: `<YOUTUBE_LINK>` (must be ≤90 seconds)
- WhatsApp: Your number

---

## Files Readyuuu

| Location                           | Content                     |
| ---------------------------------- | --------------------------- |
| `e:\HACKATHON\book-site\`          | Complete Docusaurus site    |
| `e:\HACKATHON\book-site\build\`    | Production build (38 files) |
| `e:\HACKATHON\book-site\docs\`     | 5 chapters with frontmatter |
| `e:\HACKATHON\book-site\examples\` | Runnable Node.js example    |

---

## Test Example

```powershell
cd e:\HACKATHON\book-site
node examples/run-example.js
```

✅ Should show robot sensor demo with emojis!
