import { Collection } from "../db/jsonDb";
import { WasteItem, EcoTip, Article, DropoffPoint, ContactMessage, QuizResult } from "../../src/types";

// Seed data for E-Waste items
const defaultWasteItems: WasteItem[] = [
  {
    id: "smartphones",
    name: "Smartphones",
    category: "electronics",
    description: "Personal mobile communication devices loaded with dense electronics, rare earth materials, and lithium-ion batteries.",
    recyclability: 95,
    toxicity: "High",
    preciousMetals: ["Gold", "Silver", "Copper", "Palladium", "Platinum"],
    hazards: ["Lead", "Cadmium", "Arsenic", "Beryllium", "Brominated Flame Retardants"],
    disposalInstructions: "Perform a full factory reset to delete personal data. Remove protective cases. Do NOT puncture the battery. Deliver to an authorized electronics recycler or cell phone carrier drop-off bin.",
    facts: "One ton of cell phones (about 6,000 units) contains about 130 kg of copper, 3.5 kg of silver, and 340 grams of gold — far richer than raw gold ore! Recycling them saves massive mining greenhouse emissions."
  },
  {
    id: "laptops",
    name: "Laptops & Notebooks",
    category: "electronics",
    description: "Portable personal computers containing microprocessors, high-resolution LCD/OLED screens, keyboards, and lithium battery cells.",
    recyclability: 90,
    toxicity: "High",
    preciousMetals: ["Gold", "Silver", "Copper", "Tin", "Nickel"],
    hazards: ["Lead", "Mercury (in older CCFL backlights)", "Cadmium", "Flame Retardants"],
    disposalInstructions: "Back up your data, then securely erase the hard drive using DBAN or built-in encryption wipes. If the battery is swollen or removable, handle with care. Deliver to a dedicated computer recycling drive.",
    facts: "Recycling 1 million laptops saves the energy equivalent to the electricity used by more than 3,500 US homes in a single year. Only 20% of global laptop waste is documented as properly collected."
  },
  {
    id: "crt-monitors",
    name: "Old CRT Monitors & TVs",
    category: "appliances",
    description: "Legacy Cathode Ray Tube displays with heavy glass screens and vacuum tubes.",
    recyclability: 60,
    toxicity: "Critical",
    preciousMetals: ["Copper", "Iron"],
    hazards: ["Lead", "Barium", "Phosphorus", "Cadmium"],
    disposalInstructions: "Extremely heavy and fragile. Never break the glass funnel as it releases highly toxic phosphor dust and explosive vacuum release. Store in a dry place and transport carefully to a municipal hazardous waste facility.",
    facts: "A single average-sized CRT monitor can contain between 2 to 4 kilograms (4 to 8 pounds) of toxic lead in its glass! It is one of the most hazardous classes of e-waste."
  },
  {
    id: "li-ion-batteries",
    name: "Lithium-Ion Batteries",
    category: "batteries",
    description: "Rechargeable batteries commonly found in phones, tablets, power tools, and electric vehicles.",
    recyclability: 85,
    toxicity: "Critical",
    preciousMetals: ["Cobalt", "Lithium", "Nickel", "Copper", "Aluminum"],
    hazards: ["Lithium Hexafluorophosphate", "Organic Solvents", "Heavy Metals"],
    disposalInstructions: "NEVER dispose of in municipal trash bins. They can puncture or short-circuit in garbage trucks, triggering catastrophic, toxic lithium chemical fires. Tape the metal terminals with electrical tape and place them in dedicated battery collection tubes at supermarkets or recycling centers.",
    facts: "Lithium-ion batteries are responsible for hundreds of trash truck and landfill fires worldwide every year. When safely recycled, over 95% of cobalt and lithium can be retrieved for new batteries."
  },
  {
    id: "chargers-cables",
    name: "Chargers, Adapters & Cables",
    category: "accessories",
    description: "Power bricks, USB cords, Ethernet lines, and peripheral copper wiring.",
    recyclability: 98,
    toxicity: "Low",
    preciousMetals: ["Copper", "Aluminum"],
    hazards: ["PVC (Polyvinyl Chloride)", "Phthalates"],
    disposalInstructions: "Bundle them together to prevent tangling in recycling sorting machinery (tanglers). Drop off at standard e-waste bins. Copper recovery is highly efficient.",
    facts: "The copper inside cables is extremely high-grade and infinitely recyclable. Dropping them off helps stop raw copper open-pit mining, which devastates rainforests."
  },
  {
    id: "printers",
    name: "Printers & Scanners",
    category: "it_telecom",
    description: "Document imaging systems with plastic casings, toner cartridges, print heads, and scanner glass.",
    recyclability: 75,
    toxicity: "Medium",
    preciousMetals: ["Copper", "Silver", "Steel"],
    hazards: ["Microplastic Toners", "Carbon Black", "Flame Retardants"],
    disposalInstructions: "Remove all ink and toner cartridges before recycling. Toner cartridges can be returned to their manufacturers for credit. Send the hardware chassis to standard e-waste hubs.",
    facts: "Unused toner contains microscopic plastic powders which can damage human lungs if inhaled. Recycling printer cartridges prevents them from clogging waterways for 450 years."
  }
];

// Seed data for EcoTips
const defaultEcoTips: EcoTip[] = [
  {
    id: "tip-1",
    title: "The 1-In-1-Out Rule",
    content: "Before purchasing a brand new smartphone, tablet, or accessory, challenge yourself to recycle or safely donate one obsolete device you currently have gathering dust in drawers.",
    category: "reduction",
    isDaily: true
  },
  {
    id: "tip-2",
    title: "Secure Your Personal Data",
    content: "Always back up your private files and execute a certified factory reset before parting with any computerized device. Remove microSD cards and SIM cards to protect your identity.",
    category: "awareness",
    isDaily: false
  },
  {
    id: "tip-3",
    title: "Tape Battery Terminals First",
    content: "When storing batteries for recycling, place a piece of clear tape over the positive and negative metal terminals. This simple step prevents them from touching, generating sparks, and igniting fires.",
    category: "recycling",
    isDaily: false
  },
  {
    id: "tip-4",
    title: "Modular & Repairable is Better",
    content: "Support manufacturers that publish repair manuals, sell original replacement parts directly, and design modular hardware (e.g., Fairphone, Framework Laptops) that are easy to open and upgrade.",
    category: "reduction",
    isDaily: false
  },
  {
    id: "tip-5",
    title: "Repurpose Obsolete Devices",
    content: "Don't toss out an old functional smartphone. Convert it into a dedicated home security camera, an offline digital music player, an e-reader, or a permanent desk clock.",
    category: "reuse",
    isDaily: false
  }
];

// Seed data for Articles
const defaultArticles: Article[] = [
  {
    id: "article-1",
    title: "The Poison in Our Pockets: Inside the E-Waste Crisis",
    excerpt: "Explore the hidden journey of our electronic trash and how heavy metals leak into groundwater tables globally.",
    content: `We buy electronics at an astonishing pace. Every year, humans generate over 60 million metric tons of e-waste—a mountain growing three times faster than standard trash. But when we discard a device carelessly, where does it end up?

Often, electronic waste undergoes illegal international shipping to developing countries with relaxed environmental laws. There, informal workers (including children) burn wires in open-air pits to melt copper and bathe circuit boards in toxic acid to leach gold. 

This crude processing releases highly toxic heavy metals like:
- **Lead**: A potent neurotoxin that attacks the nervous systems of children and damages cognitive growth.
- **Mercury**: Concentrates in waterways, bioaccumulating in fish, which causes severe neurological damage in consumers.
- **Cadmium**: Causes permanent kidney failure and bone softening when absorbed.

By recycling your e-waste through authorized, R2-certified facilities, you ensure these toxic components are isolated and captured safely, keeping them out of vulnerable communities and ecosystems.`,
    category: "impact",
    author: "Elena Rostov",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "article-2",
    title: "Mining Our Trash: Why Urban Mining Beats Traditional Ore Extraction",
    excerpt: "Why the richest metal deposits on Earth are no longer deep underground, but trapped in our landfills.",
    content: `To manufacture a single smartphone, mining companies must dig up, blast, transport, and refine more than 34 kilograms (75 pounds) of high-grade raw mineral ores deep from the Earth. This destructive process strips forests, pollutes rivers with heavy acidic tailings, and consumes astronomical fossil fuels.

Now, compare this with **Urban Mining**—the process of recovering valuable materials directly from discarded electronics:
1. **Purity**: One ton of discarded smartphones contains up to 100 times more gold than a ton of gold-bearing geological ore!
2. **Carbon Offset**: Extracting metal through urban recycling emits up to 80% fewer greenhouse gases than primary underground mining.
3. **Conserving Habitats**: Using recycled copper, cobalt, and lithium preserves endangered habitats from open-pit mining in places like the Congo and Indonesia.

Urban mining turns waste into resources, fostering a true circular economy. The next time you recycle a tablet, you are actively preventing heavy industrial blasting in the world's most pristine forests.`,
    category: "educational",
    author: "Marcus Chen",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "article-3",
    title: "Extended Producer Responsibility (EPR): Holding Tech Giants Accountable",
    excerpt: "What is EPR and how are worldwide legislations forcing manufacturers to design for easy recycling?",
    content: `For decades, device manufacturers designed electronics with 'planned obsolescence'—making them cheap to produce, hard to repair, and easy to discard. However, a major regulatory shift called **Extended Producer Responsibility (EPR)** is changing the landscape.

EPR laws mandate that electronics manufacturers must establish and fund collection systems to take back their hardware at the end of its life-cycle. 

This model creates strong financial incentives for manufacturers to:
- **Design for Disassembly**: Use snap-on parts instead of excessive permanent industrial glues, making manual battery extraction easier.
- **Eliminate Toxins**: Replace halogenated flame retardants and heavy metals with safe organic alternatives to reduce recycling liabilities.
- **Incorporate Recycled Plastics**: Re-use consumer plastics, creating a market pull for recycled polymers.

In regions with active EPR legislation (like the EU, California, and India), recycling bins are widespread and accessible. As consumers, we can support this change by only purchasing from brands that offer free, convenient take-back mailers and repair guarantees.`,
    category: "guides",
    author: "Sarah Jenkins",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  }
];

// Seed data for DropoffPoints
const defaultDropoffPoints: DropoffPoint[] = [
  {
    id: "point-1",
    name: "GreenEarth EcoHub Center",
    address: "742 Evergreen Terrace, Sector 4",
    city: "Metropolis",
    phone: "(555) 123-4567",
    hours: "Mon - Sat: 8:00 AM - 6:00 PM",
    acceptedItems: ["Smartphones", "Laptops", "Batteries", "Cables", "Keyboards", "Printers"],
    lat: 40.7128,
    lng: -74.0060
  },
  {
    id: "point-2",
    name: "Metro E-Waste Depot",
    address: "105 Industrial Parkway, Dock C",
    city: "Metropolis",
    phone: "(555) 987-6543",
    hours: "Mon - Fri: 9:00 AM - 5:00 PM, Sat: 10:00 AM - 4:00 PM",
    acceptedItems: ["Refrigerators", "Microwaves", "CRT Monitors", "Smartphones", "Printers"],
    lat: 40.7306,
    lng: -73.9352
  },
  {
    id: "point-3",
    name: "Re-Cell Battery & Tech Dropoff",
    address: "482 Retail Blvd, Space 12 (Inside Supermarket Mall)",
    city: "Metropolis",
    phone: "(555) 246-8101",
    hours: "Daily: 9:00 AM - 9:00 PM",
    acceptedItems: ["Batteries", "Smartphones", "Chargers & Cables", "Accessories"],
    lat: 40.7589,
    lng: -73.9851
  },
  {
    id: "point-4",
    name: "Municipal Recycling & Hazardous Waste Center",
    address: "22 Waste Management Way",
    city: "Eco-City",
    phone: "(555) 369-1470",
    hours: "Wed & Sat only: 7:00 AM - 3:00 PM",
    acceptedItems: ["CRT Monitors", "Appliances", "Batteries", "Laptops", "Printers", "Industrial Electronics"],
    lat: 34.0522,
    lng: -118.2437
  }
];

// Instantiations of the mock MongoDB collections
export const WasteItems = new Collection<WasteItem>("waste_items", defaultWasteItems);
export const EcoTips = new Collection<EcoTip>("tips", defaultEcoTips);
export const Articles = new Collection<Article>("articles", defaultArticles);
export const DropoffPoints = new Collection<DropoffPoint>("dropoff_points", defaultDropoffPoints);
export const Contacts = new Collection<ContactMessage>("contacts", []);
export const QuizResults = new Collection<QuizResult>("quiz_results", [
  { id: "seed-1", nickname: "GreenWarrior", score: 8, totalQuestions: 8, level: "Green Champion", completedAt: new Date().toISOString() },
  { id: "seed-2", nickname: "E-cycleAdept", score: 6, totalQuestions: 8, level: "E-Waste Learner", completedAt: new Date().toISOString() },
  { id: "seed-3", nickname: "ObsoleteTamer", score: 5, totalQuestions: 8, level: "E-Waste Learner", completedAt: new Date().toISOString() }
]);
