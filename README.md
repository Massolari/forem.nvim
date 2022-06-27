# Forem.nvim

<p align="center">This plugin integrates Neovim with Forem platforms (for example, dev.to)</p>

https://user-images.githubusercontent.com/12272702/175755820-a2b93f4b-fd5c-416b-8b9e-d981335ef75c.mov

https://user-images.githubusercontent.com/12272702/175755866-62be0b6c-31b2-4f45-81c7-f30cd3301d43.mov

## Summary

- [Features](#features)
- [Dependencies](#dependencies)
  - [Required](#required)
  - [Optional](#optional)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)

## Features

- View and edit your articles
- Create a new article

## Dependencies

### Required

- [Plenary](https://github.com/nvim-lua/plenary.nvim)
- [Telescope](https://github.com/nvim-telescope/telescope.nvim)

### Optional

- [Notify](https://github.com/rcarriga/nvim-notify)

## Installation

Using [packer](https://github.com/wbthomason/packer.nvim):

```lua
use {
    "Massolari/forem.nvim",
    run = "make",
    requires = {
        "nvim-lua/plenary.nvim",
        "nvim-telescope/telescope.nvim"
    }
}
```

## Setup

First, you need to generate an API key for the DEV platform.

For dev.to, you can do it in [the end of the extension's page](https://dev.to/settings/extensions)

With your API key, you need to pass it in the `setup` function:

```lua
require'forem-nvim'.setup {
    api_key = "" -- Your API Key
}
```

## Usage

The plugin has the following commands and functions available in `forem-nvim` module:

| function | command | description |
| --- | --- | --- |
| `feed()` | `:Forem feed` | Shows fresh articles from the feed, then you can read it in Neovim or open it in the browser |
| `my_articles()` | `:Forem my_articles` | Shows all your articles, then you can pick one to edit |
| `new_article()` | `:Forem new_article` | Asks for a title, then creates an article with the given title and open it to edit |

After you save the buffer it'll automatically be saved in the cloud.

**Note: these functions will only be available after the `setup` call**

## Contributing

Please, don't hesitate in contributing by creating issues and opening pull requests.

## Credits

This plugin design and idea was inspired by [octo.nvim](https://github.com/pwntester/octo.nvim)
