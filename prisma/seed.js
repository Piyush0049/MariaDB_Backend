const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = [
        // WATCHES (6)
        {
            name: "ZENITH CHRONO",
            description: "A timeless masterpiece of precision and elegance. Crafted with surgical-grade stainless steel and a sapphire crystal face.",
            price: 1240.00,
            category: "WATCHES",
            image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
            stock: 15
        },
        {
            name: "ONYX STEALTH",
            description: "All-black matte ceramic construction with automatic movement. Minimalist aesthetic for the modern professional.",
            price: 2100.00,
            category: "WATCHES",
            image: "https://images.unsplash.com/photo-1508685096489-7aac291bd5b3?q=80&w=1000&auto=format&fit=crop",
            stock: 5
        },
        {
            name: "ROSE GOLD HORIZON",
            description: "18k rose gold casing with a genuine alligator leather strap. Features a moon phase complication.",
            price: 3450.00,
            category: "WATCHES",
            image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop",
            stock: 3
        },
        {
            name: "MARINER DEEP",
            description: "Professional diver's watch, water-resistant to 300m. Luminescent markers on a deep sea blue dial.",
            price: 980.00,
            category: "WATCHES",
            image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop",
            stock: 20
        },
        {
            name: "SKELETON PURE",
            description: "Transparent dial revealing the intricate manual-wind movement. A feat of mechanical engineering.",
            price: 1560.00,
            category: "WATCHES",
            image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop",
            stock: 7
        },
        {
            name: "AVIATOR ELITE",
            description: "Designed for the cockpit. Dual time zone display and tachymeter bezel in lightweight titanium.",
            price: 890.00,
            category: "WATCHES",
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop",
            stock: 12
        },

        // JEWELRY (6)
        {
            name: "LUMINA EARRINGS",
            description: "Exquisite 18k gold earrings set with ethically sourced pear-cut diamonds.",
            price: 850.00,
            category: "JEWELRY",
            image: "https://images.unsplash.com/photo-1535633302703-9420414421aa?q=80&w=1000&auto=format&fit=crop",
            stock: 8
        },
        {
            name: "SOLSTICE PENDANT",
            description: "A single 2ct emerald suspended from a platinum chain. Simple, elegant, unforgettable.",
            price: 2400.00,
            category: "JEWELRY",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
            stock: 4
        },
        {
            name: "ETERNITY BAND",
            description: "Continuous circle of round-cut diamonds in white gold setting. A symbol of everlasting commitment.",
            price: 1800.00,
            category: "JEWELRY",
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
            stock: 10
        },
        {
            name: "AZURE BRACELET",
            description: "Sapphires and diamonds interwoven in a flexible silver link design.",
            price: 1200.00,
            category: "JEWELRY",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
            stock: 14
        },
        {
            name: "ROYAL CHOKER",
            description: "Tahitian black pearls hand-knotted on silk. A classic piece redefined for the modern age.",
            price: 750.00,
            category: "JEWELRY",
            image: "https://images.unsplash.com/photo-1598560912005-5976593c3960?q=80&w=1000&auto=format&fit=crop",
            stock: 6
        },
        {
            name: "AURUM SIGNET",
            description: "Heavy 22k gold signet ring with a polished black onyx face. Custom engraving available.",
            price: 520.00,
            category: "JEWELRY",
            image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1000&auto=format&fit=crop",
            stock: 15
        },

        // FRAGRANCE (6)
        {
            name: "OBSIDIAN FRAGRANCE",
            description: "A deep, mysterious scent with notes of sandalwood, amber, and rare black orchid.",
            price: 210.00,
            category: "FRAGRANCE",
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
            stock: 45
        },
        {
            name: "CELESTIAL MIST",
            description: "A light, airy fragrance with hints of jasmine, sea salt, and white musk. Evocative of summer nights.",
            price: 185.00,
            category: "FRAGRANCE",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
            stock: 30
        },
        {
            name: "TERRA ESSENCE",
            description: "Earthbound notes of cedar, vetiver, and bergamot. Sophisticated and grounded.",
            price: 245.00,
            category: "FRAGRANCE",
            image: "https://images.unsplash.com/photo-1557170334-a7c3a196324c?q=80&w=1000&auto=format&fit=crop",
            stock: 25
        },
        {
            name: "MIDNIGHT BLOOM",
            description: "The intoxicating scent of night-blooming cereus and dark cocoa. Sensual and daring.",
            price: 310.00,
            category: "FRAGRANCE",
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop",
            stock: 18
        },
        {
            name: "OUD MAJESTIC",
            description: "Rare Cambodian oud blended with saffron and rose. The ultimate expression of luxury perfumery.",
            price: 450.00,
            category: "FRAGRANCE",
            image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
            stock: 10
        },
        {
            name: "CITRUS GOLD",
            description: "Zesty Sicilian lemon and grapefruit notes balanced with white ginger. Energetic and vibrant.",
            price: 160.00,
            category: "FRAGRANCE",
            image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1000&auto=format&fit=crop",
            stock: 50
        },

        // BAGS (6)
        {
            name: "VELVET NOIR CLUTCH",
            description: "Italian velvet evening clutch with a detachable gold chain link strap.",
            price: 590.00,
            category: "BAGS",
            image: "https://images.unsplash.com/photo-1566150905458-1bf1fd111c36?q=80&w=1000&auto=format&fit=crop",
            stock: 12
        },
        {
            name: "SAPPHIRE TOTE",
            description: "Full-grain calfskin tote in a deep navy hue. Features a spacious suede-lined interior.",
            price: 1100.00,
            category: "BAGS",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
            stock: 8
        },
        {
            name: "MONOLITH BACKPACK",
            description: "Sleek, structured backpack crafted from water-resistant ballistic nylon and leather.",
            price: 450.00,
            category: "BAGS",
            image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop",
            stock: 22
        },
        {
            name: "EMERALD CROSSBODY",
            description: "Petite crossbody bag in vibrant malachite green leather with silver hardware.",
            price: 320.00,
            category: "BAGS",
            image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
            stock: 16
        },
        {
            name: "CARBON DUFFEL",
            description: "The perfect weekend companion. Lightweight, durable, and exceptionally stylish.",
            price: 890.00,
            category: "BAGS",
            image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=1000&auto=format&fit=crop",
            stock: 5
        },
        {
            name: "CHAMPAGNE POUCH",
            description: "Metallic leather pouch with a gathered closure. Adds a touch of glamour to any ensemble.",
            price: 280.00,
            category: "BAGS",
            image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
            stock: 30
        },

        // ACCESSORIES (6)
        {
            name: "AURA SILK SCARF",
            description: "Hand-painted 100% mulberry silk scarf featuring abstract cosmic patterns.",
            price: 340.00,
            category: "ACCESSORIES",
            image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop",
            stock: 20
        },
        {
            name: "POLARIS SUNGLASSES",
            description: "Hand-polished acetate frames with polarized category 3 lenses. UV400 protection.",
            price: 290.00,
            category: "ACCESSORIES",
            image: "https://images.unsplash.com/photo-1511499767350-a1593f67dd3a?q=80&w=1000&auto=format&fit=crop",
            stock: 25
        },
        {
            name: "GILDED BELT",
            description: "Fine Italian leather belt with a sculptured 24k gold-plated buckle.",
            price: 180.00,
            category: "ACCESSORIES",
            image: "https://images.unsplash.com/photo-1614165933834-125025ac030d?q=80&w=1000&auto=format&fit=crop",
            stock: 40
        },
        {
            name: "TITAN CUFFLINKS",
            description: "Minimalist titanium cufflinks with a brushed finish. Engineering meets elegance.",
            price: 120.00,
            category: "ACCESSORIES",
            image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
            stock: 50
        },
        {
            name: "MARBLE TECH CASE",
            description: "Sleek, impact-resistant case with a genuine Carrara marble inlay for your mobile device.",
            price: 95.00,
            category: "ACCESSORIES",
            image: "https://images.unsplash.com/photo-1586105251261-72a756ca495e?q=80&w=1000&auto=format&fit=crop",
            stock: 60
        },
        {
            name: "CASHMERE TRAVEL SET",
            description: "Includes a sleep mask, throw, and travel pouch, all in pure Mongolian cashmere.",
            price: 420.00,
            category: "ACCESSORIES",
            image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1000&auto=format&fit=crop",
            stock: 12
        }
    ];

    console.log('Seeding 30 verified luxury products...');

    await prisma.review.deleteMany({});
    await prisma.product.deleteMany({});

    for (const product of products) {
        await prisma.product.create({
            data: product
        });
    }

    console.log('Seeding finished successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
