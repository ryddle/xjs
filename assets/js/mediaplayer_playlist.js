class PlaylistEventTarget extends EventTarget {
    constructor() {
        super();
    }

    trigger(event, data) {
        this.dispatchEvent(new CustomEvent(event, { detail: data }));
    }
}

function _extends() {
    _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

/**
 * Checks if the given index is within the bounds of the array.
 *
 * @param {Array} array - The array to check against.
 * @param {number} index - The index to verify.
 * @return {boolean} - Returns true if the index is a number and lies within the array's bounds, otherwise false.
 */
const isIndexInBounds = (array, index) => {
    return typeof index === 'number' && index >= 0 && index < array.length;
};

/**
 * Randomizes array elements in place.
 *
 * @param {Array} array - The array to shuffle.
 */
const randomize = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

class MediaElement {
    #videoMimeTypes = ['video/mp4', 'video/m4v', 'video/webm', 'video/ogg', 'video/x-matroska', 'video/avi'];
    #audioMimeTypes = ['audio/mp3', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/x-wav', 'audio/webm'];
    constructor(parent, playlist) {
        let self = this;
        this.parent = parent;
        this.playlist = playlist;
        this.onended = function () { };
        this.audioElement = this.#createAudioElement();
        this.audioElement.addEventListener("timeupdate", (event) => {
            document.dispatchEvent(new CustomEvent('timeupdate', { detail: event }));    
        });
        this.videoElement = this.#createVideoElement();
        this.videoElement.addEventListener("timeupdate", (event) => {
            document.dispatchEvent(new CustomEvent('timeupdate', { detail: event }));    
        });

        this.parent.append(this.audioElement, this.videoElement);

        this.activeMediaElement = null;
        this.src = '';
        this.load = (source) => {
            let hasChanged = false;
            if (this.#audioMimeTypes.includes(source.type)) {
                if (this.activeMediaElement != this.audioElement) {
                    hasChanged = true;
                }
                this.activeMediaElement = this.audioElement;
                this.audioElement.src = source.src;
                this.videoElement.pause();
                this.videoElement.setStyle('display', 'none');
            } else if (this.#videoMimeTypes.includes(source.type)) {
                if (this.activeMediaElement != this.videoElement) {
                    hasChanged = true;
                }
                this.activeMediaElement = this.videoElement;
                this.videoElement.src = source.src;
                this.audioElement.pause();
                this.videoElement.setStyle('display', 'block');
            }
            if (hasChanged) {
                document.dispatchEvent(new CustomEvent('change', { detail: source }));
            }
        };
        this.play = () => {
            this.activeMediaElement.play();
        };
        this.pause = () => {
            this.activeMediaElement.pause();
        };
        this.togglePlay = () => {
            if (this.activeMediaElement.paused) {
                this.play();
            } else {
                this.pause();
            }
        };
        this.audioElement.onended = function () {
            self.onended();
        };
        this.videoElement.onended = function () {
            self.onended();
        };
    }

    #createAudioElement() {
        let audioElement = new Audio();
        audioElement.controls = true;
        audioElement.crossOrigin = 'anonymous';
        audioElement.style.display = 'none';

        audioElement.onloadeddata = () => {
            /* if (currentMediaElement.localName != "audio") {
                return;
            } */
            window.isPlayingVideo = false;
            //document.getElementById('player_progress').max = audioElement.duration;
            //document.getElementById('player_timer').innerText = secondsToHHMMSS(audioElement.currentTime) + '/' + secondsToHHMMSS(audioElement.duration);

            //source_src = this.playlist.getCurrentSource();

            //source_title = this.playlist.getCurrentTitle();
            //source_title = source_title.substr(source_title.lastIndexOf("/") + 1);

            //document.title = "Media Player - " + source_title;

            document.dispatchEvent(new CustomEvent('audio_loaded', { detail: audioElement }));

           /*  $.get(URLJoin(location.origin, '/api/getLyrics?title=', source_title, '&path=', source_src), function (data) {
                pl_lyrics_loader.style.display = 'none';
                data = JSON.parse(data);
                //updateInfoPanel(data);
                document.dispatchEvent(new CustomEvent('lyrics_loaded', { detail: data }));
            }).fail(function () {
                const data = { 'error': 'Lyrics not found.' };
                //updateInfoPanel(data);
                document.dispatchEvent(new CustomEvent('lyrics_loaded', { detail: data }));
            }); */
        };

        return audioElement;
    }

    #createVideoElement() {
        let videoElement = document.createElement("video");
        if (mediaList.length > 0) {
            if (videoMimeTypes.includes(mediaList[0].sources[0].type)) {
                videoElement.src = mediaList[0].sources[0].src;
            }
        }
        videoElement.controls = false;
        videoElement.crossOrigin = 'anonymous';
        videoElement.style.display = 'none';
        videoElement.style.maxWidth = '100%';
        videoElement.style.width = '100%';
        videoElement.style.maxHeight = 'calc(100vh - 290px)';
        videoElement.onloadeddata = () => {
            /* if (currentMediaElement.localName != "video") {
                return;
            } */
            window.isPlayingVideo = true;
            //document.getElementById('player_progress').max = videoElement.duration;
            //document.getElementById('player_timer').innerText = secondsToHHMMSS(videoElement.currentTime) + '/' + secondsToHHMMSS(videoElement.duration);

            //source_title = playlist.getCurrentItem().sources[0].filename;
            //document.title = "Media Player - " + source_title;

            document.dispatchEvent(new CustomEvent('video_loaded', { detail: videoElement }));
        };

        return videoElement;
    }
}

class PlaylistManager extends PlaylistEventTarget {
    #repeat_states = { off: 'off', all: 'all', one: 'one' };
    #shuffle_states = { off: 'off', on: 'on' };
    /**
     * Creates a new Playlist instance from a given array of items.
     *
     * @param {Object[]} items - An array of objects to initialize the playlist.
     * @param {Object} options - An options object to pass to the Playlist constructor
     * @return {PlaylistManager} A new Playlist instance populated with the given items.
     */
    static from(items, mediaElement, options) {
        const playlist = new PlaylistManager(mediaElement, options);
        playlist.setItems(items);
        return playlist;
    }
    constructor(mediaElement, options = {}) {
        super();
        /**
         * Validates and sanitizes the structure and sources of a single playlist item
         *
         * @param {Object} item - The playlist item to be processed. It should be an object with a `sources` array.
         * @return {Object|null} A sanitized playlist item object with valid sources, or null if the item is invalid.
         */
        this.sanitizePlaylistItem_ = item => {
            if (!item || typeof item !== 'object' || !Array.isArray(item.sources)) {
                this.onError_('Invalid playlist item: Must be an object with a `sources` array.');
                return null;
            }
            const validSources = item.sources.filter(source => source && typeof source === 'object' && typeof source.src === 'string' && typeof source.type === 'string');
            if (validSources.length === 0) {
                this.onError_('Invalid playlist item: No valid sources were found.');
                return null;
            }
            if (validSources.length < item.sources.length) {
                this.onWarn_('Some invalid playlist item sources were disregarded.');
            }
            const {
                poster = ''
            } = item;
            return _extends({}, item, {
                poster,
                sources: validSources
            });
        };

        this.mediaElement = mediaElement;
        this.items_ = [];
        this.currentIndex_ = 0;
        this.repeat_ = this.#repeat_states.off;//false;
        this.shuffle_ = this.#shuffle_states.off;//false;
        this.onError_ = options.onError || (() => { });
        this.onWarn_ = options.onWarn || (() => { });
        let playlist = this;
        this.mediaElement.onended = function () {
            if (playlist.repeat_ == playlist.#repeat_states.all) {
                if (playlist.currentIndex_ < playlist.items_.length - 1) {
                    playlist.currentIndex_++;
                } else {
                    playlist.currentIndex_ = 0;
                }
                //playlist.mediaElement_.src = playlist.items_[playlist.currentIndex_].sources[0].src;
                playlist.mediaElement.load(playlist.items_[playlist.currentIndex_].sources[0]);
                playlist.mediaElement.play();
                playlist.trigger('playlistitemloaded');
            } else if (playlist.repeat_ == playlist.#repeat_states.one) {
                playlist.mediaElement.play();
                playlist.trigger('playlistitemloaded');
            } else {
                if (playlist.currentIndex_ < playlist.items_.length - 1) {
                    playlist.currentIndex_++;
                    if (playlist.currentIndex_ < playlist.items_.length) {
                        //playlist.mediaElement_.src = playlist.items_[playlist.currentIndex_].sources[0].src;
                        playlist.mediaElement.load(playlist.items_[playlist.currentIndex_].sources[0]);
                        playlist.mediaElement.play();
                        playlist.trigger('playlistitemloaded');
                    }
                }
            }
        };
    }

    /**
     * Sets the playlist with a new list of items, overriding any existing items.
     *
     * @param {Object[]} items - An array of objects to set as the new playlist.
     * @return {Object[]} A shallow clone of the array of the playlist items.
     * @fires playlistchange - Triggered after the contents of the playlist are changed.
     *                         This event indicates that the current playlist has been updated.
     */
    setItems(items) {
        if (!Array.isArray(items)) {
            this.onError_('The playlist must be an array.');
            return [...this.items_];
        }
        const playlistItems = items.map(this.sanitizePlaylistItem_).filter(item => item !== null);
        if (playlistItems.length === 0) {
            this.onError_('Cannot set the playlist as none of the provided playlist items were valid.');
            return [...this.items_];
        }

        // If we have valid items, proceed to set the new playlist
        this.items_ = playlistItems;
        this.mediaElement.load(playlistItems[this.currentIndex_].sources[0]);
        this.trigger('playlistchange');
        return [...this.items_];
    }

    /**
     * Retrieves the current list of playlist items.
     *
     * @return {Object[]} A shallow clone of the current list of playlist items.
     */
    getItems() {
        return [...this.items_];
    }

    /**
     * Removes the current playlist in its entirety without unloading the currently loaded source
     */
    reset() {
        this.currentIndex_ = null;
        this.items_ = [];
        this.trigger('playlistchange');
    }

    /**
     * Enables repeat mode. When enabled, the playlist will loop back to the first item after the last item.
     */
    enableRepeat() {
        this.repeat_ = this.#repeat_states.all;
    }

    /**
     * Disables repeat mode. When disabled, the playlist will not loop back to the first item after the last item.
     */
    disableRepeat() {
        this.repeat_ = this.#repeat_states.off;
    }

    toggleRepeat() {
        if (this.repeat_ == this.#repeat_states.off) {
            this.enableRepeat();
        } else if (this.repeat_ == this.#repeat_states.all) {
            this.repeat_ = this.#repeat_states.one;
        } else {
            this.repeat_ = this.#repeat_states.off;
        }
    }

    /**
     * Retrieves the current repeat mode status of the playlist.
     *
     * @return {boolean} - True if repeat mode is enabled, false otherwise.
     */
    isRepeatEnabled() {
        return this.repeat_ !== this.#repeat_states.off;
    }

    getRepeatStatus() {
        return this.repeat_;
    }

    /**
     * Sets the current index to the specified value.
     *
     * @param {number} index - The index to be set as the current index.
     */
    setCurrentIndex(index) {
        if (!isIndexInBounds(this.items_, index)) {
            this.onError_('Cannot set index that is out of bounds.');
            return;
        }
        this.currentIndex_ = index;
    }

    /**
     * Retrieves the currently active playlist item object.
     *
     * @return {Object|undefined} The current playlist item if available, or undefined if no current item.
     */
    getCurrentItem() {
        return this.items_[this.currentIndex_];
    }

    /**
    * Retrieves the index of the currently active item in the playlist.
    *
    * @return {number} The current item's index if available, or -1 if no current item.
    */
    getCurrentIndex() {
        if (this.currentIndex_ === null) {
            return -1;
        }
        return this.currentIndex_;
    }

    /**
     * Retrieves the title of the currently active playlist item.
     *
     * @return {string} The filename of the current item's source if available, or an empty string if no current item.
     */
    getCurrentTitle() {
        if (this.currentIndex_ === null) {
            return '';
        }
        return this.items_[this.currentIndex_].sources[0].name;
    }

    /**
     * Retrieves the source URL of the currently active playlist item.
     *
     * @return {string} The URL of the current item's source if available, or an empty string if no current item.
     */
    getCurrentSource() {
        if (this.currentIndex_ === null) {
            return '';
        }
        return this.items_[this.currentIndex_].sources[0].src;
    }

    /**
     * Retrieves the playlist item object at the specified index.
     *
     * @param {number} index - The index of the item to retrieve.
     *
     * @return {Object|undefined} The item at the specified index if it exists, or undefined if not.
     */
    getIndex(index) {
        return this.items_[index];
    }

    /**
     * Get the index of the last item in the playlist.
     *
     * @return {number} The index of the last item in the playlist or -1 if there are no items.
     */
    getLastIndex() {
        return this.items_.length ? this.items_.length - 1 : -1;
    }

    /**
     * Calculates the index of the next item in the playlist.
     *
     * @return {number} The index of the next item or -1 if at the end of the playlist
     *                  and repeat is not enabled.
     */
    getNextIndex() {
        if (this.currentIndex_ === null) {
            return -1;
        }
        const nextIndex = (this.currentIndex_ + 1) % this.items_.length;
        return this.repeat_ === this.#repeat_states.all || nextIndex !== 0 ? nextIndex : -1;
    }

    /**
     * Calculates the index of the previous item in the playlist.
     *
     * @return {number} The index of the previous item or -1 if at the beginning of the playlist
     *                  and repeat is not enabled.
     */
    getPreviousIndex() {
        if (this.currentIndex_ === null) {
            return -1;
        }
        const previousIndex = (this.currentIndex_ - 1 + this.items_.length) % this.items_.length;
        return this.repeat_ === this.#repeat_states.all || previousIndex !== this.items_.length - 1 ? previousIndex : -1;
    }

    /**
     * Retrieves the number of items in the current playlist.
     *
     * @return {number} The number of items in the current playlist.
     */
    getLength() {
        return this.items_.length;
    }

    /**
     * A custom DOM event that is fired when new item(s) are added to the current
     * playlist (rather than replacing the entire playlist).
     *
     * @typedef  {Object} PlaylistAddEvent
     * @see      [CustomEvent Properties]{@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent}
     * @property {string} type - Always "playlistadd"
     *
     * @property {number} count - The number of items that were added.
     *
     * @property {number} index - The starting index where item(s) were added.
     */

    /**
     * Adds one or more items to the playlist at the specified index or at the end if the index is not provided or invalid.
     * If items is empty or contains only invalid items, no items are added, and an empty array is returned.
     *
     * @param {Object|Object[]} items - The item or array of items to add.
     * @param {number} [index] - The index at which to add the items. Defaults to the end of the playlist.
     * @return {Object[]} The array of added playlist items or an empty array if no valid items were provided.
     * @fires playlistadd - Triggered when items are successfully added.
     */
    add(items, index) {
        if (!Array.isArray(items)) {
            if (typeof items === 'object' && items !== null) {
                items = [items];
            } else {
                this.onError_('Provided items must be an object or an array of objects.');
                return [];
            }
        }
        const resolvedIndex = typeof index !== 'number' || index < 0 || index > this.items_.length ? this.items_.length : index;
        const beforeItems = this.items_.slice(0, resolvedIndex);
        const afterItems = this.items_.slice(resolvedIndex);
        const newItems = items.map(this.sanitizePlaylistItem_).filter(item => item !== null);
        if (newItems.length === 0) {
            this.onError_('Cannot add items to the playlist as none were valid.');
            return [];
        }
        this.items_ = [...beforeItems, ...newItems, ...afterItems];

        // Update currentIndex if inserting new elements earlier in the array than the current item
        if (resolvedIndex <= this.currentIndex_) {
            this.currentIndex_ += newItems.length;
        }
        this.trigger({
            type: 'playlistadd',
            count: newItems.length,
            index: resolvedIndex
        });
        return [...newItems];
    }

    /**
     * A custom DOM event that is fired when new item(s) are removed from the
     * current playlist (rather than replacing the entire playlist).
     *
     * This is fired synchronously as it does not affect playback.
     *
     * @typedef  {Object} PlaylistRemoveEvent
     * @see      [CustomEvent Properties]{@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent}
     * @property {string} type - Always "playlistremove"
     *
     * @property {number} count - The number of items that were removed.
     *
     * @property {number} index - The starting index where item(s) were removed.
     */

    /**
     * Removes a specified number of items from the playlist, starting at the given index.
     * Adjusts the current index if it falls within the range of the removed items.
     *
     * @param {number} index - The starting index to remove items from. If out of bounds, no removal occurs.
     * @param {number} [count=1] - The number of items to remove. Defaults to 1. Removal occurs only if count is a positive number.
     * @return {Object[]} An array of the removed playlist items.
     * @fires playlistremove - Triggered when items are successfully removed.
     */
    remove(index, count = 1) {
        if (!isIndexInBounds(this.items_, index)) {
            this.onError_('Index is out of bounds.');
            return [];
        }
        if (typeof count !== 'number' || count < 0) {
            this.onError_('Invalid count for removal.');
            return [];
        }

        // Constrain the removal count to the number of items that are actually available to remove starting at that index
        const actualCount = Math.min(count, this.items_.length - index);
        const removedItems = this.items_.splice(index, actualCount);
        this.adjustCurrentIndexAfterRemoval_(index, actualCount);
        this.trigger({
            type: 'playlistremove',
            count: actualCount,
            index
        });
        return [...removedItems];
    }

    /**
     * Sorts the playlist array.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
     * @param {Function} compare - A comparator function as per the native Array method.
     * @fires playlistsorted - Triggered after the playlist is sorted internally.
     */
    sort(compare) {
        if (!this.items_.length || typeof compare !== 'function') {
            return;
        }
        const currentItem = this.getCurrentItem();
        this.items_.sort(compare);

        // Update the current index after sorting
        this.currentIndex_ = this.items_.indexOf(currentItem);
        this.trigger('playlistsorted');
    }

    /**
     * Reverses the order of the items in the playlist.
     *
     * @fires playlistsorted - Triggered after the playlist is sorted internally.
     */
    reverse() {
        if (!this.items_.length) {
            return;
        }
        this.items_.reverse();

        // Invert the current index
        this.currentIndex_ = this.items_.length - 1 - this.currentIndex_;
        this.trigger('playlistsorted');
    }

    /**
     * Shuffle the contents of the list randomly.
     * If 'rest' is true, only items after the current item are shuffled.
     *
     * @param {boolean} [options.rest = true] - Shuffle only items after the current item.
     * @fires playlistsorted - Triggered after the playlist is sorted internally.
     */
    shuffle({
        rest = true
    } = {}) {
        const startIndex = rest ? this.currentIndex_ + 1 : 0;
        const itemsToShuffle = this.items_.slice(startIndex);
        if (itemsToShuffle.length <= 1) {
            return;
        }
        const currentItem = this.getCurrentItem();
        randomize(itemsToShuffle);
        if (rest) {
            this.items_.splice(startIndex, itemsToShuffle.length, ...itemsToShuffle);
        } else {
            this.items_ = itemsToShuffle;
        }

        // Set the new index of the current item
        this.currentIndex_ = this.items_.indexOf(currentItem);
        this.trigger('playlistsorted');
    }
    /**
     * Adjusts the current index after items have been removed from the playlist.
     * This method accounts for the removal position relative to the current index.
     *
     * @param {number} index - The starting index from which items were removed.
     * @param {number} actualCount - The actual number of items removed.
     * @private
     */
    adjustCurrentIndexAfterRemoval_(index, actualCount) {
        // If the removals are happening after the current item, no index adjustment is needed
        if (this.currentIndex_ < index) {
            return;
        }

        // Removals are happening before the current item, but the current item is not within the removed range
        if (this.currentIndex_ >= index + actualCount) {
            this.currentIndex_ -= actualCount;
            return;
        }

        // The current item is within the removed range
        this.currentIndex_ = null;
    }

    //new methods
    loadPlaylistItem(index) {
        if (!isIndexInBounds(this.items_, index)) {
            return false;
        }
        this.currentIndex_ = index;

        //this.mediaElement_.src = this.items_[index].sources[0].src;
        this.mediaElement.load(this.items_[index].sources[0]);
        this.mediaElement.play();
        this.trigger('playlistitemloaded', {
            index
        });
        return true;
    }

    togglePlay() {
        /*if (this.mediaElement_.paused) {
            this.mediaElement_.play();
        } else {
            this.mediaElement_.pause();
        }*/
        this.mediaElement.togglePlay();        
        this.trigger('playlisttoggleplay');

        //this.trigger('playlistitemloaded');
    }

    toggleShuffle() {
        this.shuffle();
    }

    prevTrack() {
        this.loadPlaylistItem(this.getPreviousIndex());
    }

    nextTrack() {
        this.loadPlaylistItem(this.getNextIndex());
    }
}