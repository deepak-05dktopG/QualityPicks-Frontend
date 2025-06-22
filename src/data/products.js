
// // Mock data for products
// export const products = [
//   // Electronics
//   {
//     id: 1,
//     name: "Premium Wireless Headphones",
//     price: 249.99,
//     category: "electronics",
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format",
//     rating: 4.8,
//     reviewCount: 1254,
//     description: "Experience studio-quality sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort.",
//     details: "These headphones have been tested against 20 different models and consistently rated highest for sound quality, comfort, and battery life by expert reviewers.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456789",
//     research: [
//       "Rated #1 by Consumer Audio Magazine for noise cancellation",
//       "Over 10,000 5-star reviews on multiple platforms",
//       "Used and recommended by professional audio engineers",
//       "Features the latest Bluetooth 5.2 technology for stable connection"
//     ],
//     features: [
//       "Active Noise Cancellation",
//       "30-hour battery life",
//       "Premium memory foam ear cushions",
//       "Fast charging - 5 minutes for 3 hours of playback",
//       "Built-in high-quality microphones for calls"
//     ],
//     stock: 15
//   },
//   {
//     id: 2,
//     name: "Ultra HD Smart TV",
//     price: 799.99,
//     category: "electronics",
//     image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format",
//     rating: 4.7,
//     reviewCount: 876,
//     description: "Transform your home entertainment with this 55-inch Ultra HD Smart TV featuring Dolby Vision, HDR10+, and built-in streaming apps.",
//     details: "This TV has consistently outperformed competitors in color accuracy tests, has the lowest input lag for gaming, and features the most intuitive smart interface.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456790",
//     research: [
//       "Top rated for picture quality by Digital Trends",
//       "Gaming mode achieves lowest input lag in its class (9.8ms)",
//       "Dolby Vision and HDR10+ certification ensure best-in-class HDR performance",
//       "Smart platform rated easiest to use by tech reviewers"
//     ],
//     features: [
//       "4K Ultra HD Resolution (3840 x 2160)",
//       "Dolby Vision & HDR10+ Support",
//       "Local Dimming for Enhanced Contrast",
//       "120Hz Refresh Rate",
//       "Voice Control Compatible with Multiple Assistants"
//     ],
//     stock: 8
//   },
  
//   // Home & Kitchen
//   {
//     id: 3,
//     name: "Professional Stand Mixer",
//     price: 349.99,
//     category: "home-kitchen",
//     image: "https://images.unsplash.com/photo-1594495024437-db507fd0c8c0?w=500&auto=format",
//     rating: 4.9,
//     reviewCount: 3421,
//     description: "This professional-grade stand mixer makes baking a joy with its powerful motor, 10 speeds, and versatile attachments.",
//     details: "After testing with professional bakers, this mixer outperformed all others in speed, efficiency, and durability. The bowl capacity is perfect for family-sized recipes.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456791",
//     research: [
//       "Used in professional kitchens and bakeries worldwide",
//       "Motor is tested to last at least 15 years of regular use",
//       "Outperforms competitors in kneading tough doughs without overheating",
//       "Attachments rated easiest to clean in dishwasher tests"
//     ],
//     features: [
//       "575-watt motor",
//       "10 speed settings",
//       "5-quart stainless steel bowl",
//       "Includes flat beater, dough hook, and wire whip",
//       "Over 10 optional attachments available separately"
//     ],
//     stock: 12
//   },
//   {
//     id: 4,
//     name: "Smart Air Purifier",
//     price: 229.99,
//     category: "home-kitchen",
//     image: "https://images.unsplash.com/photo-1585771586091-a292320d6d3c?w=500&auto=format",
//     rating: 4.7,
//     reviewCount: 938,
//     description: "Breathe easier with our smart air purifier that removes 99.97% of allergens, dust, mold, and pet dander down to 0.3 microns.",
//     details: "Lab tests show this purifier cleans air faster and more efficiently than competitors, using 30% less energy while maintaining HEPA standards.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456792",
//     research: [
//       "HEPA certification for 99.97% filtration of particles down to 0.3 microns",
//       "Lowest noise level in its class (24dB on lowest setting)",
//       "Energy Star certified for efficiency",
//       "Air quality sensors tested to be accurate within 2% of lab equipment"
//     ],
//     features: [
//       "True HEPA Filter",
//       "Smart air quality monitoring",
//       "Auto mode adjusts to detected air quality",
//       "Smartphone app control",
//       "Filter replacement indicators"
//     ],
//     stock: 7
//   },
  
//   // Fashion
//   {
//     id: 5,
//     name: "Premium Merino Wool Sweater",
//     price: 89.99,
//     category: "fashion",
//     image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format",
//     rating: 4.6,
//     reviewCount: 543,
//     description: "Experience luxury everyday with this premium Merino wool sweater. Incredibly soft, naturally temperature-regulating, and made to last.",
//     details: "Sourced from ethically raised Merino sheep, this wool is finer and softer than regular wool, creating a sweater that doesn't itch and maintains its shape for years.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456793",
//     research: [
//       "Made from 100% non-mulesed Merino wool from New Zealand",
//       "Withstood 30+ washes in durability tests without pilling or shrinking",
//       "Temperature regulation tested effective in environments 30°F to 80°F",
//       "Rated most comfortable by wearers in blind comparison tests"
//     ],
//     features: [
//       "100% premium Merino wool",
//       "Naturally odor-resistant",
//       "Temperature-regulating",
//       "Machine washable",
//       "Available in 6 classic colors"
//     ],
//     stock: 25
//   },
  
//   // Beauty
//   {
//     id: 6,
//     name: "Advanced Skincare Set",
//     price: 129.99,
//     category: "beauty",
//     image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format",
//     rating: 4.8,
//     reviewCount: 1872,
//     description: "Transform your skin with this dermatologist-developed skincare set featuring cleanser, toner, serum, and moisturizer with proven active ingredients.",
//     details: "Clinical trials showed 94% of users experienced improved skin texture, reduced fine lines, and increased hydration after 8 weeks of consistent use.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456794",
//     research: [
//       "Developed and tested by board-certified dermatologists",
//       "Non-comedogenic formula tested on acne-prone skin",
//       "Hypoallergenic formulation suitable for sensitive skin",
//       "Free from parabens, sulfates, and artificial fragrances"
//     ],
//     features: [
//       "Gentle pH-balanced cleanser",
//       "Alcohol-free toner with niacinamide",
//       "Vitamin C and hyaluronic acid serum",
//       "Ceramide-enriched moisturizer with SPF 30",
//       "Sustainable packaging"
//     ],
//     stock: 18
//   },
  
//   // Books
//   {
//     id: 7,
//     name: "Productivity Masterclass Book",
//     price: 24.99,
//     category: "books",
//     image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format",
//     rating: 4.9,
//     reviewCount: 2341,
//     description: "Transform your productivity and achieve your goals with this research-backed guide from world-renowned productivity expert.",
//     details: "Based on 15 years of research and work with top performers, this book provides a practical framework that has helped thousands double their productivity while reducing stress.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456795",
//     research: [
//       "New York Times bestseller for 52 consecutive weeks",
//       "Methods tested with over 10,000 professionals across varied industries",
//       "Techniques cited in multiple peer-reviewed journals",
//       "Author has 20+ years experience in productivity research"
//     ],
//     features: [
//       "320 pages of actionable advice",
//       "Includes access to online resources and worksheets",
//       "Available in hardcover, paperback, e-book, and audiobook",
//       "Updated 2nd edition with new research",
//       "Practical exercises at the end of each chapter"
//     ],
//     stock: 30
//   },
//   {
//     id: 8,
//     name: "Wireless Ergonomic Mouse",
//     price: 59.99,
//     category: "electronics",
//     image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format",
//     rating: 4.7,
//     reviewCount: 1087,
//     description: "Say goodbye to wrist pain with this ergonomically designed wireless mouse that provides all-day comfort and precision.",
//     details: "Developed with ergonomics experts, this mouse reduces wrist strain by 60% compared to traditional mice. Battery lasts up to 70 days on a single charge.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456796",
//     research: [
//       "Ergonomic design verified by occupational therapists",
//       "Tested for 2 million clicks without failure",
//       "Sensor tracks accurately on almost any surface",
//       "57% of users reported reduced wrist pain after 2 weeks"
//     ],
//     features: [
//       "Ergonomic vertical design",
//       "Rechargeable battery with 70-day life",
//       "6 programmable buttons",
//       "Adjustable DPI settings up to 4000",
//       "Compatible with Windows, macOS, and Linux"
//     ],
//     stock: 22
//   },
//   {
//     id: 9,
//     name: "Cast Iron Dutch Oven",
//     price: 79.99,
//     category: "home-kitchen",
//     image: "https://images.unsplash.com/photo-1585837575652-267cbc567db6?w=500&auto=format",
//     rating: 4.9,
//     reviewCount: 3204,
//     description: "This premium enameled cast iron Dutch oven delivers exceptional heat retention and distribution for perfect results every time you cook.",
//     details: "Passed rigorous heat distribution tests and outperformed competitors in durability tests. The enamel interior prevents sticking and is easy to clean.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456797",
//     research: [
//       "Featured as \"Best Overall\" by leading cooking magazines",
//       "Enamel coating tested to withstand 500°F without chipping",
//       "Even heat distribution within 3% variance across the cooking surface",
//       "Handle strength tested to support 5x the maximum weight capacity"
//     ],
//     features: [
//       "5.5-quart capacity",
//       "Premium enameled cast iron",
//       "Oven-safe up to 500°F",
//       "Compatible with all cooktops including induction",
//       "Available in 10 vibrant colors"
//     ],
//     stock: 14
//   },
//   {
//     id: 10,
//     name: "Waterproof Hiking Boots",
//     price: 149.99,
//     category: "fashion",
//     image: "https://images.unsplash.com/photo-1520219306100-ec4afeeefe37?w=500&auto=format",
//     rating: 4.8,
//     reviewCount: 1765,
//     description: "Conquer any trail with these waterproof, breathable hiking boots featuring superior traction and ankle support.",
//     details: "These boots underwent 500 miles of testing in diverse terrains and weather conditions. The waterproof membrane keeps feet dry while allowing moisture to escape.",
//     affiliateLink: "https://www.amazon.com/dp/B0123456798",
//     research: [
//       "Tested in extreme conditions from deserts to mountains",
//       "Waterproofing effective in submersion tests up to 4 hours",
//       "Sole maintains grip on wet surfaces with 30% better traction than competitors",
//       "Ankle support reduces injury risk by 62% according to biomechanics tests"
//     ],
//     features: [
//       "Waterproof leather and performance suede upper",
//       "Breathable waterproof membrane",
//       "Vibram high-traction outsole",
//       "Cushioned EVA midsole",
//       "Reinforced toe cap for durability"
//     ],
//     stock: 19
//   }
// ];

// Get products by category
export const getProductsByCategory = (category) => {
  if (category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
};

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Search products
export const searchProducts = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseQuery) || 
    product.description.toLowerCase().includes(lowerCaseQuery) ||
    product.category.toLowerCase().includes(lowerCaseQuery)
  );
};

// Categories
// export const categories = [
//   {
//     id: 'electronics',
//     name: 'Electronics',
//     image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format',
//     description: 'Thoroughly researched gadgets and devices'
//   },
//   {
//     id: 'home-kitchen',
//     name: 'Home & Kitchen',
//     image: 'https://th.bing.com/th/id/OIP.SD715J1NVQ7Cu7fWGk0xFQHaE7?rs=1&pid=ImgDetMain',
//     description: 'Quality appliances and home essentials'
//   },
//   {
//     id: 'fashion',
//     name: 'Fashion',
//     image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format',
//     description: 'Durable and stylish clothing and accessories'
//   },
//   {
//     id: 'beauty',
//     name: 'Beauty',
//     image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format',
//     description: 'Effective skincare and beauty products'
//   },
//   {
//     id: 'books',
//     name: 'Books',
//     image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format',
//     description: 'Life-changing books worth your time'
//   }
// ];
