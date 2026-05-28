+++
title = "Configuration"
description = "Configure VaraPress to match your project's needs."
weight = 2
+++

VaraPress exposes several options through your `zola.toml`. Here is the full reference.

## Site Configuration

Set your site metadata in `zola.toml`:

```toml
title = "My Project"
description = "A brief description of your project"

[extra]
# Theme-specific options go here
```

## Theme Options

Add these under `[extra]` in your `zola.toml`:

```toml
[extra]
# Override the docs title shown in the header
docs_title = "My Docs"

# Configure navigation links in the header (coming soon)
# [[extra.nav]]
# label = "Blog"
# url = "/blog/"
```

## Build Settings

Make sure your `zola.toml` includes:

```toml
# Enable search index (for future search feature)
build_search_index = true

# Disable Sass compilation (TailwindCSS handles all styles)
compile_sass = false

# Base URL for production
base_url = "https://your-domain.com"
```

## Code Highlighting

VaraPress comes with `github-light-default` and `github-dark-default` themes:

```toml
[markdown.highlighting]
light_theme = "github-light-default"
dark_theme = "github-dark-default"
```

## Next Steps

Once configured, head to the [Quickstart](/docs/getting-started/quickstart/) guide to start writing content.
