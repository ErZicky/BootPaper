# BootPaper

<p align="center">
  <img src="media/ico.jpg" alt="BootPaper Extension Icon" width="412" height="412">
</p>


A simple GNOME Shell extension that automatically sets a random wallpaper from a user-specified local directory every time you boot your system.

## Compatibility

The extension was tested only with GNOME 48 and 49, but it should work without issue from 45 and up.

## Installation

To install the latest version of the extension head to the Official GNOME Extensions website.

[insert button when approved]

Remember to set a folder in the extension settings for it to work.

## Usage

Once configured, BootPaper works automatically:

1. Ensure your wallpaper directory contains images you want to use
2. The extension will automatically select and apply a random wallpaper each time you boot your system
3. No manual intervention required!

## How It Works

BootPaper monitors system startup and:
1. Reads the list of image files from your configured directory
2. Randomly selects one image from the collection
3. Sets it as your desktop wallpaper using GNOME's background settings
4. Waits for the next boot to repeat the process

### Important to know

The wallpaper will change after a 3 second wait after startup. This is to ensure that the desktop environment is done loading.

## Support BootPaper

BootPaper is provided free of charge. If you enjoy using this extension and wish to help support the creator and the project, feel free to send a coffee my way!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/N4N179BUE)

## Contributing

Contributions are more than welcome! This is my first extension so there's probaly a lot of improvement to be made. The general steps to contribute are:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Just make sure to respect these simple rules on your commit message:

1. Commits should start with a Capital letter
2. Commits should be written in present tense (e.g. Add new amazing feature instead of Added amazing new feature).

## License

This project is distributed **as is without any warranty** licensed under the GNU General Public License v2.0 - see the [LICENSE](LICENSE) file for details.

