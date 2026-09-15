class FoodRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        
        const width = 600;
        const height = 600;
        
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 4;
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        this.setupLighting();
        this.setupBackground();
        this.currentFood = null;
        this.animationTime = 0;
        
        this.animate();
    }
    
    setupLighting() {
        // Main directional light (cinematic)
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 8, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.left = -10;
        mainLight.shadow.camera.right = 10;
        mainLight.shadow.camera.top = 10;
        mainLight.shadow.camera.bottom = -10;
        this.scene.add(mainLight);
        
        // Warm rim light
        const rimLight = new THREE.DirectionalLight(0xff6b00, 0.8);
        rimLight.position.set(-5, 3, -5);
        this.scene.add(rimLight);
        
        // Soft fill light
        const fillLight = new THREE.DirectionalLight(0xffa500, 0.5);
        fillLight.position.set(0, 2, -8);
        this.scene.add(fillLight);
        
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);
    }
    
    setupBackground() {
        // Create a plane for background with subtle particles effect
        const geometry = new THREE.PlaneGeometry(20, 20);
        const material = new THREE.MeshBasicMaterial({
            color: 0x0a0a0a
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.z = -10;
        this.scene.add(plane);
        
        // Add particle system for atmosphere
        this.particleSystem = this.createParticleSystem();
        this.scene.add(this.particleSystem);
    }
    
    createParticleSystem() {
        const particleCount = 30;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const velocities = [];
        
        for (let i = 0; i < particleCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            );
            velocities.push(
                (Math.random() - 0.5) * 0.02,
                Math.random() * 0.02,
                0
            );
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
        
        const material = new THREE.PointsMaterial({
            color: 0xff6b00,
            size: 0.1,
            transparent: true,
            opacity: 0.3
        });
        
        const particles = new THREE.Points(geometry, material);
        particles.velocities = velocities;
        return particles;
    }
    
    createDoener() {
        const group = new THREE.Group();
        group.castShadow = true;
        group.receiveShadow = true;
        
        // Bread (pita)
        const breadGeometry = new THREE.ConeGeometry(1.5, 0.3, 32);
        const breadMaterial = new THREE.MeshStandardMaterial({
            color: 0xc49861,
            metalness: 0.1,
            roughness: 0.7,
            map: this.createBreadTexture()
        });
        const bread = new THREE.Mesh(breadGeometry, breadMaterial);
        bread.castShadow = true;
        bread.receiveShadow = true;
        bread.scale.set(1, 0.4, 1);
        group.add(bread);
        
        // Döner meat (cylinder stack)
        const meatGroup = new THREE.Group();
        for (let i = 0; i < 5; i++) {
            const meatGeometry = new THREE.CylinderGeometry(1.4, 1.4, 0.15, 32);
            const meatMaterial = new THREE.MeshStandardMaterial({
                color: 0x8b4513,
                metalness: 0.2,
                roughness: 0.6
            });
            const meat = new THREE.Mesh(meatGeometry, meatMaterial);
            meat.castShadow = true;
            meat.receiveShadow = true;
            meat.position.y = 0.2 + i * 0.08;
            meat.rotation.z = (Math.random() - 0.5) * 0.2;
            meatGroup.add(meat);
        }
        meatGroup.position.y = 0.3;
        group.add(meatGroup);
        
        // Lettuce
        const lettuceGeometry = new THREE.IcosahedronGeometry(0.8, 4);
        const lettuceMaterial = new THREE.MeshStandardMaterial({
            color: 0x2d8659,
            metalness: 0,
            roughness: 0.8
        });
        const lettuce = new THREE.Mesh(lettuceGeometry, lettuceMaterial);
        lettuce.castShadow = true;
        lettuce.position.set(0.6, 0.4, 0.2);
        lettuce.scale.set(0.6, 0.8, 0.5);
        group.add(lettuce);
        
        // Tomato slices
        for (let i = 0; i < 2; i++) {
            const tomatoGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.05, 32);
            const tomatoMaterial = new THREE.MeshStandardMaterial({
                color: 0xdc143c,
                metalness: 0.1,
                roughness: 0.6
            });
            const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
            tomato.castShadow = true;
            tomato.position.set(-0.4, 0.3 + i * 0.15, 0.3);
            tomato.rotation.x = Math.PI / 2.5;
            group.add(tomato);
        }
        
        // Onions
        const onionGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        const onionMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0.8
        });
        for (let i = 0; i < 3; i++) {
            const onion = new THREE.Mesh(onionGeometry, onionMaterial);
            onion.castShadow = true;
            onion.position.set(
                -0.6 + i * 0.2,
                0.2 + (Math.random() - 0.5) * 0.3,
                0.4
            );
            group.add(onion);
        }
        
        // Sauce drip
        const sauceGeometry = new THREE.OctahedronGeometry(0.15, 2);
        const sauceMaterial = new THREE.MeshStandardMaterial({
            color: 0xff6b00,
            metalness: 0.3,
            roughness: 0.4
        });
        const sauce = new THREE.Mesh(sauceGeometry, sauceMaterial);
        sauce.castShadow = true;
        sauce.position.set(0.3, 0.1, 0.5);
        group.add(sauce);
        
        group.rotation.x = 0.3;
        group.position.y = -0.5;
        
        return group;
    }
    
    createBurger() {
        const group = new THREE.Group();
        
        // Bottom bun
        const bunGeometry = new THREE.SphereGeometry(1, 32, 16);
        bunGeometry.scale(1, 0.6, 1);
        const bunMaterial = new THREE.MeshStandardMaterial({
            color: 0xd4a574,
            metalness: 0.1,
            roughness: 0.7,
            map: this.createBreadTexture()
        });
        const bottomBun = new THREE.Mesh(bunGeometry, bunMaterial);
        bottomBun.castShadow = true;
        bottomBun.receiveShadow = true;
        bottomBun.position.y = -0.3;
        group.add(bottomBun);
        
        // Patty
        const pattyGeometry = new THREE.CylinderGeometry(1, 1, 0.15, 32);
        const pattyMaterial = new THREE.MeshStandardMaterial({
            color: 0x3d2817,
            metalness: 0.2,
            roughness: 0.8
        });
        const patty = new THREE.Mesh(pattyGeometry, pattyMaterial);
        patty.castShadow = true;
        patty.receiveShadow = true;
        patty.position.y = 0.15;
        group.add(patty);
        
        // Cheese
        const cheeseGeometry = new THREE.BoxGeometry(1.8, 0.08, 1.8);
        const cheeseMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.3,
            roughness: 0.5,
            emissive: 0xff6b00,
            emissiveIntensity: 0.2
        });
        const cheese = new THREE.Mesh(cheeseGeometry, cheeseMaterial);
        cheese.castShadow = true;
        cheese.receiveShadow = true;
        cheese.position.y = 0.35;
        cheese.rotation.z = 0.1;
        group.add(cheese);
        
        // Lettuce
        const lettuceGeometry = new THREE.IcosahedronGeometry(1, 3);
        const lettuceMaterial = new THREE.MeshStandardMaterial({
            color: 0x2d8659,
            metalness: 0,
            roughness: 0.8
        });
        const lettuce = new THREE.Mesh(lettuceGeometry, lettuceMaterial);
        lettuce.castShadow = true;
        lettuce.position.y = 0.45;
        lettuce.scale.set(0.9, 0.6, 0.7);
        group.add(lettuce);
        
        // Tomato
        const tomatoGeometry = new THREE.SphereGeometry(0.7, 32, 16);
        const tomatoMaterial = new THREE.MeshStandardMaterial({
            color: 0xdc143c,
            metalness: 0.1,
            roughness: 0.6
        });
        const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
        tomato.castShadow = true;
        tomato.receiveShadow = true;
        tomato.position.y = 0.65;
        tomato.scale.set(1, 0.5, 1);
        group.add(tomato);
        
        // Top bun
        const topBun = bottomBun.clone();
        topBun.position.y = 1;
        group.add(topBun);
        
        group.position.y = -0.5;
        return group;
    }
    
    createPizza() {
        const group = new THREE.Group();
        
        // Pizza base
        const baseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.15, 32);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0xb8860b,
            metalness: 0.15,
            roughness: 0.7
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);
        
        // Cheese topping
        const cheeseGeometry = new THREE.CylinderGeometry(1.48, 1.48, 0.08, 32);
        const cheeseMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.2,
            roughness: 0.5,
            emissive: 0xff6b00,
            emissiveIntensity: 0.3
        });
        const cheese = new THREE.Mesh(cheeseGeometry, cheeseMaterial);
        cheese.castShadow = true;
        cheese.position.z = 0.12;
        group.add(cheese);
        
        // Pepperoni
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 0.8;
            const pepperoniGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
            const pepperoniMaterial = new THREE.MeshStandardMaterial({
                color: 0xc41e3a,
                metalness: 0.2,
                roughness: 0.6,
                emissive: 0xff0000,
                emissiveIntensity: 0.2
            });
            const pepperoni = new THREE.Mesh(pepperoniGeometry, pepperoniMaterial);
            pepperoni.castShadow = true;
            pepperoni.position.x = Math.cos(angle) * radius;
            pepperoni.position.y = Math.sin(angle) * radius;
            pepperoni.position.z = 0.15;
            group.add(pepperoni);
        }
        
        // Basil leaves
        for (let i = 0; i < 6; i++) {
            const leafGeometry = new THREE.OctahedronGeometry(0.2, 1);
            const leafMaterial = new THREE.MeshStandardMaterial({
                color: 0x228b22,
                metalness: 0,
                roughness: 0.8
            });
            const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
            leaf.castShadow = true;
            leaf.position.set(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                0.2
            );
            group.add(leaf);
        }
        
        group.rotation.z = 0.3;
        group.position.y = -0.5;
        
        return group;
    }
    
    createFries() {
        const group = new THREE.Group();
        
        // Create fries
        for (let i = 0; i < 30; i++) {
            const friesGeometry = new THREE.BoxGeometry(0.15, 1.5, 0.15);
            const friesMaterial = new THREE.MeshStandardMaterial({
                color: 0xdaa520,
                metalness: 0.1,
                roughness: 0.7
            });
            const fries = new THREE.Mesh(friesGeometry, friesMaterial);
            fries.castShadow = true;
            fries.receiveShadow = true;
            fries.position.set(
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 0.8,
                (Math.random() - 0.5) * 1.5
            );
            fries.rotation.x = (Math.random() - 0.5) * 0.5;
            fries.rotation.z = (Math.random() - 0.5) * 0.5;
            group.add(fries);
        }
        
        group.position.y = -0.5;
        return group;
    }
    
    createSoftDrink() {
        const group = new THREE.Group();
        
        // Bottle body
        const bottleGeometry = new THREE.BoxGeometry(0.4, 2, 0.4);
        bottleGeometry.scale(1, 1, 0.8);
        const bottleMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b0000,
            metalness: 0.6,
            roughness: 0.2,
            transparent: true,
            opacity: 0.9
        });
        const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        bottle.castShadow = true;
        bottle.receiveShadow = true;
        group.add(bottle);
        
        // Liquid inside
        const liquidGeometry = new THREE.BoxGeometry(0.35, 1.6, 0.35);
        liquidGeometry.scale(1, 1, 0.7);
        const liquidMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b0000,
            metalness: 0.3,
            roughness: 0.3,
            transparent: true,
            opacity: 0.6
        });
        const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
        liquid.position.z = 0.05;
        liquid.position.y = -0.15;
        group.add(liquid);
        
        // Cap
        const capGeometry = new THREE.CylinderGeometry(0.25, 0.2, 0.2, 16);
        const capMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.8,
            roughness: 0.2
        });
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.castShadow = true;
        cap.position.y = 1.1;
        group.add(cap);
        
        // Ice cubes
        for (let i = 0; i < 5; i++) {
            const iceGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
            const iceMaterial = new THREE.MeshStandardMaterial({
                color: 0xccffff,
                metalness: 0.7,
                roughness: 0.1,
                transparent: true,
                opacity: 0.6
            });
            const ice = new THREE.Mesh(iceGeometry, iceMaterial);
            ice.position.set(
                (Math.random() - 0.5) * 0.3,
                -0.5 + Math.random() * 0.5,
                (Math.random() - 0.5) * 0.2
            );
            ice.rotation.x = Math.random() * Math.PI;
            ice.rotation.y = Math.random() * Math.PI;
            group.add(ice);
        }
        
        group.scale.set(1.5, 1.5, 1.5);
        group.position.y = -0.5;
        
        return group;
    }
    
    createBreadTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#c49861';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < 100; i++) {
            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.3})`;
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 5,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        return texture;
    }
    
    showFood(foodType) {
        if (this.currentFood) {
            this.scene.remove(this.currentFood);
        }
        
        let newFood;
        switch(foodType) {
            case 'doener':
                newFood = this.createDoener();
                break;
            case 'burger':
                newFood = this.createBurger();
                break;
            case 'pizza':
                newFood = this.createPizza();
                break;
            case 'fries':
                newFood = this.createFries();
                break;
            case 'drink':
                newFood = this.createSoftDrink();
                break;
            default:
                newFood = this.createDoener();
        }
        
        this.currentFood = newFood;
        this.scene.add(newFood);
        this.animationTime = 0;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.animationTime += 0.008;
        
        // Rotate food
        if (this.currentFood) {
            this.currentFood.rotation.y = this.animationTime * 0.5;
            this.currentFood.position.z = Math.sin(this.animationTime * 0.5) * 0.3;
            this.currentFood.position.x = Math.cos(this.animationTime * 0.3) * 0.2;
        }
        
        // Animate particles
        if (this.particleSystem) {
            const positions = this.particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += this.particleSystem.velocities[i / 3 * 0] * 0.5;
                positions[i + 1] += this.particleSystem.velocities[i / 3 * 1] * 0.5;
            }
            this.particleSystem.geometry.attributes.position.needsUpdate = true;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

const foodRenderer = new FoodRenderer('food-canvas');