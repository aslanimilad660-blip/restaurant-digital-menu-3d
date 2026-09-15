# 🍽️ Premium 3D Restaurant Digital Menu - TV Board

## Overview

A spectacular, premium 3D animated digital food menu system designed specifically for large restaurant TV displays. This is a cinematic, luxurious digital menu board that makes customers want to order immediately.

### Key Features

✨ **3D Food Rendering**
- Realistic 3D food models using Three.js
- Cinematic lighting and shadows
- Photorealistic textures
- Smooth, continuous rotation animations
- Depth-of-field effects

🎬 **Dynamic Animations**
- Smooth food rotations and movements
- Ingredient floats and particle effects
- Price reveals with scale animations
- Category transitions
- Seamless loops

📺 **TV Mode**
- Auto-rotating product showcase
- Auto-rotating categories
- 8-12 second slideshow timing
- Hides all controls
- Runs continuously
- Perfect for display on large screens

🎨 **Premium UI Design**
- Glassmorphism panels
- Dark luxury backgrounds
- Dynamic light reflections
- Large, readable typography
- Optimized for viewing from distance

⚙️ **Admin Panel**
- Easy management of menu items
- Customizable categories
- Price and promotion management
- Real-time changes
- Theme customization
- Animation speed control

📱 **Responsive Design**
- Optimized for 1920×1080 (Full HD)
- Scales to 4K
- Works on Android TV
- Chrome browser compatible
- Multiple screen sizes

## Menu Structure

### Categories
1. 🌯 **DÖNER** - Döner Kebab varieties
2. 🍕 **PIZZA** - Pizza selections
3. 🍔 **BURGER** - Burger options
4. 🍟 **SNACKS** - Fries, nuggets, rings
5. 🥤 **GETRÄNKE** - Beverages
6. 🍰 **DESSERT** - Desserts

## Installation

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Three.js library (loaded via CDN)
- No backend required

### Setup

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Access admin panel with ⚙️ button (bottom right)
4. Customize settings as needed

## Usage

### Normal Mode
- Click category navigation (top)
- Browse products for each category
- Watch beautiful 3D food animations

### TV Mode
1. Open Admin Panel (⚙️)
2. Enable "TV Mode (Auto-rotate)"
3. Set slideshow duration (8-12 seconds recommended)
4. Menu will auto-rotate categories and products
5. Controls disappear for professional TV display

### Admin Panel

Click the ⚙️ button (bottom right) to access:

**Settings Available:**
- Restaurant name/logo
- Restaurant tagline
- Background color
- Primary accent color
- Slideshow duration
- Animation speed (slow/normal/fast)
- Enable/disable sound
- TV mode toggle

**Actions:**
- Save settings (stored in browser localStorage)
- Reset to defaults

## Technical Details

### Technologies Used
- **Three.js** - 3D rendering engine
- **HTML5 Canvas** - 2D graphics and textures
- **CSS3** - Animations and styling
- **Vanilla JavaScript** - Logic and interactivity

### File Structure
```
├── index.html              # Main HTML file
├── js/
│   ├── food-renderer.js    # Three.js 3D food models
│   ├── menu-controller.js  # Menu logic and navigation
│   └── admin-panel.js      # Admin settings and controls
└── README.md               # This file
```

### Food Models

1. **Döner** - Rotating spit meat with vegetables
2. **Burger** - Layered burger with all ingredients
3. **Pizza** - Circular pizza with pepperoni and toppings
4. **Fries** - Scattered crispy fries
5. **Soft Drink** - Bottle with ice cubes and condensation

### Lighting System
- Main directional light (cinematic)
- Warm rim light (orange accent)
- Soft fill light
- Ambient light for overall illumination

### Animation Features
- Continuous food rotation
- Subtle camera movement
- Particle system (floating ingredients)
- Smooth transitions between items
- Price reveal animations
- Navigation glow effects

## Customization

### Colors
Edit color values in `index.html` CSS section:
```css
--primary-color: #ff6b00;  /* Main orange accent */
--background-color: #0a0a0a;  /* Dark background */
```

### Menu Items
Edit in `js/menu-controller.js`:
```javascript
this.menuItems = {
    doener: [
        { name: 'Item Name', description: '...', price: 7.50, badges: ['BELIEBT'] },
        // Add more items...
    ]
}
```

### Animation Speed
Adjust in admin panel or edit `js/food-renderer.js`:
```javascript
this.animationTime += 0.008;  // Increase for faster rotation
```

## Display Optimization

### For Large Screens (3-5 meters)
- Text sizes are already optimized
- Ensure brightness is high
- Position screen at eye level
- Use in landscape mode

### For 4K Displays
- CSS automatically scales
- Animations remain smooth
- All elements remain readable

## Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Android Chrome
- ✅ Smart TV browsers

## Performance

- Optimized for 60 FPS
- GPU acceleration enabled
- Efficient particle system
- Minimal memory footprint
- Works on devices with 2GB+ RAM

## Future Enhancements

Potential additions:
- Sound effects and ambient music
- More food items and models
- Order integration
- Real-time menu updates
- Weather-responsive displays
- Multi-language support
- QR code for mobile ordering
- Customer feedback system

## License

Free to use and modify for commercial restaurant displays.

## Support

For issues or customization requests, review the code comments or contact development team.

---

**Made for Premium Restaurant Experiences** 🍽️✨
