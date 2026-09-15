class AdminPanel {
    constructor() {
        this.adminToggle = document.getElementById('admin-toggle');
        this.adminPanel = document.getElementById('admin-panel');
        this.adminClose = document.getElementById('admin-close');
        
        this.initEventListeners();
        this.loadSettings();
    }
    
    initEventListeners() {
        this.adminToggle.addEventListener('click', () => this.togglePanel());
        this.adminClose.addEventListener('click', () => this.closePanel());
        
        document.getElementById('admin-save').addEventListener('click', () => this.saveSettings());
        document.getElementById('admin-reset').addEventListener('click', () => this.resetSettings());
        
        // Input change listeners
        document.getElementById('admin-restaurant-name').addEventListener('change', (e) => {
            document.querySelector('.restaurant-logo').textContent = e.target.value;
        });
        
        document.getElementById('admin-tagline').addEventListener('change', (e) => {
            document.querySelector('.tagline').textContent = e.target.value;
        });
        
        document.getElementById('admin-bg-color').addEventListener('change', (e) => {
            document.body.style.backgroundColor = e.target.value;
        });
        
        document.getElementById('admin-primary-color').addEventListener('change', (e) => {
            this.applyPrimaryColor(e.target.value);
        });
        
        document.getElementById('admin-slideshow-duration').addEventListener('change', (e) => {
            menuController.setSlideShowDuration(parseInt(e.target.value));
        });
        
        document.getElementById('admin-animation-speed').addEventListener('change', (e) => {
            this.setAnimationSpeed(e.target.value);
        });
        
        document.getElementById('admin-tv-mode').addEventListener('change', (e) => {
            if (e.target.checked) {
                menuController.startTVMode();
            } else {
                menuController.stopTVMode();
            }
        });
    }
    
    togglePanel() {
        if (this.adminPanel.classList.contains('open')) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }
    
    openPanel() {
        this.adminPanel.classList.add('open');
    }
    
    closePanel() {
        this.adminPanel.classList.remove('open');
    }
    
    applyPrimaryColor(color) {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', color);
        
        // Update CSS variables (will need to be added to main CSS)
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --primary-color: ${color};
            }
            .restaurant-logo { background: linear-gradient(135deg, ${color}, ${this.lightenColor(color)}); }
            .tagline { color: ${color}; }
            .nav-item.active { border-color: ${color}; box-shadow: 0 0 20px ${color}80; }
            .price { color: ${color}; text-shadow: 0 0 20px ${color}99; }
            .badge { background: linear-gradient(135deg, ${color}, ${this.lightenColor(color)}); }
        `;
        document.head.appendChild(style);
    }
    
    lightenColor(color) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = 50;
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
            (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255))
            .toString(16).slice(1);
    }
    
    setAnimationSpeed(speed) {
        const speedValues = {
            'slow': 1.5,
            'normal': 1,
            'fast': 0.5
        };
        
        const style = document.createElement('style');
        const multiplier = speedValues[speed];
        style.textContent = `
            @keyframes slideInLeft { animation-duration: ${0.8 * multiplier}s; }
            @keyframes slideInRight { animation-duration: ${0.8 * multiplier}s; }
            @keyframes priceReveal { animation-duration: ${0.8 * multiplier}s; }
        `;
        document.head.appendChild(style);
    }
    
    saveSettings() {
        const settings = {
            restaurantName: document.getElementById('admin-restaurant-name').value,
            tagline: document.getElementById('admin-tagline').value,
            bgColor: document.getElementById('admin-bg-color').value,
            primaryColor: document.getElementById('admin-primary-color').value,
            slideshowDuration: document.getElementById('admin-slideshow-duration').value,
            animationSpeed: document.getElementById('admin-animation-speed').value,
            soundEnabled: document.getElementById('admin-sound').checked,
            tvMode: document.getElementById('admin-tv-mode').checked
        };
        
        localStorage.setItem('menuSettings', JSON.stringify(settings));
        alert('Einstellungen gespeichert!');
    }
    
    loadSettings() {
        const saved = localStorage.getItem('menuSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            document.getElementById('admin-restaurant-name').value = settings.restaurantName || 'GOURMET STATION';
            document.getElementById('admin-tagline').value = settings.tagline || 'Premium Fast Food Experience';
            document.getElementById('admin-bg-color').value = settings.bgColor || '#0a0a0a';
            document.getElementById('admin-primary-color').value = settings.primaryColor || '#ff6b00';
            document.getElementById('admin-slideshow-duration').value = settings.slideshowDuration || '10';
            document.getElementById('admin-animation-speed').value = settings.animationSpeed || 'normal';
            document.getElementById('admin-sound').checked = settings.soundEnabled || false;
            document.getElementById('admin-tv-mode').checked = settings.tvMode || false;
            
            if (settings.tvMode) {
                menuController.startTVMode();
            }
        }
    }
    
    resetSettings() {
        if (confirm('Alle Einstellungen zurücksetzen?')) {
            localStorage.removeItem('menuSettings');
            document.getElementById('admin-restaurant-name').value = 'GOURMET STATION';
            document.getElementById('admin-tagline').value = 'Premium Fast Food Experience';
            document.getElementById('admin-bg-color').value = '#0a0a0a';
            document.getElementById('admin-primary-color').value = '#ff6b00';
            document.getElementById('admin-slideshow-duration').value = '10';
            document.getElementById('admin-animation-speed').value = 'normal';
            document.getElementById('admin-sound').checked = false;
            document.getElementById('admin-tv-mode').checked = false;
            
            location.reload();
        }
    }
}

const adminPanel = new AdminPanel();