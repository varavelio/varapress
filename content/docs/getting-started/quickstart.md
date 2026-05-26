+++
title = "Quickstart"
description = "Start writing documentation with VaraPress in under five minutes."
template = "docs.html"
weight = 3
+++

Here is the fastest path from zero to a working documentation site.

## Create Your Docs Directory

```bash
mkdir -p content/docs/getting-started
```

## Create the Docs Index

Create `content/docs/_index.md`:

```toml
+++
title = "Documentation"
template = "docs.html"
weight = 1
+++

Welcome to the docs.
```

All sub-pages under this section must also set `template = "docs.html"` in their frontmatter.

## Create Your First Page

Create `content/docs/getting-started/hello.md`:

````toml
+++
title = "Hello World"
template = "docs.html"
weight = 1
+++

This is your first documentation page.

## Overview

Write your content here using **Markdown**.

### Code Blocks

VaraPress supports syntax-highlighted code blocks with `github-light-default` and `github-dark-default` themes.

```rust
fn main() {
    println!("Hello, VaraPress!");
}
```
````
