class MenuController {
    constructor() {
        this.categories = [
            { id: 'doener', name: 'DÖNER', emoji: '🌯' },
            { id: 'pizza', name: 'PIZZA', emoji: '🍕' },
            { id: 'burger', name: 'BURGER', emoji: '🍔' },
            { id: 'snacks', name: 'SNACKS', emoji: '🍟' },
            { id: 'drinks', name: 'GETRÄNKE', emoji: '🥤' },
            { id: 'dessert', name: 'DESSERT', emoji: '🍰' }
        ];
        
        this.menuItems = {
            doener: [
                { name: 'Döner Kebab', description: 'Saftiges Döner-Fleisch, frischer Salat, Tomate, Zwiebel und würzige Sauce', price: 7.50, badges: ['BELIEBT'] },
                { name: 'Döner Spicy', description: 'Extra scharfes Döner mit Jalapeños und Chili-Sauce', price: 8.00, badges: ['NEU'] },
                { name: 'Hähnchen Döner', description: 'Zartes Hähnchenfleisch mit frischen Salaten', price: 7.90, badges: [] }
            ],
            pizza: [
                { name: 'Margherita', description: 'Klassisch italienisch mit Mozzarella und Basilikum', price: 8.50, badges: ['BELIEBT'] },
                { name: 'Pepperoni', description: 'Würzige Pepperoni und geschmolzener Käse', price: 9.50, badges: [] },
                { name: 'Quattro Formaggi', description: 'Vier Käsesorten auf knuspriger Pizza', price: 10.50, badges: ['NEU'] }
            ],
            burger: [
                { name: 'Classic Burger', description: 'Saftiges Rindfleisch, Käse, Salat, Tomate und spezielle Sauce', price: 8.00, badges: ['BELIEBT'] },
                { name: 'Double Cheese', description: 'Zwei Patties mit doppeltem Käse', price: 9.00, badges: [] },
                { name: 'Crispy Bacon', description: 'Mit knusprigem Bacon und würziger Sauce', price: 9.50, badges: [] }
            ],
            snacks: [
                { name: 'Pommes Frites', description: 'Knusprig frittiert und perfekt gewürzt', price: 4.50, badges: ['BELIEBT'] },
                { name: 'Chicken Nuggets', description: '6er Pack mit verschiedenen Saucen', price: 5.50, badges: [] },
                { name: 'Onion Rings', description: 'Frittierte Zwiebelringe mit Dip', price: 5.00, badges: [] }
            ],
            drinks: [
                { name: 'Cola', description: 'Erfrischende Cola - 0,5L', price: 2.50, badges: ['BELIEBT'] },
                { name: 'Orangensaft', description: 'Frisch gepresster Orangensaft - 0,3L', price: 3.00, badges: [] },
                { name: 'Mineralwasser', description: 'Sprudelndes Mineralwasser - 0,5L', price: 2.00, badges: [] }
            ],
            dessert: [
                { name: 'Schokoladen Shake', description: 'Cremig und schokoladig - ein Traum', price: 5.00, badges: ['BELIEBT'] },
                { name: 'Frucht Sorbet', description: 'Frisches Fruchtsorbet mit realer Frucht', price: 5.50, badges: ['NEU'] },
                { name: 'Apfel Strudel', description: 'Traditioneller Wiener Apfelstrudel', price: 6.00, badges: [] }
            ]
        };
        
        this.currentCategory = 'doener';
        this.currentItemIndex = 0;
        this.tvMode = false;
        this.autoRotateInterval = null;
        this.slideShowDuration = 10;
        this.animationSpeed = 'normal';
        
        this.initEventListeners();
        this.render();
    }
    
    initEventListeners() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.selectCategory(category);
            });
        });
    }
    
    selectCategory(categoryId) {
        if (this.tvMode) return;
        
        this.currentCategory = categoryId;
        this.currentItemIndex = 0;
        this.render();
        
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.category === categoryId) {
                item.classList.add('active');
            }
        });
    }
    
    render() {
        const items = this.menuItems[this.currentCategory];
        const currentItem = items[this.currentItemIndex];
        
        // Update food display
        foodRenderer.showFood(this.currentCategory);
        
        // Update text content
        document.getElementById('product-name').textContent = currentItem.name;
        document.getElementById('product-description').textContent = currentItem.description;
        
        // Update price
        const priceStr = currentItem.price.toString().replace('.', ',');
        document.getElementById('price').innerHTML = `${priceStr.split(',')[0]}<span class="currency">,${priceStr.split(',')[1]}€</span>`;
        
        // Update badges
        const badgesContainer = document.getElementById('badges');
        badgesContainer.innerHTML = '';
        currentItem.badges.forEach(badge => {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'badge';
            badgeEl.textContent = badge;
            badgesContainer.appendChild(badgeEl);
        });
        
        // Update progress indicator
        this.updateProgressIndicator();
    }
    
    updateProgressIndicator() {
        const items = this.menuItems[this.currentCategory];
        const indicatorContainer = document.getElementById('progress-indicator');
        indicatorContainer.innerHTML = '';
        
        items.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (index === this.currentItemIndex) {
                dot.classList.add('active');
            }
            indicatorContainer.appendChild(dot);
        });
    }
    
    nextItem() {
        const items = this.menuItems[this.currentCategory];
        this.currentItemIndex = (this.currentItemIndex + 1) % items.length;
        this.render();
    }
    
    nextCategory() {
        const categoryIndex = this.categories.findIndex(c => c.id === this.currentCategory);
        const nextIndex = (categoryIndex + 1) % this.categories.length;
        this.currentCategory = this.categories[nextIndex].id;
        this.currentItemIndex = 0;
        this.render();
        
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.category === this.currentCategory) {
                item.classList.add('active');
            }
        });
    }
    
    startTVMode() {
        this.tvMode = true;
        document.getElementById('tv-mode-indicator').style.display = 'block';
        document.querySelector('.navigation').classList.add('controls-hidden');
        document.getElementById('admin-toggle').classList.add('controls-hidden');
        
        this.autoRotateInterval = setInterval(() => {
            this.nextItem();
        }, this.slideShowDuration * 1000);
    }
    
    stopTVMode() {
        this.tvMode = false;
        document.getElementById('tv-mode-indicator').style.display = 'none';
        document.querySelector('.navigation').classList.remove('controls-hidden');
        document.getElementById('admin-toggle').classList.remove('controls-hidden');
        
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }
    
    setSlideShowDuration(seconds) {
        this.slideShowDuration = seconds;
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = setInterval(() => {
                this.nextItem();
            }, this.slideShowDuration * 1000);
        }
    }
}

const menuController = new MenuController();