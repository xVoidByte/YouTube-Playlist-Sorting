# YouTube Playlist Sorting

A Tampermonkey userscript that enhances YouTube playlists by adding **Sort A-Z** (alphabetical by title) and **Sort Recently Added** (newest videos first) options. For modern playlists, it injects these options into YouTube’s native sorting dropdown. For older playlists without a native sort button, it creates a custom, modern-looking dropdown that blends seamlessly with YouTube’s UI.

***Last updated: May 24, 2025***

## Features
- **Sort A-Z**: Sorts playlist videos alphabetically by title.
- **Sort Recently Added**: Sorts videos by their addition order, with the newest at the top (based on playlist index).
- **Universal Compatibility**: Works on modern playlists with YouTube’s native sort button and older playlists without it.
- **Custom Dropdown**: For older playlists, adds a full-width dropdown with a dark, modern design (white text, greyish background, Roboto font) that matches YouTube’s UI.
- **Automatic Updates**: Configured to pull updates from GitHub when new versions are released.

## Installation

### Prerequisites
- A Chromium-based browser (Brave _(Recommended)_, Google Chrome,  Edge).
- The Tampermonkey extension installed.

### Step-by-Step Installation Guide

1. **Install Tampermonkey**:
   - Open your browser and go to the [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).
   - Click **Add to Chrome** (or **Add to Edge** for Microsoft Edge).
   - In the confirmation popup, click **Add extension**.
   - Verify Tampermonkey is installed by checking for its icon (a black square with two white arrows) in the browser toolbar.

2. **Install the Userscript**:
   - Visit the raw script URL: [https://raw.githubusercontent.com/xVoidByte/YouTube-Playlist-Sorting/main/youtube-playlist-sorting.user.js](https://raw.githubusercontent.com/xVoidByte/YouTube-Playlist-Sorting/main/youtube-playlist-sorting.user.js).
   - Tampermonkey will detect the script and display an installation prompt.
   - Click **Install** in the Tampermonkey prompt.
   - Alternatively, if the prompt doesn’t appear:
     - Copy the script content from the raw URL.
     - Open the Tampermonkey dashboard (click the Tampermonkey icon > **Dashboard**).
     - Click the **+** tab to create a new script.
     - Paste the script, then click **File > Save** or press `Ctrl + S`.

3. **Verify Installation**:
   - Open the Tampermonkey dashboard and confirm the script (`YouTube-Playlist-Sorting`) is listed and enabled (green checkmark).
   - Visit a YouTube playlist (`https://www.youtube.com/playlist?list=PLAYLIST_ID`).
   - Check the console (`Ctrl + Shift + J`) for logs like `YouTube-Playlist-Sorting userscript started.` and `Playlist container found.`.

4. **Using the Script**:
   - **Modern Playlists (with Sort Button)**:
     - Click the native sort button (near Play All or Shuffle).
     - Look for **Sort A-Z** and **Sort Recently Added** at the bottom of the dropdown.
     - Select an option to sort the playlist.
   - **Older Playlists (without Sort Button)**:
     - Look for a custom dropdown labeled **Sort Playlist** near the playlist title or above the video list.
     - Select **Sort A-Z** or **Sort Recently Added**.
   - **Test Sorting**:
     - Add a new video to the playlist.
     - Select **Sort Recently Added** to confirm the newest video appears at the top.

5. **Automatic Updates**:
   - The script is configured to check for updates automatically via GitHub.
   - To manually check, open the Tampermonkey dashboard, right-click the script, and select **Check for updates**.
   - When a new version is pushed to the repository, Tampermonkey will prompt you to update.

### Troubleshooting

- **Script Not Running**:
  - Ensure Tampermonkey is enabled (toolbar icon active, not greyed out).
  - Verify the script is enabled in the Tampermonkey dashboard.
  - Check the console (`Ctrl + Shift + J`) for errors (i.e. `Error in YouTube-Playlist-Sorting userscript: ...`).
  - Confirm the URL matches `*://*.youtube.com/playlist?list=*` (i.e., `https://www.youtube.com/playlist?list=PLAYLIST_ID`).
- **Custom Dropdown Not Appearing**:
  - Inspect the page (right-click > Inspect) and search for `custom-sort-dropdown` - check for CSS issues (i.e., `display: none`).
  - Share console logs or errors by opening an `Issue`.
- **Sorting Issues**:
  - If **Sort Recently Added** doesn’t place the newest video at the top, note the console logs (i.e., `Item 0: Index=1, Title=New Video`) and report them.
- **Ad Blocker Interference**:
  - Errors like `requestStorageAccessFor: Permission denied` are unrelated but may indicate ad blocker issues - add an exception for `youtube.com` in your ad blocker.
- **YouTube DOM Changes**:
  - If YouTube updates its interface, the script may break. Report issues to the repository with console errors.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

### MIT License Summary
The MIT License allows anyone to:
- Use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.
- Include the software in commercial or non-commercial projects.

Requirements:
- The above copyright notice and permission notice must be included in all copies or substantial portions of the software.
- The software is provided "as is," without warranty of any kind.

For the full license text, see [LICENSE](LICENSE).

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make changes and commit (`git commit -m "Add your feature"`).
4. Push to your fork (`git push origin feature/your-feature`).
5. Open a pull request.

Please include a description of your changes and test them on various YouTube playlists.

## Issues
If you encounter bugs or have feature requests:
- Open an issue on the [GitHub Issues page](https://github.com/xVoidByte/YouTube-Playlist-Sorting/issues).
- Include:
  - A description of the problem or feature.
  - Console logs (`Ctrl + Shift + J`).
  - The playlist URL (i.e., `https://www.youtube.com/playlist?list=PLAYLIST_ID`).
  - Browser and Tampermonkey versions.
