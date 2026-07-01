import { Request, Response, NextFunction } from "express";
import { WasteItems, EcoTips, Articles, DropoffPoints, Contacts, QuizResults } from "../models";
import { processChatQuery } from "../utils/knowledgeBase";

// 1. Waste Items / Identification Controller
export const WasteController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await WasteItems.find();
      res.json(items);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await WasteItems.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "E-waste item not found in our database" });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  // Mock Camera / File-upload E-Waste Identifier
  identifyUploadedFile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileName, fileSize, fileType } = req.body;
      if (!fileName) {
        return res.status(400).json({ error: "No file details provided" });
      }

      const nameLower = fileName.toLowerCase();
      let matchedId = "smartphones"; // default backup fallback

      if (nameLower.includes("phone") || nameLower.includes("mobile") || nameLower.includes("iphone") || nameLower.includes("android")) {
        matchedId = "smartphones";
      } else if (nameLower.includes("laptop") || nameLower.includes("notebook") || nameLower.includes("macbook")) {
        matchedId = "laptops";
      } else if (nameLower.includes("monitor") || nameLower.includes("tv") || nameLower.includes("crt") || nameLower.includes("television")) {
        matchedId = "crt-monitors";
      } else if (nameLower.includes("battery") || nameLower.includes("cell") || nameLower.includes("powerbank")) {
        matchedId = "li-ion-batteries";
      } else if (nameLower.includes("cable") || nameLower.includes("wire") || nameLower.includes("charger") || nameLower.includes("adapter")) {
        matchedId = "chargers-cables";
      } else if (nameLower.includes("printer") || nameLower.includes("scanner") || nameLower.includes("xerox")) {
        matchedId = "printers";
      } else {
        // Randomly pick an item from database to simulate AI matching
        const items = await WasteItems.find();
        const randIndex = Math.floor(Math.random() * items.length);
        matchedId = items[randIndex].id;
      }

      const matchedItem = await WasteItems.findById(matchedId);
      if (!matchedItem) {
        return res.status(404).json({ error: "Failed to classify file e-waste type" });
      }

      // Simulate a confidence rating
      const confidence = Number((85 + Math.random() * 14).toFixed(1));

      res.json({
        success: true,
        detectedType: matchedItem.name,
        confidence,
        item: matchedItem,
        analysisMetadata: {
          scannedFile: fileName,
          sizeKb: Math.round((fileSize || 500000) / 1024),
          mimeType: fileType || "image/jpeg",
          scannedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

// 2. Chatbot Controller
export const ChatController = {
  sendMessage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message content is required" });
      }

      const botReply = await processChatQuery(message);
      res.json({
        reply: botReply,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }
};

// 3. Tips Controller
export const TipController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tips = await EcoTips.find();
      res.json(tips);
    } catch (error) {
      next(error);
    }
  },

  getDailyTip: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dailyTips = await EcoTips.find({ isDaily: true });
      if (dailyTips.length > 0) {
        return res.json(dailyTips[0]);
      }
      const allTips = await EcoTips.find();
      res.json(allTips[0] || { title: "Eco-Habit", content: "Unplug fully loaded electronic bricks to stop phantom current draw.", category: "reduction" });
    } catch (error) {
      next(error);
    }
  },

  createTip: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content, category, isDaily } = req.body;
      if (!title || !content || !category) {
        return res.status(400).json({ error: "Title, content, and category are required" });
      }

      // If making it daily tip, unset previous daily tip
      if (isDaily) {
        const oldDaily = await EcoTips.find({ isDaily: true });
        for (const tip of oldDaily) {
          await EcoTips.findByIdAndUpdate(tip.id, { isDaily: false });
        }
      }

      const newTip = await EcoTips.create({ title, content, category, isDaily: !!isDaily });
      res.status(201).json(newTip);
    } catch (error) {
      next(error);
    }
  },

  deleteTip: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const success = await EcoTips.findByIdAndDelete(req.params.id);
      if (!success) return res.status(404).json({ error: "Tip not found" });
      res.json({ success: true, message: "Eco-tip deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
};

// 4. Articles Controller
export const ArticleController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await Articles.find();
      res.json(articles);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await Articles.findById(req.params.id);
      if (!article) return res.status(404).json({ error: "Article not found" });
      res.json(article);
    } catch (error) {
      next(error);
    }
  },

  createArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, excerpt, content, category, author, readTime, imageUrl } = req.body;
      if (!title || !content || !category || !author || !readTime) {
        return res.status(400).json({ error: "Title, content, category, author, and readTime are required" });
      }
      const newArticle = await Articles.create({
        title, excerpt, content, category, author, readTime,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
      });
      res.status(201).json(newArticle);
    } catch (error) {
      next(error);
    }
  }
};

// 5. Recycling Centers / DropoffPoints Controller
export const DropoffController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const points = await DropoffPoints.find();
      res.json(points);
    } catch (error) {
      next(error);
    }
  }
};

// 6. Contact messages Controller
export const ContactController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All contact fields are required" });
      }
      const newMessage = await Contacts.create({
        name,
        email,
        subject,
        message,
        status: "unread"
      });
      res.status(201).json({ success: true, message: "Thank you! Your report or contact message has been recorded.", data: newMessage });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await Contacts.find();
      res.json(list);
    } catch (error) {
      next(error);
    }
  },

  updateStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.body;
      if (!["unread", "read", "replied"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }
      const updated = await Contacts.findByIdAndUpdate(req.params.id, { status });
      if (!updated) return res.status(404).json({ error: "Message not found" });
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
};

// 7. Quiz Results Controller
export const QuizController = {
  getLeaderboard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await QuizResults.find();
      // Sort descending by score, limit to top 15
      const sorted = list.sort((a, b) => b.score - a.score).slice(0, 15);
      res.json(sorted);
    } catch (error) {
      next(error);
    }
  },

  submitResult: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nickname, score, totalQuestions } = req.body;
      if (!nickname || score === undefined || !totalQuestions) {
        return res.status(400).json({ error: "Nickname, score, and totalQuestions are required" });
      }

      // Compute badge level
      const pct = score / totalQuestions;
      let level: "Eco-Novice" | "E-Waste Learner" | "Green Champion" = "Eco-Novice";
      if (pct >= 0.8) {
        level = "Green Champion";
      } else if (pct >= 0.5) {
        level = "E-Waste Learner";
      }

      const newRecord = await QuizResults.create({
        nickname: nickname.trim(),
        score,
        totalQuestions,
        level
      });

      res.status(201).json(newRecord);
    } catch (error) {
      next(error);
    }
  }
};
