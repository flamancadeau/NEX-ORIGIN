export interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
    image: string;
}

export interface ProductSpec {
    key: string;
    value: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    discountPercentage?: number;
    isNew: boolean;
    brand: string;
    categorySlug: string;
    categoryName: string;
    image: string;
    galleryImages: string[];
    specs: ProductSpec[];
    storePhone: string;
    stockQuantity: number;
}

export interface PromoBanner {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    link?: string;
    isActive: boolean;
}

export const CATEGORIES: Category[] = [
    { id: "1", name: "Phones", slug: "phones", icon: "Smartphone", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=300&auto=format&fit=crop" },
    { id: "2", name: "Laptops", slug: "laptops", icon: "Laptop", image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=300&auto=format&fit=crop" },
    { id: "3", name: "Accessories", slug: "accessories", icon: "Layers", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=300&auto=format&fit=crop" },
    { id: "4", name: "Watches", slug: "watches", icon: "Watch", image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?q=80&w=300&auto=format&fit=crop" },
    { id: "5", name: "Speakers", slug: "speakers", icon: "Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=300&auto=format&fit=crop" },
    { id: "6", name: "Ring Light", slug: "ring-light", icon: "Lightbulb", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=300&auto=format&fit=crop" },
    { id: "7", name: "Gimbal", slug: "gimbal", icon: "Camera", image: "https://images.unsplash.com/photo-1583573636246-18cb2246149f?q=80&w=300&auto=format&fit=crop" },
    { id: "8", name: "AirPods Pro 2Gen", slug: "airpods", icon: "Headphones", image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=300&auto=format&fit=crop" },
];

export const BRANDS = ["Apple", "Samsung", "JBL", "Sony", "Huawei", "Xiaomi", "DJI"];

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "iPhone 15 Pro Max",
        description: "The ultimate iPhone with titanium design, A17 Pro chip, and a 48MP camera system with 5x optical zoom. Features USB-C, Action Button, and the most advanced display ever on an iPhone.",
        price: 1899000,
        oldPrice: 2110000,
        discountPercentage: 10,
        isNew: true,
        brand: "Apple",
        categorySlug: "phones",
        categoryName: "Phones",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1695048064803-e7a9a5f0d6db?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "Storage", value: "256GB" },
            { key: "Display", value: "6.7-inch Super Retina XDR OLED" },
            { key: "Processor", value: "A17 Pro" },
            { key: "Camera", value: "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto" },
            { key: "Battery", value: "Up to 29 hours video playback" },
            { key: "Connectivity", value: "5G, Wi-Fi 6E, USB-C" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 15
    },
    {
        id: "2",
        name: "Samsung Galaxy S24 Ultra",
        description: "Galaxy AI is here. The ultimate flagship with S Pen, titanium frame, and 200MP camera. Experience AI-powered photo editing, live translation, and the brightest Galaxy display ever.",
        price: 1750000,
        oldPrice: 1950000,
        discountPercentage: 10,
        isNew: true,
        brand: "Samsung",
        categorySlug: "phones",
        categoryName: "Phones",
        image: "https://images.unsplash.com/photo-1706794704012-9a01010e2513?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1706794704012-9a01010e2513?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "RAM Size", value: "12GB" },
            { key: "Storage", value: "512GB" },
            { key: "Processor", value: "Snapdragon 8 Gen 3" },
            { key: "Camera", value: "200MP Main + 50MP 5x Telephoto" },
            { key: "Battery", value: "5000mAh" },
            { key: "Display", value: "6.8-inch Dynamic AMOLED 2X, 120Hz" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 10
    },
    {
        id: "3",
        name: "MacBook Pro 16\" M3 Max",
        description: "Unprecedented performance for pro workflows. The M3 Max chip delivers blazing-fast performance for the most demanding creative tasks — from rendering 3D scenes to compiling massive codebases.",
        price: 3500000,
        isNew: true,
        brand: "Apple",
        categorySlug: "laptops",
        categoryName: "Laptops",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "Processor", value: "Apple M3 Max (16-core CPU, 40-core GPU)" },
            { key: "RAM", value: "36GB Unified Memory" },
            { key: "Storage", value: "1TB SSD" },
            { key: "Display", value: "16.2-inch Liquid Retina XDR" },
            { key: "Battery", value: "Up to 22 hours" },
            { key: "Ports", value: "3x Thunderbolt 4, HDMI, SD card, MagSafe" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 5
    },
    {
        id: "4",
        name: "Apple Watch Ultra 2",
        description: "The most rugged and capable Apple Watch, built for exploration, adventure, and endurance. Precision dual-frequency GPS, 36-hour battery, and a titanium case rated to 100m water resistance.",
        price: 1200000,
        oldPrice: 1350000,
        discountPercentage: 11,
        isNew: false,
        brand: "Apple",
        categorySlug: "watches",
        categoryName: "Watches",
        image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1546868871-af0de0ae72be?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "Case Material", value: "Grade 5 Titanium" },
            { key: "Display", value: "49mm Always-On Retina, 3000 nits" },
            { key: "Battery", value: "Up to 36 hours (72h Low Power)" },
            { key: "Water Resistance", value: "100m / EN13319" },
            { key: "Chip", value: "Apple S9 SiP with U2" },
            { key: "Connectivity", value: "GPS + Cellular, Wi-Fi, BT 5.3" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 8
    },
    {
        id: "5",
        name: "JBL Charge 5",
        description: "Portable Bluetooth speaker with Powerbank feature. Bold JBL Original Pro Sound with deep bass, IP67 waterproof and dustproof, and 20 hours of playtime. Charge your devices on the go.",
        price: 280000,
        isNew: false,
        brand: "JBL",
        categorySlug: "speakers",
        categoryName: "Speakers",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "Connectivity", value: "Bluetooth 5.1" },
            { key: "Battery", value: "20 hours playback" },
            { key: "Waterproof", value: "IP67 Waterproof & Dustproof" },
            { key: "Driver", value: "Racetrack woofer + tweeter" },
            { key: "Powerbank", value: "Yes — USB-A output" },
            { key: "Weight", value: "960g" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 20
    },
    {
        id: "6",
        name: "AirPods Pro 2nd Gen",
        description: "Rebuilt from the sound up with the Apple H2 chip. Active Noise Cancellation up to 2x more effective, Adaptive Transparency, Personalized Spatial Audio, and up to 6 hours of listening time.",
        price: 350000,
        oldPrice: 400000,
        discountPercentage: 12,
        isNew: true,
        brand: "Apple",
        categorySlug: "airpods",
        categoryName: "AirPods Pro",
        image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "Chip", value: "Apple H2" },
            { key: "ANC", value: "2x more effective Active Noise Cancellation" },
            { key: "Battery", value: "6 hours (30h with case)" },
            { key: "Audio", value: "Personalized Spatial Audio with head tracking" },
            { key: "Charging", value: "USB-C, MagSafe, Apple Watch charger" },
            { key: "Water Resistance", value: "IPX4 (earbuds + case)" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 25
    },
    {
        id: "7",
        name: "18\" Ring Light Kit",
        description: "Professional LED ring light for content creators, vloggers, and streamers. 3 color modes (warm/cool/daylight), 10 brightness levels, includes 2m adjustable tripod stand and phone holder.",
        price: 85000,
        oldPrice: 100000,
        discountPercentage: 15,
        isNew: false,
        brand: "Generic",
        categorySlug: "ring-light",
        categoryName: "Ring Light",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "Diameter", value: "18-inch (45cm)" },
            { key: "Color Temp", value: "3200K–5600K (3 modes)" },
            { key: "Brightness", value: "10 levels, dimmable" },
            { key: "Stand", value: "Adjustable tripod, max 2m height" },
            { key: "Power", value: "USB powered, 18W" },
            { key: "Includes", value: "Phone holder, Bluetooth remote" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 30
    },
    {
        id: "8",
        name: "DJI OM 6 Gimbal",
        description: "Capture smooth, cinematic video on the go. Intelligent 3-axis stabilization, ActiveTrack 6.0 face and subject tracking, built-in extension rod, and creative shooting modes like timelapse and panorama.",
        price: 195000,
        isNew: true,
        brand: "DJI",
        categorySlug: "gimbal",
        categoryName: "Gimbal",
        image: "https://images.unsplash.com/photo-1583573636246-18cb2246149f?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1583573636246-18cb2246149f?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "Stabilization", value: "3-Axis Motorized Gimbal" },
            { key: "Tracking", value: "ActiveTrack 6.0" },
            { key: "Battery", value: "6.4 hours runtime" },
            { key: "Extension Rod", value: "Built-in, 215mm" },
            { key: "Connectivity", value: "Bluetooth 5.1" },
            { key: "Weight", value: "309g" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 12
    },
    {
        id: "9",
        name: "Samsung Galaxy Buds2 Pro",
        description: "Ultimate Hi-Fi sound with 24-bit audio, Intelligent ANC, and 360 Audio. Ergonomic fit with IPX7 water resistance. Seamless switching between Galaxy devices.",
        price: 250000,
        oldPrice: 290000,
        discountPercentage: 14,
        isNew: false,
        brand: "Samsung",
        categorySlug: "accessories",
        categoryName: "Accessories",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "Audio", value: "24-bit Hi-Fi with SSC codec" },
            { key: "ANC", value: "Intelligent Active Noise Cancellation" },
            { key: "Battery", value: "5 hours (ANC on), 18h with case" },
            { key: "360 Audio", value: "Yes, with head tracking" },
            { key: "Water Resistance", value: "IPX7" },
            { key: "Weight", value: "5.5g per earbud" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 18
    },
    {
        id: "10",
        name: "Xiaomi Redmi Note 13 Pro",
        description: "Capture iconic shots with the 200MP camera. Features a stunning 120Hz AMOLED display, MediaTek Dimensity 7200 Ultra processor, 67W turbo charging, and IP54 splash resistance.",
        price: 450000,
        oldPrice: 517000,
        discountPercentage: 13,
        isNew: true,
        brand: "Xiaomi",
        categorySlug: "phones",
        categoryName: "Phones",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&auto=format&fit=crop"
        ],
        specs: [
            { key: "Camera", value: "200MP Main + 8MP Ultra Wide + 2MP Macro" },
            { key: "Display", value: "6.67-inch 120Hz AMOLED, 1800 nits" },
            { key: "Processor", value: "MediaTek Dimensity 7200 Ultra" },
            { key: "Battery", value: "5100mAh with 67W Turbo Charging" },
            { key: "Storage", value: "256GB / 8GB RAM" },
            { key: "Protection", value: "IP54 Splash Resistance, Gorilla Glass 5" }
        ],
        storePhone: "+250788123456",
        stockQuantity: 40
    }
];

export const PROMO_BANNERS: PromoBanner[] = [
    {
        id: "1",
        title: "Unleash Innovation",
        subtitle: "New iPhone 15 Pro Max — Titanium design, A17 Pro chip, 5x optical zoom.",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop",
        link: "/products/1",
        isActive: true
    },
    {
        id: "2",
        title: "Cinematic Excellence",
        subtitle: "MacBook Pro M3 Max — Unprecedented power for pro workflows.",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1200&auto=format&fit=crop",
        link: "/products/3",
        isActive: true
    },
    {
        id: "3",
        title: "Sound of Passion",
        subtitle: "JBL Charge 5 — 20 hours of bold sound, IP67 waterproof.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1200&auto=format&fit=crop",
        link: "/products/5",
        isActive: true
    }
];

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-RW").format(price) + " FRW";
};

export const calculateFinalPrice = (price: number, discountPercentage?: number): number => {
    if (!discountPercentage) return price;
    return Math.round(price - (price * discountPercentage / 100));
};

export const generateWhatsAppLink = (phoneNumber: string, message: string): string => {
    return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
};
