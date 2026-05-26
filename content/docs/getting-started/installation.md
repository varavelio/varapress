+++
title = "Installation"
description = "How to install the VaraPress theme in your Zola project."
template = "docs.html"
weight = 1
+++

Installing VaraPress takes two steps.

## Requirements

- **Zola** `>= 0.22.1`

## Step 1: Add the Theme

Add VaraPress as a Git submodule in your Zola project:

```bash
git submodule add https://github.com/varavelio/varapress.git themes/varapress
```

## Step 2: Enable the Theme

Add the theme to your `zola.toml`:

```toml
theme = "varapress"
```

Your site is ready.

## Next Steps

Now that you have the theme installed, check out the [Configuration](/docs/getting-started/configuration/) guide to customize it for your project.
