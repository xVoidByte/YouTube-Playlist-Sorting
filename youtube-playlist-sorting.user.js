// ==UserScript==
// @name         YouTube-Playlist-Sorting
// @namespace    https://github.com/xVoidByte/
// @version      0.1
// @description  Adds 'A-Z' and 'Recently Added' sorting to YouTube playlists, with a custom dropdown for older playlists
// @author       xVoidByte
// @match        *://*.youtube.com/playlist?list=*
// @grant        none
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/xVoidByte/YouTube-Playlist-Sorting/main/youtube-playlist-sorting.user.js
// @downloadURL  https://raw.githubusercontent.com/xVoidByte/YouTube-Playlist-Sorting/main/youtube-playlist-sorting.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('YouTube-Playlist-Sorting userscript started.');

    // Function to sort playlist by A-Z (by title)
    function sortPlaylistByTitle(container, items) {
        items.sort((a, b) => {
            const aTitle = a.querySelector('#video-title').textContent.trim();
            const bTitle = b.querySelector('#video-title').textContent.trim();
            return aTitle.localeCompare(bTitle);
        });
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        items.forEach(item => container.appendChild(item));
        console.log('Playlist sorted alphabetically by title.');
    }

    // Function to sort playlist by Recently Added (newest first)
    function sortPlaylistByRecentlyAdded(container, items) {
        items.forEach((item, i) => {
            const index = item.querySelector('#index')?.textContent.trim() || 'N/A';
            const title = item.querySelector('#video-title').textContent.trim();
            console.log(`Item ${i}: Index=${index}, Title=${title}`);
        });

        items.sort((a, b) => {
            const aIndex = parseInt(a.querySelector('#index')?.textContent.trim() || '0');
            const bIndex = parseInt(b.querySelector('#index')?.textContent.trim() || '0');
            return bIndex - aIndex; // Descending order (newest at top)
        });

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        items.forEach(item => container.appendChild(item));
        console.log('Playlist sorted by Recently Added (newest first).');
    }

    // Main function to modify or create sorting dropdown
    function addOrModifySortDropdown() {
        try {
            const container = document.querySelector('#contents.ytd-playlist-video-list-renderer');
            if (!container) {
                console.error('Container not found. Ensure you are on a YouTube playlist page (e.g., https://www.youtube.com/playlist?list=PLAYLIST_ID).');
                return;
            }

            const items = Array.from(container.querySelectorAll('ytd-playlist-video-renderer'));
            if (items.length === 0) {
                console.error('No playlist items found. Ensure the playlist has videos.');
                return;
            }

            const dropdownList = document.querySelector('tp-yt-paper-listbox#menu.dropdown-content');
            if (dropdownList) {
                console.log('Native YouTube sorting dropdown found. Injecting custom options.');
                const existingCustomOptions = dropdownList.querySelectorAll('.custom-sort-option');
                existingCustomOptions.forEach(option => option.remove());

                const azOption = document.createElement('a');
                azOption.className = 'yt-simple-endpoint style-scope yt-dropdown-menu custom-sort-option';
                azOption.setAttribute('tabindex', '-1');
                azOption.setAttribute('aria-selected', 'false');
                const azItem = document.createElement('tp-yt-paper-item');
                azItem.className = 'style-scope yt-dropdown-menu';
                azItem.setAttribute('role', 'option');
                azItem.setAttribute('tabindex', '0');
                azItem.setAttribute('aria-disabled', 'false');
                const azItemBody = document.createElement('tp-yt-paper-item-body');
                azItemBody.className = 'style-scope yt-dropdown-menu';
                const azItemDiv = document.createElement('div');
                azItemDiv.className = 'item style-scope yt-dropdown-menu';
                azItemDiv.textContent = 'Sort A-Z';
                azItemBody.appendChild(azItemDiv);
                azItem.appendChild(azItemBody);
                azOption.appendChild(azItem);

                const recentOption = document.createElement('a');
                recentOption.className = 'yt-simple-endpoint style-scope yt-dropdown-menu custom-sort-option';
                recentOption.setAttribute('tabindex', '-1');
                recentOption.setAttribute('aria-selected', 'false');
                const recentItem = document.createElement('tp-yt-paper-item');
                recentItem.className = 'style-scope yt-dropdown-menu';
                recentItem.setAttribute('role', 'option');
                recentItem.setAttribute('tabindex', '0');
                recentItem.setAttribute('aria-disabled', 'false');
                const recentItemBody = document.createElement('tp-yt-paper-item-body');
                recentItemBody.className = 'style-scope yt-dropdown-menu';
                const recentItemDiv = document.createElement('div');
                recentItemDiv.className = 'item style-scope yt-dropdown-menu';
                recentItemDiv.textContent = 'Sort Recently Added';
                recentItemBody.appendChild(recentItemDiv);
                recentItem.appendChild(recentItemBody);
                recentOption.appendChild(recentItem);

                azOption.addEventListener('click', () => {
                    sortPlaylistByTitle(container, items);
                    updateSelectedOption(dropdownList, azOption);
                });

                recentOption.addEventListener('click', () => {
                    sortPlaylistByRecentlyAdded(container, items);
                    updateSelectedOption(dropdownList, recentOption);
                });

                function updateSelectedOption(dropdown, selectedOption) {
                    dropdown.querySelectorAll('a').forEach(opt => {
                        opt.setAttribute('aria-selected', 'false');
                        opt.querySelector('tp-yt-paper-item').classList.remove('iron-selected');
                    });
                    selectedOption.setAttribute('aria-selected', 'true');
                    selectedOption.querySelector('tp-yt-paper-item').classList.add('iron-selected');
                }

                dropdownList.appendChild(azOption);
                dropdownList.appendChild(recentOption);
                console.log('Custom sort options (Sort A-Z, Sort Recently Added) added to the existing YouTube dropdown.');
            } else {
                console.log('No native YouTube sorting dropdown found. Creating custom dropdown.');
                const existingCustomDropdown = document.getElementById('custom-sort-dropdown');
                if (existingCustomDropdown) {
                    existingCustomDropdown.remove();
                }

                const dropdown = document.createElement('select');
                dropdown.id = 'custom-sort-dropdown';
                dropdown.style.width = '98%';
                dropdown.style.padding = '12px 35px';
                dropdown.style.fontSize = '1.7em';
                dropdown.style.fontFamily = 'Roboto, Arial, sans-serif';
                dropdown.style.color = '#fff';
                dropdown.style.backgroundColor = '#1a1a1a';
                dropdown.style.border = '1px solid #3f3f3f';
                dropdown.style.borderRadius = '4px';
                dropdown.style.zIndex = '1000';
                dropdown.style.position = 'relative';
                dropdown.style.boxSizing = 'border-box';
                dropdown.style.margin = '10px 35px';
                dropdown.style.cursor = 'pointer';

                const style = document.createElement('style');
                style.textContent = `
                    #custom-sort-dropdown option {
                        background-color: #2a2a2a;
                        color: #fff;
                        font-family: Roboto, Arial, sans-serif;
                        font-size: 1em;
                        padding: 8px;
                    }
                    #custom-sort-dropdown:focus {
                        outline: none;
                        border-color: #606060;
                    }
                `;
                document.head.appendChild(style);

                const placeholderOption = document.createElement('option');
                placeholderOption.value = '';
                placeholderOption.textContent = 'Sort Playlist';
                placeholderOption.disabled = true;
                placeholderOption.selected = true;
                dropdown.appendChild(placeholderOption);

                const azOption = document.createElement('option');
                azOption.value = 'az';
                azOption.textContent = 'Sort A-Z';
                dropdown.appendChild(azOption);

                const recentOption = document.createElement('option');
                recentOption.value = 'recent';
                recentOption.textContent = 'Sort Recently Added';
                dropdown.appendChild(recentOption);

                dropdown.addEventListener('change', (event) => {
                    if (event.target.value === 'az') {
                        sortPlaylistByTitle(container, items);
                    } else if (event.target.value === 'recent') {
                        sortPlaylistByRecentlyAdded(container, items);
                    }
                });

                const headerContainer = document.querySelector('#meta.ytd-playlist-sidebar-primary-info-renderer');
                if (headerContainer) {
                    headerContainer.appendChild(dropdown);
                    console.log('Custom dropdown added to playlist header (meta section).');
                } else {
                    container.parentElement.prepend(dropdown);
                    console.log('Custom dropdown added above playlist videos (fallback).');
                }
            }
        } catch (error) {
            console.error('Error in YouTube-Playlist-Sorting userscript:', error);
        }
    }

    // Function to wait for the playlist container to load
    function waitForPlaylistContainer() {
        const maxAttempts = 20;
        let attempts = 0;

        const checkContainer = setInterval(() => {
            const container = document.querySelector('#contents.ytd-playlist-video-list-renderer');
            attempts++;

            if (container) {
                console.log('Playlist container found. Running addOrModifySortDropdown.');
                clearInterval(checkContainer);
                addOrModifySortDropdown();
            } else if (attempts >= maxAttempts) {
                console.error('Playlist container not found after maximum attempts. Script aborted.');
                clearInterval(checkContainer);
            }
        }, 500);
    }

    // Run the script after DOM content is loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM content loaded. Starting waitForPlaylistContainer.');
        waitForPlaylistContainer();
    });

    // Fallback: Run immediately in case DOMContentLoaded has already fired
    if (document.readyState !== 'loading') {
        console.log('DOM already loaded. Starting waitForPlaylistContainer immediately.');
        waitForPlaylistContainer();
    }
})();