# Devto.nvim

<p align="center">This plugin integrates Neovim with <a href="https://dev.to">dev.to</a></p>

https://user-images.githubusercontent.com/12272702/175755820-a2b93f4b-fd5c-416b-8b9e-d981335ef75c.mov

https://user-images.githubusercontent.com/12272702/175755866-62be0b6c-31b2-4f45-81c7-f30cd3301d43.mov

## Summary

- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)

## Features

- View and edit your articles
- Create a new article
- View the feed of articles
- View an article from the feed

## Dependencies

You can use the plugin without any dependencies, but if you have any of the following plugins installed, the plugin will use them to enhance the experience:

- [Telescope](https://github.com/nvim-telescope/telescope.nvim) or [fzf-lua](https://github.com/ibhagwan/fzf-lua)

## Installation

### Using [lazy](https://github.com/folke/lazy.nvim):

```lua
{
    "Massolari/devto.nvim",
    dependencies = {
        "nvim-lua/plenary.nvim",
        -- Optional
        -- "nvim-telescope/telescope.nvim",
        -- or "ibhagwan/fzf-lua"
    }
}
```

### Using [packer](https://github.com/wbthomason/packer.nvim):

```lua
use {
    "Massolari/devto.nvim",
    requires = {
        "nvim-lua/plenary.nvim",
        -- Optional
        -- "nvim-telescope/telescope.nvim",
        -- or "ibhagwan/fzf-lua"
    }
}
```

## Setup

First, you need to generate an API key for the DEV platform.

For dev.to, you can do it in [the end of the extension's page](https://dev.to/settings/extensions)

With your API key, you just need to set it into the `DEVTO_API_KEY` environment variable.

## Usage

The plugin has the following commands and functions available in `devto-nvim` module:

| function        | command              | description                                                                                  |
| --------------- | -------------------- | -------------------------------------------------------------------------------------------- |
| `feed()`        | `:Devto feed`        | Shows fresh articles from the feed, then you can read it in Neovim or open it in the browser |
| `my_articles()` | `:Devto my_articles` | Shows all your articles, then you can pick one to edit                                       |
| `new_article()` | `:Devto new_article` | Asks for a title, then creates an article with the given title and open it to edit           |
| `open_by_url()` | `:Devto open_by_url` | Asks for a URL, then opens the article                                                       |

After you save the buffer it'll automatically be saved in the cloud.

## Contributing

Please, don't hesitate in contributing by creating issues and opening pull requests.

## Credits

This plugin design and idea was inspired by [octo.nvim](https://github.com/pwntester/octo.nvim)
