const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await getDb().collection("recipes").find().toArray();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await getDb()
      .collection("recipes")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await getDb().collection("recipes").insertOne(req.body);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await getDb()
      .collection("recipes")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

    if (!result.matchedCount) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ updated: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await getDb()
      .collection("recipes")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (!result.deletedCount) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ deleted: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;