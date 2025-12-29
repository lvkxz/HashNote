# HashNote: Compressed URL Text Editor

**HashNote** is a minimalist, single-page text editor designed for speed and sharing. It automatically compresses the entered text using Gzip (`pako`) and encodes the result directly into the URL path (Base64URL). This allows for instant, shareable links to notes without needing a backend database.



## ✨ Key Features

* **URL-Based Sharing:** All content is stored in the URL, making every note instantly shareable via a single link.
* **Gzip Compression:** Utilizes `pako` (Gzip) to significantly compress text before encoding, allowing for much longer notes than standard Base64 URL schemes.
* **Automatic Synchronization:** The URL is updated dynamically as you type.
* **Dark & Light Mode Toggle:** Seamlessly switch between dark mode (default) and light mode with a convenient toggle switch.
* **Minimalist Interface:** Clean, distraction-free editing experience.

## 💻 Tech Stack

* **HTML5/CSS3:** Core structure and styling.
* **JavaScript:** Core application logic, event handling, and DOM manipulation.
* **Pako:** A high-speed JavaScript library for Gzip (deflate/inflate) compression and decompression.

## 🚀 Getting Started

To run HashNote locally, you must serve the files via a simple HTTP server, as some browser functionalities (like URL path parsing) may be restricted when opening the file directly using the `file://` protocol.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/lvkxz/HashNote.git
    cd HashNote
    ```

2.  **Start the Local HTTP Server:**

    ### A. Using the included `server.py` (Recommended)

    If you have Python 3 installed, you can simply run the provided script, which automatically starts the server on port 8000.

    ```bash
    python3 server.py
    ```

    ### B. Manual Python Server (Alternative)

    If you prefer starting the server manually or need to use a different port, you can use Python's built-in `http.server` module directly from the command line:

    | Python Version | Command |
    | :--- | :--- |
    | **Python 3+** | `python3 -m http.server 8000` |
    | **Python 2** | `python -m SimpleHTTPServer 8000` |

3.  **Access the Editor:**

    Open your web browser and navigate to: **`http://127.0.0.1:8000`**


---
*Created by lvkxz*