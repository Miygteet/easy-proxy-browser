 const urlBar = document.getElementById('url-bar');
        const btnGo = document.getElementById('btn-go');
        const btnRefresh = document.getElementById('btn-refresh');
        const browserView = document.getElementById('browser-view');

        // History arrays to mimic back/forward functionality
        let history = ['https://example.com'];
        let currentIndex = 0;

        // Function to load a URL into the iframe (Now with Proxy!)
        function navigateTo(url, addToHistory = true) {
            // Basic check to add https:// if the user forgets it
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            // --- THE BYPASS ---
            // We use a public proxy to fetch the page and strip the security headers.
            // encodeURIComponent ensures special characters in the URL don't break the proxy link.
            const proxiedUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

            browserView.src = proxiedUrl;
            
            // Keep the clean URL in the bar so it looks normal to the user
            urlBar.value = url; 

            if (addToHistory) {
                history = history.slice(0, currentIndex + 1);
                history.push(url);
                currentIndex++;
            }
        }

        // Event Listeners for UI
        btnGo.addEventListener('click', () => {
            navigateTo(urlBar.value);
        });

        urlBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                navigateTo(urlBar.value);
            }
        });

        btnRefresh.addEventListener('click', () => {
            browserView.src = browserView.src; // Reloads the iframe
        });

        document.getElementById('btn-back').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                navigateTo(history[currentIndex], false);
            }
        });

        document.getElementById('btn-forward').addEventListener('click', () => {
            if (currentIndex < history.length - 1) {
                currentIndex++;
                navigateTo(history[currentIndex], false);
            }
        });
