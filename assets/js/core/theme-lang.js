/**
 * AgriWeb - Theme Toggle Module
    * Handles dark / light theme
        */

// ==================== THEME TOGGLE ====================
var ThemeManager = {
    init: function () {
        // Check saved theme or system preference
        var savedTheme = localStorage.getItem('AgriWeb-theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }

        // Add toggle button to header
        this.createToggleButton();
    },

    createToggleButton: function () {
        var headerInner = document.querySelector('.header__inner');
        if (!headerInner) return;

        // Check if button already exists
        if (document.querySelector('.theme-toggle')) return;

        var toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle theme');
        toggleBtn.innerHTML = `
            <svg class="theme-toggle__sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <svg class="theme-toggle__moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        `;

        toggleBtn.addEventListener('click', function () {
            var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            ThemeManager.setTheme(newTheme);
        });

        // Insert before nav-toggle
        var navToggle = headerInner.querySelector('.nav-toggle');
        if (navToggle) {
            headerInner.insertBefore(toggleBtn, navToggle);
        } else {
            headerInner.appendChild(toggleBtn);
        }
    },

    setTheme: function (theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('AgriWeb-theme', theme);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    ThemeManager.init();
});
