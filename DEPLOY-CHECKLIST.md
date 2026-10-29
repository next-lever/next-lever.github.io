# Deploy checklist (every push to nextleverhq.com)
1. Before push: `grep -c 'gtag/js?id=G-8DXVSVQ9C3' *.html` = 1 on every page, and `assets/ga.js` has the ID.
2. Push, then on the live site: `curl -s --resolve nextleverhq.com:443:185.199.108.153 https://nextleverhq.com/<page>` shows `G-8DXVSVQ9C3` in the <head> of every page.
3. Only then: `gh auth logout --hostname github.com` and `grep -c oauth ~/.config/gh/hosts.yml` = 0.
(Michael's rule, Oct 29, 2026.)
