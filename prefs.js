import Gtk from 'gi://Gtk'
import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import GObject from 'gi://GObject';


import {
    ExtensionPreferences,
    gettext as _
} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

import * as Config from 'resource:///org/gnome/Shell/Extensions/js/misc/config.js';


export default class BootPaperPreferences extends ExtensionPreferences {




    fillPreferencesWindow(window) {
        // get GSettings object
        const settings = this.getSettings();

        // new page
        const page = new Adw.PreferencesPage({

            title: _('General'),
            icon_name: 'org.gnome.Settings-symbolic',
        });
        window.add(page);

        // new group for page
        const group = new Adw.PreferencesGroup({
            title: _('Wallpaper Settings'),
            description: _('Configure the source of your random wallpapers.'),
        });
        page.add(group);

        //new row for group
        const row = new Adw.ActionRow({
            title: _('wallpaper folder'),
            subtitle: _('Select the local directory for wallpapers.'),

        });
        group.add(row);


        const folderButton = new Gtk.Button({

            icon_name: 'folder-open-symbolic',
            tooltip_text: _('Select directory...'),
            valign: Gtk.Align.CENTER

        });

        row.add_suffix(folderButton);
        row.activatable_widget = folderButton;

        //button logic
        folderButton.connect('clicked', () => {
            const dialog = new Gtk.FileChooserNative({
                title: _('Select Wallpapers Folder'),
                action: Gtk.FileChooserAction.SELECT_FOLDER,
                transient_for: window,
                modal: true,
            });

            dialog.connect('response', (self, response) => {
                if (response === Gtk.ResponseType.ACCEPT) {
                    const file = dialog.get_file();
                    const folderPath = file.get_path();
                    settings.set_string('wallpapers-directory', folderPath);
                    row.subtitle = folderPath;
                }
                dialog.destroy();
            });

            dialog.show();
        });


        const initialPath = settings.get_string('wallpapers-directory');
        if (initialPath) {
            row.subtitle = initialPath;
        } else {
            row.subtitle = _('No folder selected yet.');
        }



        //donate page 

        const donPage = new Adw.PreferencesPage({

            title: _('Donate'),
            icon_name: 'emblem-favorite-symbolic',
        });

        window.add(donPage);


        const donGroup = new Adw.PreferencesGroup({
            title: _('Support BootPaper Developer'),
            description: _('Thank you for using BootPaper! If your enjoying it and would like to support it, please consider making a donation')
        });


        //new row for group
        const Donrow = new Adw.ActionRow({
            title: _('Buy me a coffee on ko-fi'),
            subtitle: _(''),

        });


        const kofiPicture = new Gtk.Image({
            file: this.dir.get_child('media').get_child('klogo.png').get_path(),
            valign: Gtk.Align.CENTER,
            pixel_size: 48,
        });


        const kofiButton = new Gtk.Button({
            icon_name: 'adw-external-link-symbolic',
            css_classes: ['pill'],
            valign: Gtk.Align.CENTER,
        });

        kofiButton.connect('clicked', () => {
            const uri = 'https://ko-fi.com/zetadev';

            try {

                Gio.AppInfo.launch_default_for_uri(uri, null);
            } catch (e) {
                logError(e, 'Something went wrong');
            }
        });

        Donrow.add_suffix(kofiButton);
        Donrow.add_prefix(kofiPicture);

        donGroup.add(Donrow);


        donPage.add(donGroup);

        //about page
        const abtPage = new Adw.PreferencesPage({

            title: _('About'),
            icon_name: 'info-outline-symbolic',
        });

        window.add(abtPage);

        const headerBox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            halign: Gtk.Align.CENTER,
            spacing: 6,
            margin_top: 24,
            margin_bottom: 12,
        });

        const iconImage = new Gtk.Image({
            file: this.dir.get_child('media').get_child('ico.jpg').get_path(),
            pixel_size: 146,
            halign: Gtk.Align.CENTER,
        });

        const titleLabel = new Gtk.Label({
            label: 'BootPaper',
            css_classes: ['title-1'],
            halign: Gtk.Align.CENTER,
        });

        const subtitleLabel = new Gtk.Label({
            label: _('Simple wallpaper randomizer on boot for GNOME.'),
            css_classes: ['dim-label'],
            halign: Gtk.Align.CENTER,
            wrap: true,
        });


        const versionPill = new Gtk.Button({
            label: `${this.metadata.version}`,
            css_classes: ['pill', 'accent', 'heading'],
            sensitive: true,
            halign: Gtk.Align.CENTER,
        });
        versionPill.set_margin_top(6);
        versionPill.set_margin_bottom(6);

        headerBox.append(iconImage);
        headerBox.append(titleLabel);
        headerBox.append(subtitleLabel);
        headerBox.append(versionPill);

        const headerGroup = new Adw.PreferencesGroup();
        headerGroup.add(headerBox);
        abtPage.add(headerGroup);



        const abtGroup = new Adw.PreferencesGroup();
        abtPage.add(abtGroup);




        const gnomeRow = new Adw.ActionRow({
            title: _('GNOME Version'),
            subtitle: Config.PACKAGE_VERSION.toString(),
        });
        abtGroup.add(gnomeRow);

        // author
        const authorRow = new Adw.ActionRow({
            title: _('Created by'),
            subtitle: 'ZetaDev',
        });
        abtGroup.add(authorRow);


        const gitRow = new Adw.ActionRow({
            title: _('GitHub'),
        });
        const gitButton = new Gtk.Button({
            icon_name: 'adw-external-link-symbolic',
            valign: Gtk.Align.CENTER,
        });
        gitButton.connect('clicked', () => {
            Gio.AppInfo.launch_default_for_uri('https://github.com/ZetaDev/BootPaper', null);
        });

        gitRow.add_suffix(gitButton);
        gitRow.activatable_widget = gitButton;
        abtGroup.add(gitRow);



        const warrantyLabel = _('This program comes with absolutely no warranty.');
        const urlLabel = _('See the <a href="%s">%s</a> for details.').format('https://gnu.org/licenses/old-licenses/gpl-2.0.html', _('GNU General Public License, version 2 or later'));

        const gnuSofwareLabel = new Gtk.Label({
            label: `${_(warrantyLabel)}\n${_(urlLabel)}`,
            use_markup: true,
            justify: Gtk.Justification.CENTER,
        });
        gnuSofwareLabel.set_margin_top(12);
        gnuSofwareLabel.set_margin_bottom(12);

        const footerGroup = new Adw.PreferencesGroup();
        footerGroup.add(gnuSofwareLabel);
        abtPage.add(footerGroup);



    }
}