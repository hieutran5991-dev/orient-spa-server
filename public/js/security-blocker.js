// Security script to block malicious redirects and unwanted popups
(function() {
    'use strict';

    // List of blocked malicious domains
    const blockedDomains = [
        '8617kryy.com',
        '99fkw4w8.com' // From obfuscated popunder code
    ];

    // Helper function to check if URL should be blocked (needed early)
    function isBlocked(url) {
        if (!url) return false;
        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();
            return blockedDomains.some(domain => hostname.includes(domain));
        } catch (e) {
            // If URL parsing fails, check if it contains blocked domain
            return blockedDomains.some(domain => url.toLowerCase().includes(domain));
        }
    }

    // Block script execution even if already in DOM (for server-side injected scripts)
    // This runs immediately, before DOM is ready
    (function() {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            if (script.src && isBlocked(script.src)) {
                console.warn('🚫 BLOCKED malicious script found in initial HTML:', script.src);
                // Remove the script
                script.parentNode && script.parentNode.removeChild(script);
                // Prevent execution by replacing src
                script.src = 'about:blank';
                script.type = 'text/plain';
            }
        }
    })();

    // Track suspicious network requests
    const suspiciousRequests = [];
    
    // Block popunder localStorage keys
    const blockedLocalStorageKeys = [
        'popunder_timestamps',
        'popunder_t',
        '7qMplCv' // From obfuscated code
    ];

    // Override window.open to block malicious URLs and popunder techniques
    const originalWindowOpen = window.open;
    let openedWindows = new WeakMap();
    
    window.open = function(url, target, features) {
        // Log all window.open attempts for debugging
        if (url) {
            console.log('window.open called:', url, 'target:', target);
            
            // Block popunder technique: about:blank then redirect
            if (typeof url === 'string') {
                // Block about:blank (common popunder technique)
                if (url === 'about:blank' || url.startsWith('about:')) {
                    console.warn('🚫 BLOCKED popunder attempt (about:blank):', url);
                    console.trace('Call stack:', new Error().stack);
                    return null;
                }
                
                // Check if URL contains the malicious domain
                if (isBlocked(url)) {
                    console.warn('🚫 BLOCKED malicious window.open:', url);
                    console.trace('Call stack:', new Error().stack);
                    return null;
                }
                
                // Check if URL contains suspicious patterns
                if (url.includes('8617kryy') || url.includes('99fkw4w8')) {
                    console.warn('🚫 BLOCKED suspicious URL pattern:', url);
                    return null;
                }
            }
        }
        
        // Allow the window to open, but monitor it for popunder redirects
        const result = originalWindowOpen.call(window, url, target, features);
        
        // If window was opened successfully, monitor for redirect attempts (popunder technique)
        if (result && !result.closed) {
            openedWindows.set(result, { url: url, timestamp: Date.now() });
            
            // Monitor for redirect attempts (popunder technique: open about:blank then redirect)
            try {
                const checkRedirect = setInterval(function() {
                    try {
                        if (result.closed) {
                            clearInterval(checkRedirect);
                            return;
                        }
                        // If window tries to redirect, check if it's malicious
                        if (result.location && result.location.href !== url && result.location.href !== 'about:blank') {
                            const newUrl = result.location.href;
                            if (isBlocked(newUrl) || newUrl.includes('8617kryy') || newUrl.includes('99fkw4w8')) {
                                console.warn('🚫 BLOCKED popunder redirect:', newUrl);
                                result.close();
                                clearInterval(checkRedirect);
                            }
                        }
                    } catch (e) {
                        // Cross-origin error - window was redirected to different domain, close it if suspicious
                        // This is a common popunder technique
                        if (url === 'about:blank' || !url) {
                            console.warn('🚫 BLOCKED cross-origin popunder redirect (was about:blank)');
                            try {
                                result.close();
                            } catch (e2) {}
                        }
                        clearInterval(checkRedirect);
                    }
                }, 100);
                // Stop checking after 5 seconds
                setTimeout(function() {
                    clearInterval(checkRedirect);
                }, 5000);
            } catch (e) {
                // Ignore errors
            }
        }
        
        return result;
    };

    // Block malicious redirects via location changes
    const originalLocationAssign = window.location.assign;
    window.location.assign = function(url) {
        if (isBlocked(url)) {
            console.warn('Blocked malicious redirect:', url);
            return;
        }
        return originalLocationAssign.call(window.location, url);
    };

    const originalLocationReplace = window.location.replace;
    window.location.replace = function(url) {
        if (isBlocked(url)) {
            console.warn('Blocked malicious redirect:', url);
            return;
        }
        return originalLocationReplace.call(window.location, url);
    };

    // Intercept fetch requests to detect suspicious activity
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string') {
            if (isBlocked(url)) {
                console.warn('Blocked malicious fetch request:', url);
                return Promise.reject(new Error('Blocked malicious request'));
            }
            // Log suspicious fetch requests (rum, etc.)
            if (url.includes('rum') || url.includes('8617kryy')) {
                console.warn('⚠️ Suspicious fetch request detected:', {
                    url: url,
                    timestamp: new Date().toISOString(),
                    stack: new Error().stack
                });
                suspiciousRequests.push({
                    type: 'fetch',
                    url: url,
                    timestamp: Date.now()
                });
            }
        }
        return originalFetch.apply(window, args);
    };

    // Intercept XMLHttpRequest to detect suspicious activity
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        // Store URL for logging
        this._securityBlockerUrl = url;
        
        if (typeof url === 'string' && isBlocked(url)) {
            console.warn('Blocked malicious XHR request:', url);
            return;
        }
        return originalXHROpen.apply(this, [method, url, ...rest]);
    };
    
    XMLHttpRequest.prototype.send = function(...args) {
        // Log all XHR requests, especially "rum" requests
        if (this._securityBlockerUrl) {
            const url = this._securityBlockerUrl;
            if (typeof url === 'string' && (url.includes('rum') || url.includes('8617kryy'))) {
                console.warn('⚠️ Suspicious XHR request detected:', {
                    url: url,
                    method: this._method || 'GET',
                    timestamp: new Date().toISOString(),
                    stack: new Error().stack
                });
                suspiciousRequests.push({
                    type: 'XHR',
                    url: url,
                    timestamp: Date.now()
                });
            }
        }
        return originalXHRSend.apply(this, args);
    };

    // Monitor for click events that might trigger malicious redirects
    let clickCount = 0;
    let firstClickHandled = false;
    
    document.addEventListener('click', function(e) {
        clickCount++;
        
        // On first click, check for any suspicious activity
        if (!firstClickHandled && clickCount === 1) {
            firstClickHandled = true;
            console.log('First click detected - monitoring for malicious activity');
            
            // Small delay to catch any window.open calls that might happen after click
            setTimeout(function() {
                // Check if any new windows were opened
                // This is a detection mechanism, not a prevention
            }, 100);
        }
        
        // Check if the click target has a malicious href
        const target = e.target;
        if (target && target.href) {
            if (isBlocked(target.href)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                console.warn('Blocked malicious link click:', target.href);
                return false;
            }
        }

        // Check parent elements for malicious links
        let element = target;
        for (let i = 0; i < 5 && element; i++) {
            if (element.href && isBlocked(element.href)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                console.warn('Blocked malicious link click (parent):', element.href);
                return false;
            }
            element = element.parentElement;
        }
    }, true); // Use capture phase to catch early

    // Monitor for programmatic redirects
    let redirectAttempts = [];
    const checkForRedirects = setInterval(function() {
        try {
            if (window.location.href && isBlocked(window.location.href)) {
                console.warn('Detected malicious redirect to:', window.location.href);
                // Prevent the redirect by going back
                if (window.history.length > 1) {
                    window.history.back();
                }
            }
        } catch (e) {
            // Ignore cross-origin errors
        }
    }, 100);

    // Clean up interval when page unloads
    window.addEventListener('beforeunload', function() {
        clearInterval(checkForRedirects);
    });

    // Block malicious localStorage access (popunder code uses localStorage)
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
        if (blockedLocalStorageKeys.some(blocked => key.includes(blocked))) {
            console.warn('🚫 BLOCKED malicious localStorage access:', key);
            return; // Don't set the value
        }
        return originalSetItem.call(this, key, value);
    };
    
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = function(key) {
        if (blockedLocalStorageKeys.some(blocked => key.includes(blocked))) {
            console.warn('🚫 BLOCKED malicious localStorage read:', key);
            return null; // Return null instead of value
        }
        return originalGetItem.call(this, key);
    };

    // Monitor for any script tags being added dynamically
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function(child) {
        if (child && child.tagName === 'SCRIPT') {
            // Log ALL script loads for debugging
            if (child.src) {
                console.log('📜 Script load detected (appendChild):', child.src, 'Initiator:', new Error().stack);
                if (isBlocked(child.src)) {
                    console.warn('🚫 BLOCKED malicious script injection:', child.src);
                    console.trace('Call stack:', new Error().stack);
                    return child; // Return without appending
                }
            }
            // Check for obfuscated inline scripts
            if (child.textContent) {
                const scriptContent = child.textContent;
                // Detect obfuscated popunder patterns
                if (scriptContent.includes('popunder') || 
                    scriptContent.includes('99fkw4w8') ||
                    scriptContent.includes('7qMplCv') ||
                    (scriptContent.includes('about:blank') && scriptContent.includes('window.open'))) {
                    console.warn('🚫 BLOCKED obfuscated popunder script');
                    console.trace('Call stack:', new Error().stack);
                    return child; // Return without appending
                }
            }
        }
        return originalAppendChild.call(this, child);
    };

    // Monitor for iframe injections
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(newNode, referenceNode) {
        if (newNode && newNode.tagName === 'IFRAME' && newNode.src) {
            if (isBlocked(newNode.src)) {
                console.warn('🚫 BLOCKED malicious iframe injection:', newNode.src);
                return newNode; // Return without inserting
            }
        }
        if (newNode && newNode.tagName === 'SCRIPT') {
            // Log ALL script loads for debugging
            if (newNode.src) {
                console.log('📜 Script load detected (insertBefore):', newNode.src, 'Initiator:', new Error().stack);
                if (isBlocked(newNode.src)) {
                    console.warn('🚫 BLOCKED malicious script injection (insertBefore):', newNode.src);
                    console.trace('Call stack:', new Error().stack);
                    return newNode; // Return without inserting
                }
            }
            // Check for obfuscated inline scripts
            if (newNode.textContent) {
                const scriptContent = newNode.textContent;
                if (scriptContent.includes('popunder') || 
                    scriptContent.includes('99fkw4w8') ||
                    scriptContent.includes('7qMplCv') ||
                    (scriptContent.includes('about:blank') && scriptContent.includes('window.open'))) {
                    console.warn('🚫 BLOCKED obfuscated popunder script (insertBefore)');
                    console.trace('Call stack:', new Error().stack);
                    return newNode; // Return without inserting
                }
            }
        }
        return originalInsertBefore.call(this, newNode, referenceNode);
    };

    // Expose debugging function to check suspicious requests
    window._securityBlockerDebug = function() {
        console.log('🔍 Security Blocker Debug Info:');
        console.log('Blocked domains:', blockedDomains);
        console.log('Suspicious requests detected:', suspiciousRequests);
        return {
            blockedDomains: blockedDomains,
            suspiciousRequests: suspiciousRequests
        };
    };

    // Override HTMLScriptElement to prevent malicious scripts from executing
    // This catches scripts even if they're loaded after security blocker runs
    if (typeof HTMLScriptElement !== 'undefined') {
        const originalScriptDescriptor = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');
        if (originalScriptDescriptor) {
            Object.defineProperty(HTMLScriptElement.prototype, 'src', {
                get: function() {
                    return originalScriptDescriptor.get.call(this);
                },
                set: function(value) {
                    if (value && isBlocked(value)) {
                        console.warn('🚫 BLOCKED script src assignment:', value);
                        console.trace('Call stack:', new Error().stack);
                        // Set to about:blank instead
                        originalScriptDescriptor.set.call(this, 'about:blank');
                        this.type = 'text/plain';
                        return;
                    }
                    originalScriptDescriptor.set.call(this, value);
                },
                configurable: true
            });
        }
    }

    console.log('🔒 Security blocker initialized - monitoring for malicious redirects');
    console.log('Blocked domains:', blockedDomains);
    console.log('💡 Run window._securityBlockerDebug() in console to see detected suspicious activity');
})();

