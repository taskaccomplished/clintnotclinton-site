# clintnotclinton.com

Static personal site for fiction, workshop projects, and field notes. It is configured for deployment through GitHub Pages.

## Publish it

1. Create a GitHub repository and upload this project, preserving the `outputs/` and `.github/` folders.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to the `main` branch. The included workflow deploys the `outputs/` folder automatically.
4. In **Settings → Pages**, add `www.clintnotclinton.com` as the custom domain and enable **Enforce HTTPS** once GitHub makes it available. With an Actions deployment, this Pages setting—not the `CNAME` file—activates the custom domain.
5. At the DNS provider for `clintnotclinton.com`, set `www` as a CNAME record pointing to `<your-github-username>.github.io`.
6. Redirect the apex domain (`clintnotclinton.com`) to `www.clintnotclinton.com` at the DNS provider or current WordPress host.

The included `CNAME` file is kept with the website for portability, but GitHub Pages stores the active custom-domain setting in the repository's Pages settings when using GitHub Actions.

## Update content

- Edit `index.html` for copy, new chapters, and project cards.
- Edit `styles.css` for the design system and layout.
- The chapter subscription form is currently a front-end confirmation only. Connect it to a newsletter service (for example Buttondown, ConvertKit, or Mailchimp) before collecting real email addresses.
