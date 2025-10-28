# BootPaper

A GNOME Shell extension that automatically sets a random wallpaper from a user-specified local directory every time you boot your system.

## Description

BootPaper is a simple yet effective GNOME extension that brings variety to your desktop by automatically selecting and applying a random wallpaper from your personal collection whenever you start your computer. Say goodbye to the same old wallpaper and enjoy a fresh desktop experience with every boot!

## Features

- 🎲 **Automatic Randomization**: Randomly selects a wallpaper from your chosen directory on every boot
- 📁 **Custom Directory Support**: Specify any local directory containing your wallpaper collection
- 🖼️ **Wide Format Support**: Works with common image formats (PNG, JPG, JPEG, BMP, etc.)
- ⚡ **Lightweight**: Minimal resource usage with no background processes
- 🔧 **Easy Configuration**: Simple setup through GNOME Shell extensions preferences

## Requirements

- GNOME Shell 3.36 or later
- A local directory with wallpaper images

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/ErZicky/BootPaper.git
   cd BootPaper
   ```

2. Copy the extension to your local extensions directory:
   ```bash
   mkdir -p ~/.local/share/gnome-shell/extensions/bootpaper@erzicky
   cp -r * ~/.local/share/gnome-shell/extensions/bootpaper@erzicky/
   ```

3. Restart GNOME Shell:
   - On X11: Press `Alt + F2`, type `r`, and press Enter
   - On Wayland: Log out and log back in

4. Enable the extension:
   ```bash
   gnome-extensions enable bootpaper@erzicky
   ```

   Or use GNOME Extensions app/Tweaks to enable it.

## Configuration

1. Open the Extensions application or use GNOME Tweaks
2. Find "BootPaper" in the list of extensions
3. Click the settings/preferences icon
4. Set the path to your wallpaper directory
5. (Optional) Configure additional settings like supported file formats

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

## Troubleshooting

### Extension Not Working

- Verify the extension is enabled: `gnome-extensions list --enabled | grep bootpaper`
- Check that your wallpaper directory path is correct and accessible
- Ensure your wallpaper directory contains valid image files
- Check GNOME Shell logs: `journalctl -f -o cat /usr/bin/gnome-shell`

### Wallpaper Not Changing

- Confirm the directory path is set correctly in extension preferences
- Verify the directory contains multiple image files
- Check file permissions on the wallpaper directory and images

## Contributing

Contributions are welcome! If you'd like to contribute to BootPaper:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v2.0 - see the [LICENSE](LICENSE) file for details.

## Author

Created by ErZicky

## Support

If you encounter any issues or have suggestions, please open an issue on the [GitHub repository](https://github.com/ErZicky/BootPaper/issues).
