/**
 * Code Protection Script
 * Prevents easy inspection of source code
 */
(function () {
    'use strict';

    // Disable right-click context menu
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable keyboard shortcuts for viewing source/dev tools
    document.addEventListener('keydown', function (e) {
        // F12 - Dev Tools
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I - Dev Tools
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J - Console
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C - Inspect Element
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U - View Source
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+S - Save Page
        if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
            e.preventDefault();
            return false;
        }
    });

    // Disable text selection (optional - uncomment if needed)
    // document.addEventListener('selectstart', function(e) {
    //   e.preventDefault();
    //   return false;
    // });

    // Disable drag
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // Console detection and warning
    var devtools = {
        isOpen: false,
        orientation: undefined
    };

    var threshold = 160;
    var emitEvent = function (isOpen, orientation) {
        if (devtools.isOpen !== isOpen || devtools.orientation !== orientation) {
            devtools.isOpen = isOpen;
            devtools.orientation = orientation;
            if (isOpen) {
                console.clear();
                console.log('%câš ï¸ WARNING', 'color: red; font-size: 48px; font-weight: bold;');
                console.log('%cThis is a protected website. Unauthorized access to source code is prohibited.', 'color: #333; font-size: 16px;');
                console.log('%c&copy; AgriWeb. All Rights Reserved.', 'color: #666; font-size: 12px;');
            }
        }
    };

    var checkDevTools = function () {
        var widthThreshold = window.outerWidth - window.innerWidth > threshold;
        var heightThreshold = window.outerHeight - window.innerHeight > threshold;
        var orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (!(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
                widthThreshold || heightThreshold)) {
            emitEvent(true, orientation);
        } else {
            emitEvent(false, undefined);
        }
    };

    // Check periodically
    setInterval(checkDevTools, 500);

    // Debugger trap (slows down debugging)
    (function () {
        function block() {
            if (window.outerHeight - window.innerHeight > 200 ||
                window.outerWidth - window.innerWidth > 200) {
                document.body.innerHTML = '';
            }
            setInterval(function () {
                (function () {
                    return false;
                }
                ['constructor']('debugger')
                ['call']());
            }, 50);
        }
        try {
            block();
        } catch (err) { }
    })();

    // Prevent iframe embedding
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

    // Clear console on load
    console.clear();

})();
