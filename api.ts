import { Router } from "express";
import DB from "./db";
import { ZodError, number } from "zod";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const product = await DB.product.findMany();
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    var _id = number().parse(id);
    const product = await DB.product.findUniqueOrThrow({
      where: {
        id: _id,
      },
    });
    res.json(product);
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: "Invalid ID" });
    } else if (error.code === "P2025") {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

export default router;
