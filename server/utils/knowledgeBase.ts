import { WasteItems } from "../models";

interface IntentResponse {
  keywords: string[];
  response: string;
  category: string;
}

const FAQ_INTENTS: IntentResponse[] = [
  {
    category: "greeting",
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "yo", "start"],
    response: "Hello! I am EcoBot, your Sustainable E-Waste Awareness Assistant. 🌿 I am here to help you identify e-waste, find recycling instructions, protect your personal data, or quiz your green knowledge. Ask me anything about electronic waste!"
  },
  {
    category: "definition",
    keywords: ["what is e-waste", "what is ewaste", "define e-waste", "meaning of e-waste", "explain e-waste", "what does e-waste mean"],
    response: "E-Waste (Electronic Waste) refers to any discarded electrical or electronic devices with a battery, cord, or plug. This includes smartphones, laptops, monitors, old cables, microwaves, and batteries. If it had electrical current running through it, it is considered e-waste when discarded!"
  },
  {
    category: "danger",
    keywords: ["dangerous", "toxic", "poison", "harmful", "pollution", "hazards", "why is e-waste bad", "chemicals", "lead", "mercury", "acid"],
    response: "Electronics contain highly hazardous materials like Lead, Mercury, Cadmium, and Brominated Flame Retardants. When discarded in standard landfills, these chemicals leach into the surrounding soil and groundwater tables. This contaminates local water supplies, enters agricultural systems, and causes severe nervous system, kidney, and brain damage in humans and wildlife."
  },
  {
    category: "data_wipe",
    keywords: ["data", "privacy", "security", "wipe", "reset", "erase", "personal files", "delete", "format", "password"],
    response: "Protecting your privacy is essential! Before recycling any computer or phone, follow these steps:\n1. Back up all irreplaceable photos and files to cloud or hard storage.\n2. Perform a certified factory data reset.\n3. Remove physical SIM cards and expandable microSD storage cards.\n4. If possible, use disk-shredding tools (like DBAN) for older laptops."
  },
  {
    category: "precious_metals",
    keywords: ["gold", "silver", "metals", "copper", "urban mining", "rare earth", "minerals", "value"],
    response: "Electronics are actual goldmines! They contain highly concentrated precious metals including Gold, Silver, High-grade Copper, Palladium, and Lithium. Recovering these materials from waste devices (called 'Urban Mining') is up to 100 times cleaner and more resource-efficient than traditional underground drilling and mining."
  },
  {
    category: "batteries",
    keywords: ["battery", "batteries", "alkaline", "lithium", "rechargeable", "aa battery", "aaa battery"],
    response: "Batteries require special attention! High-energy lithium-ion batteries can easily trigger intense chemical fires inside municipal garbage trucks and waste sorting centers if punctured or crushed. Place tape over the terminals (positive & negative pins) and drop them off in dedicated battery collection tubes at local retail stores or hazardous disposal sites."
  },
  {
    category: "how_to_recycle",
    keywords: ["how do i recycle", "where to recycle", "drop off", "collection", "dispose", "dump", "throw away", "get rid of"],
    response: "Never throw e-waste in your regular trash bin! Instead, you can: \n1. Check our interactive 'Recycling Guide' tab to find verified local collection hubs.\n2. Look up store buy-back/take-back options (many retailers accept cords and phones for free).\n3. Consult municipal drop-off schedules for electronic disposal drives."
  },
  {
    category: "help",
    keywords: ["help", "what can you do", "features", "options", "menu", "how to use"],
    response: "I can help you with:\n1. **Identifying E-Waste**: Tell me what device you want to throw away, and I'll tell you its toxicity, hazards, and proper disposal.\n2. **Eco Tips**: Get tips on reducing electronic consumption.\n3. **Quiz Challenge**: Test your knowledge with our built-in interactive Quiz.\n4. **Recycling Centers**: Guide you on finding local drop-off facilities."
  },
  {
    category: "creator",
    keywords: ["who made you", "who created you", "about ecobot", "who are you", "author"],
    response: "I am EcoBot, built with a vision to eliminate electronic hazards and promote urban mining. I run on an eco-friendly full-stack Express and React platform, designed to assist everyone in adopting circular sustainable electronic practices."
  }
];

const ITEM_ALIASES: Record<string, string[]> = {
  "smartphones": ["smartphone", "smart phone", "phone", "mobile", "cellphone", "cell phone", "iphone", "android"],
  "laptops": ["laptop", "notebook", "computer", "pc", "macbook"],
  "crt-monitors": ["crt", "monitor", "tv", "television", "screen", "display"],
  "li-ion-batteries": ["battery", "batteries", "powerbank", "power bank", "lithium", "li-ion"],
  "chargers-cables": ["charger", "cable", "wire", "cord", "adapter", "usb", "cables", "chargers"],
  "printers": ["printer", "scanner", "printers", "scanners"]
};

export async function processChatQuery(query: string): Promise<string> {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return "I'm here! Please type an e-waste question or a device name, and I will guide you.";
  }

  // 1. Check database for specific matching e-waste items
  const items = await WasteItems.find();
  let bestItemMatch = null;
  let highestItemScore = 0;

  for (const item of items) {
    const itemName = item.name.toLowerCase();
    const itemDesc = item.description.toLowerCase();
    
    let score = 0;
    if (normalizedQuery.includes(itemName)) {
      score += 10;
    }
    // Check partial name plurals/singulars
    const singularName = itemName.endsWith("s") ? itemName.slice(0, -1) : itemName;
    if (normalizedQuery.includes(singularName) && singularName.length > 3) {
      score += 8;
    }
    
    // Check defined aliases
    const aliases = ITEM_ALIASES[item.id] || [];
    for (const alias of aliases) {
      if (normalizedQuery.includes(alias)) {
        score += 10;
        break;
      }
    }

    // Keyword match inside description
    const keywordsInQuery = normalizedQuery.split(/\s+/);
    keywordsInQuery.forEach(kw => {
      if (kw.length > 3 && itemDesc.includes(kw)) {
        score += 1;
      }
    });

    if (score > highestItemScore) {
      highestItemScore = score;
      bestItemMatch = item;
    }
  }

  // If we have a very strong device match, return dynamic item analysis
  if (highestItemScore >= 8 && bestItemMatch) {
    return `🔍 **E-Waste Identified**: **${bestItemMatch.name}**
*Category*: ${bestItemMatch.category.replace("_", " ").toUpperCase()}
*Recyclability*: **${bestItemMatch.recyclability}%**
*Toxicity Rating*: **${bestItemMatch.toxicity}**

⚠️ **Toxic Hazards**: ${bestItemMatch.hazards.join(", ")}
💎 **Precious Materials**: ${bestItemMatch.preciousMetals.join(", ")}

⚙️ **Safe Disposal Instructions**:
${bestItemMatch.disposalInstructions}

💡 **Circular Fact**:
${bestItemMatch.facts}`;
  }

  // 2. Intent-matching for FAQs
  let bestIntentMatch = null;
  let highestIntentScore = 0;

  for (const intent of FAQ_INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (normalizedQuery.includes(kw)) {
        score += kw.split(/\s+/).length * 2; // heavier weight for longer phrase matches
      }
    }
    if (score > highestIntentScore) {
      highestIntentScore = score;
      bestIntentMatch = intent;
    }
  }

  if (highestIntentScore > 0 && bestIntentMatch) {
    return bestIntentMatch.response;
  }

  // 3. Fallback answers with clever suggestions
  return "I'm not quite sure how to dispose of that specific device, but general electronics should never go in household trash! 🔋\n\nTry asking me about **'Smartphones'**, **'Laptops'**, **'Batteries'**, **'CRT Monitors'**, or check out our **E-Waste Identifier** or **Recycling Guide** tab above to find your local drop-off center!";
}
