import express from "express";
import cors from "cors";

//For Handlebars
import path from "path";
import shopsRoutes from "./routes/shops";
import { shops } from "./Shop";

const app = express();
const port = 3005;

//For Handlebars
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cors());

//For all defined Routes
app.use("/", shopsRoutes);

app.get("/", (req, res) => {
  res.render("homePage");
});

app.get("/shop-list", (req, res) => {
  const shopMinRating = shops.filter(
    (shop) => shop.rating >= +req.query.minRating!
  );
  if (req.query.minRating) {
    return res.json(shopMinRating);
  } else {
    return res.render("webPage", { shops: shops });
  }
});

app.get("/ShopSearchForm", (req, res) => {
  res.render("ShopSearchForm");
});

app.get("/webPage", (req, res) => {
  res.render("webPage");
});

app.get("/back-to-homepage", (req, res) => {
  res.render("homePage");
});

app.get("/shop-details/:id", (req, res) => {
  const shop = shops.find((shop) => shop.id === +req.params.id);
  if (shop) {
    res.render("webPageShop", { shop: shop });
  } else {
    return res.render("webPageShopNotFound", { id: req.params.id });
  }
});

app.get("/See-all-shops/", (req, res) => {
  res.render("webPage", { shops: shops });
});

app.get("/:id", (req, res) => {
  const shop = shops.find((s) => s.id === +req.params.id);
  if (!shop) {
    return res.status(404).render("not found");
  }
  res.render("shops", shop);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
