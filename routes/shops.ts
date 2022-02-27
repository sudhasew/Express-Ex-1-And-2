import express from "express";
import { shops } from "../Shop";

const routes = express.Router();

// GET === READ.
routes.get("/api/shops/", (req, res) => {
  console.log("Shop array here", shops);
  if (req.query.minRating) {
    return res.json(
      shops.filter((shop) => shop.rating >= +req.query.minRating!)
    );
  } else {
    return res.json(shops);
  }
});

// GET === READ.
routes.get("/api/shops/:id", (req, res) => {
  console.log("get array here", shops);
  const foundShop = shops.find((shop) => shop.id === +req.params.id);
  if (foundShop) {
    return res.json(foundShop);
  } else {
    return res.status(404).json({ error: "The shop could not be found" });
  }
});

// POST === CREATE. Creating a shop.
routes.post("/api/shops/", (req: any, res) => {
  console.log("route post here", shops);
  console.log("req.body.name", req.body);
  shops.push({
    id: shops.length + 1,
    name: req.body.name,
    rating: req.body.rating,
  });
  console.log("id");
  res.send("ok");
});

// PUT === UPDATE.
routes.put("/api/shops/:id", (req, res) => {
  console.log("Putting id here", shops);
  const shop = shops.find((s) => s.id === parseInt(req.params.id));
  if (!shop) {
    return res.status(404).json({ error: "The shop could not be found" });
  }
  shop.name = req.body.name;
  shop.rating = req.body.rating;
  res.send("Updates!");
});

// DELETE
routes.delete("/api/shops/:id", (req, res) => {
  console.log("delete array here", shops);

  // Can use " + " in stead of " parseInt "
  const index = shops.findIndex((s) => s.id === +req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "The shop could not be found" });
  }
  shops.splice(index, 1);
  res.send();
});

export default routes;
