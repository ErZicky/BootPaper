/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import Gio from 'gi://Gio'; // for files and  directory
import GLib from 'gi://GLib'; // for async
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// gsetting schema for bg
const BACKGROUND_SCHEMA = 'org.gnome.desktop.background';

const PICTURE_URI_KEY = 'picture-uri';

const PICTURE_URI_DARK_KEY = 'picture-uri-dark';

const WALLPAPERS_DIRECTORY_KEY = 'wallpapers-directory';




export default class BootPaperExtension extends Extension {
    enable() {
         this._settings = this.getSettings();

         this._backgroundSettings = new Gio.Settings({ schema: BACKGROUND_SCHEMA });


         // wait a few seconds to be sure desktop loaded
        this._startupId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 3, () => {
            this._setRandomWallpaper();
            return GLib.SOURCE_REMOVE;
        });
         
    }

    disable() {

        if (this._startupId) {
            GLib.source_remove(this._startupId);
            this._startupId = 0;
        }

        this._settings = null;
        this._backgroundSettings = null;
        
    }


    _isValidImage(filename) {
        const lowerName = filename.toLowerCase();
        return VALID_EXTENSIONS.some(ext => lowerName.endsWith(ext));
    }


    _setRandomWallpaper() {
       const folderPath = this._settings.get_string(WALLPAPERS_DIRECTORY_KEY);
      
      
        if (!folderPath) {
           Main.notify(
                _('Wallpapers directory does not exist!'), 
                _('Change directory in settings for BootPaper to work.')
            );
            return;
        }

        const folder = Gio.File.new_for_path(folderPath);
 
        // Check if directory exists and is valid
        if (!folder.query_exists(null)) {
            console.log(`BootPaper: directory does not exist: ${folderPath}`);
            return;
        }

        if (folder.query_file_type(Gio.FileQueryInfoFlags.NONE, null) !== Gio.FileType.DIRECTORY) {
            console.log(`BootPaper: ${folderPath} is not a directory.`);
            return;
        }


        folder.enumerate_children_async(
            'standard::name',
            Gio.FileQueryInfoFlags.NONE,
            GLib.PRIORITY_DEFAULT,
            null, // Cancellable
            (source, res) => {
                try {
                    const enumerator = source.enumerate_children_finish(res);
                    const wallpapers = [];
                    let info;

                    // Iterate on files.
                    while ((info = enumerator.next_file(null)) !== null) {
                        const fileName = info.get_name();

                        // Check if it's a regular file and a valid image type
                        if (info.get_file_type() === Gio.FileType.REGULAR && this._isValidImage(fileName)) {
                            const filePath = GLib.build_filenamev([folderPath, fileName]);
                            wallpapers.push(filePath);
                        }
                    }
                    enumerator.close(null);

                    if (wallpapers.length === 0) {
                        console.log(`BootPaper: no images in: ${folderPath}`);
                        return;
                    }

                    
                    // Select a random image path
                    const randomIndex = Math.floor(Math.random() * wallpapers.length);
                    const selectedPath = wallpapers[randomIndex];
                    
                    
                    // Convert the file path to a Gio.File URI
                    const wallpaperUri = Gio.File.new_for_path(selectedPath).get_uri();

                    // Set the wallpaper URI for both light and dark modes
                    this._backgroundSettings.set_string(PICTURE_URI_KEY, wallpaperUri);
                    this._backgroundSettings.set_string(PICTURE_URI_DARK_KEY, wallpaperUri); 

                    

                } catch (e) {
                    logError(e, 'BootPaper: Error during process');
                }
            }
        );
    }

}
