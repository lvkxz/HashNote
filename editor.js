document.addEventListener('DOMContentLoaded', () => {

    //#region Editor

    const editor = document.getElementById('editor');

    // Helper Functions for Text <-> Byte Array Conversion 

    function strToUint8Array(str) {
        return new TextEncoder().encode(str);
    }

    function uint8ArrayToStr(arr) {
        return new TextDecoder().decode(arr);
    }

    // Helper Functions for Base64url Encoding/Decoding 

    function base64ToBase64Url(base64) {
        // Replace '+' with '-' and '/' with '_'
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function base64UrlToBase64(base64url) {
        // Replace '-' with '+' and '_' with '/'
        let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding '=' if necessary
        while (base64.length % 4) {
            base64 += '=';
        }
        return base64;
    }

    // Helper Functions for Gzip Compression (Using Pako)

    function compress(text) {
        const data = strToUint8Array(text);
        const compressed = pako.deflate(data, { level: 9 }); // Level 9 is max compression
        return compressed;
    }

    function decompress(compressedArray) {
        const decompressed = pako.inflate(compressedArray);
        return uint8ArrayToStr(decompressed);
    }

    // Load text from the URL
    function loadTextFromURL() {
        // Get the path segment after the domain, e.g., '/aGVsbG8xMjM='
        let path = window.location.pathname.substring(1);

        if (path) {
            try {
                // Convert base64url to standard base64
                const base64 = base64UrlToBase64(path);
                // Decode standard base64 string into a raw byte string
                const binaryString = atob(base64);
                // 3. Convert binary string to a Uint8Array for Pako
                const compressedArray = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    compressedArray[i] = binaryString.charCodeAt(i);
                }
                // DECOMPRESS the data
                const text = decompress(compressedArray);
                // Set the editor's content
                editor.value = text;
            } catch (e) {
                console.error("Error decoding URL path:", e);
                // Optionally clear the path if decoding fails
                window.history.replaceState(null, '', window.location.origin);
            }
        }
    }

    // --- Update URL with Editor Text ---

    function updateURL() {
        const text = editor.value;

        if (text === "") {
            // If empty, return to the base URL
            window.history.replaceState(null, '', window.location.origin);
            return;
        }

        try {
            // COMPRESS the text
            const compressedArray = compress(text);
            
            // Convert the compressed Uint8Array to a binary string
            let binaryString = '';
            compressedArray.forEach(byte => {
                binaryString += String.fromCharCode(byte);
            });

            // Encode the binary string to standard base64
            const base64 = btoa(binaryString);
            
            // Convert standard base64 to base64url
            const base64url = base64ToBase64Url(base64);

            // Update the URL path
            const newUrl = `${window.location.origin}/${base64url}`;
            window.history.replaceState(null, '', newUrl);
        } catch (e) {
            console.error("Error encoding text:", e);
        }
    }

    // --- Event Listeners ---

    // Update the URL every time the user types (debounce is recommended for performance)
    let timeout = null;
    editor.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(updateURL, 300); // Wait 300ms after the last keypress
    });

    loadTextFromURL();

    //#endregion

    //#region Light / Dark Mode

    // --- Dark Mode Logic ---

    const modeToggle = document.getElementById('mode-toggle'); 
    const body = document.body;

    function enableLightMode() {
        body.classList.add('light-mode'); 
        localStorage.setItem('theme', 'light');
        modeToggle.checked = true;
    }

    function disableLightMode() {
        body.classList.remove('light-mode'); 
        localStorage.setItem('theme', 'dark');
        modeToggle.checked = false;
    }

    // Check for system preference or saved preference on load
    function loadUserPreference() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'light') {
            enableLightMode();
        } else {
            disableLightMode(); 
        }
    }

    // Toggle function on checkbox change
    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) { 
            enableLightMode();
        } else { 
            disableLightMode();
        }
    });

    loadUserPreference();

    //#endregion
}); 