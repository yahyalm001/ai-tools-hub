# StudyNova

## Project
Imported static French-language student resource website using HTML, CSS, and
plain JavaScript. The root `index.html` is the entry point; `style.css`,
`database.js` (a static tools catalog, not a database server), and `app.js`
provide styling, content, and behavior.

Keep the existing structure and stack. The `Ai-Tools/` directory is another
imported version of the site and is preserved unchanged.

## Run on Replit
Use the **Start application** workflow (the Run button), which runs:

```sh
python3 -m http.server 5000 --bind 0.0.0.0
```

Open Preview to view the root site. Python's standard-library server is for
development only. There is no build step and no third-party dependency
installation, backend, database, or secret required to browse the site.

## External services
Newsletter and contact forms submit to the existing Formspree endpoints in
`index.html`. Delivery depends on those forms being active and owned by the
site operator; local preview does not verify delivery. Do not replace endpoints
or send test submissions without approval.

Canonical URLs, social image URLs, robots.txt, and sitemap.xml still refer to
the imported GitHub Pages address. Review these if publishing at a new address.
