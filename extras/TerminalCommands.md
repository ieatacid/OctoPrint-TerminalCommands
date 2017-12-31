---
layout: plugin

id: TerminalCommands
title: OctoPrint-TerminalCommands
description: Add custom commands to terminal view
author: ieatacid
license: AGPLv3

# TODO
date: 2018-01-02

homepage: https://github.com/ieatacid/OctoPrint-TerminalCommands
source: https://github.com/ieatacid/OctoPrint-TerminalCommands
archive: https://github.com/ieatacid/OctoPrint-TerminalCommands/archive/master.zip

# TODO
# Set this to true if your plugin uses the dependency_links setup parameter to include
# library versions not yet published on PyPi. SHOULD ONLY BE USED IF THERE IS NO OTHER OPTION!
#follow_dependency_links: false

# TODO
tags:
- a list
- of tags
- that apply
- to your plugin
- (take a look at the existing plugins for what makes sense here)

# TODO
screenshots:
- url: /assets/img/terminal_tab.png
  alt: Terminal tab with command buttons
  caption: Terminal tab with command buttons
- url: /assets/img/terminal_commands_settings.png
  alt: Terminal Commands settings
  caption: Terminal Commands settings
- ...

# TODO
featuredimage: /assets/img/terminal_tab.png

# TODO
# You only need the following if your plugin requires specific OctoPrint versions or
# specific operating systems to function - you can safely remove the whole
# "compatibility" block if this is not the case.

compatibility:

  # List of compatible versions
  #
  # A single version number will be interpretated as a minimum version requirement,
  # e.g. "1.3.1" will show the plugin as compatible to OctoPrint versions 1.3.1 and up.
  # More sophisticated version requirements can be modelled too by using PEP440
  # compatible version specifiers.
  #
  # You can also remove the whole "octoprint" block. Removing it will default to all
  # OctoPrint versions being supported.

  octoprint:
  - 1.2.0

  # List of compatible operating systems
  #
  # Valid values:
  #
  # - windows
  # - linux
  # - macos
  # - freebsd
  #
  # There are also two OS groups defined that get expanded on usage:
  #
  # - posix: linux, macos and freebsd
  # - nix: linux and freebsd
  #
  # You can also remove the whole "os" block. Removing it will default to all
  # operating systems being supported.

  os:
  - linux
  - windows
  - macos
  - freebsd

---

**TODO**: Longer description of your plugin, configuration examples etc. This part will be visible on the page at
http://plugins.octoprint.org/plugin/TerminalCommands/
