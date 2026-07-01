import express from "express";
import {
  WasteController,
  ChatController,
  TipController,
  ArticleController,
  DropoffController,
  ContactController,
  QuizController,
} from "../controllers/apiController";
import { adminAuthMiddleware } from "../middleware/auth";

const router = express.Router();

// 1. E-Waste Items & Identification
router.get("/waste", WasteController.getAll);
router.get("/waste/:id", WasteController.getById);
router.post("/waste/identify", WasteController.identifyUploadedFile);

// 2. Chatbot Message Process
router.post("/chat", ChatController.sendMessage);

// 3. Daily Eco Tips
router.get("/tips", TipController.getAll);
router.get("/tips/daily", TipController.getDailyTip);
router.post("/tips", adminAuthMiddleware, TipController.createTip);
router.delete("/tips/:id", adminAuthMiddleware, TipController.deleteTip);

// 4. Educational Articles
router.get("/articles", ArticleController.getAll);
router.get("/articles/:id", ArticleController.getById);
router.post("/articles", adminAuthMiddleware, ArticleController.createArticle);

// 5. Recycling Drops / Centers
router.get("/dropoffs", DropoffController.getAll);

// 6. User Feedback / Contact Form
router.post("/contact", ContactController.create);

// 7. Quiz Leaders & Submissions
router.get("/quiz/leaderboard", QuizController.getLeaderboard);
router.post("/quiz/submit", QuizController.submitResult);

// 8. Admin Reports & Message Management
router.get("/admin/contacts", adminAuthMiddleware, ContactController.getAll);
router.put("/admin/contacts/:id", adminAuthMiddleware, ContactController.updateStatus);

export default router;
