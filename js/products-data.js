/* =========================================================================
   TapReview – Produktdaten als eingebettetes JS
   Damit funktioniert die Website auch per Doppelklick (file://), ohne Server.
   Dieselben Daten liegen zusätzlich in data/products.json (für das Stripe-Backend).
   image  = Frontbild (für Übersicht/Karte)
   images = [Front, Side/Back] für die Galerie auf der Produktseite
   ========================================================================= */
window.TR_PRODUCTS = {
  "currency": "CHF",
  "products": [
    {
      "id": "plexi-weiss",
      "category": "shield",
      "name": "ReviewShield Weiss",
      "tagline": "Klar und clean – der Blickfang für jeden Tresen.",
      "badge": "Bestseller",
      "price": 42.00,
      "bundles": [
        { "qty": 1, "price": 42 },
        { "qty": 2, "price": 75 },
        { "qty": 5, "price": 160 },
        { "qty": 10, "price": 290 }
      ],
      "image": "assets/products/plexi-weiss-front.jpg",
      "images": ["assets/products/plexi-weiss-front.jpg", "assets/products/plexi-weiss-side.jpg"],
      "reviews": 214,
      "short": "Eleganter Aufsteller in Weiss mit «review us on Google» und integriertem NFC-Chip. Ein Tap öffnet sofort deine Bewertungsseite.",
      "stripePriceId": "price_REPLACE_plexi_weiss",
      "highlights": [
        "Hochwertige Verarbeitung, weiss",
        "Integrierter NFC-Chip",
        "Google-Bewertung mit einem Tap",
        "Standfuss für Tresen & Tisch"
      ],
      "specs": {
        "Ausführung": "Weiss",
        "Funktion": "NFC (Tap)",
        "Reichweite": "bis 2 cm",
        "Kompatibel": "iPhone (ab XR) & Android mit NFC",
        "Lieferung": "2–4 Werktage (CH)"
      }
    },
    {
      "id": "plexi-schwarz",
      "category": "shield",
      "name": "ReviewShield Schwarz",
      "tagline": "Edles Schwarz, das sofort auffällt.",
      "badge": "Premium",
      "price": 42.00,
      "bundles": [
        { "qty": 1, "price": 42 },
        { "qty": 2, "price": 75 },
        { "qty": 5, "price": 160 },
        { "qty": 10, "price": 290 }
      ],
      "image": "assets/products/plexi-schwarz-front.jpg",
      "images": ["assets/products/plexi-schwarz-front.jpg", "assets/products/plexi-schwarz-side.jpg"],
      "reviews": 176,
      "short": "Der gleiche starke Aufsteller in elegantem Schwarz – ein Blickfang auf Empfang, Bar oder Tisch. NFC, sofort einsatzbereit.",
      "stripePriceId": "price_REPLACE_plexi_schwarz",
      "highlights": [
        "Hochwertige Verarbeitung, schwarz",
        "Integrierter NFC-Chip",
        "Google-Bewertung mit einem Tap",
        "Standfuss für Tresen & Tisch"
      ],
      "specs": {
        "Ausführung": "Schwarz",
        "Funktion": "NFC (Tap)",
        "Reichweite": "bis 2 cm",
        "Kompatibel": "iPhone (ab XR) & Android mit NFC",
        "Lieferung": "2–4 Werktage (CH)"
      }
    },
    {
      "id": "bamboo",
      "category": "shield",
      "name": "Bambus ReviewShield",
      "tagline": "Nachhaltig, warm und hochwertig.",
      "badge": "Nachhaltig",
      "price": 42.00,
      "bundles": [
        { "qty": 1, "price": 42 },
        { "qty": 2, "price": 75 },
        { "qty": 5, "price": 160 },
        { "qty": 10, "price": 290 }
      ],
      "image": "assets/products/bamboo-front.jpg",
      "images": ["assets/products/bamboo-front.jpg", "assets/products/bamboo-side.jpg"],
      "reviews": 132,
      "short": "Aufsteller aus echtem Bambusholz mit gravierter «review us on Google»-Front und integriertem NFC-Chip. Warm, wertig und nachhaltig.",
      "stripePriceId": "price_REPLACE_bamboo",
      "highlights": [
        "Echtes Bambusholz",
        "Integrierter NFC-Chip",
        "Nachhaltig & wertig",
        "Standfuss inklusive"
      ],
      "specs": {
        "Material": "Bambusholz",
        "Funktion": "NFC (Tap)",
        "Reichweite": "bis 2 cm",
        "Kompatibel": "iPhone (ab XR) & Android mit NFC",
        "Lieferung": "2–4 Werktage (CH)"
      }
    },
    {
      "id": "sticker",
      "category": "sticker",
      "name": "Sticker ReviewShield Schwarz",
      "tagline": "Aufkleben, antippen, bewerten.",
      "badge": "Kompakt",
      "price": 42.00,
      "bundles": [
        { "qty": 1, "price": 42 },
        { "qty": 2, "price": 75 },
        { "qty": 5, "price": 160 },
        { "qty": 10, "price": 290 }
      ],
      "image": "assets/products/sticker-front.jpg",
      "images": ["assets/products/sticker-front.jpg", "assets/products/sticker-back.jpg"],
      "reviews": 98,
      "short": "Selbstklebender NFC-Sticker in Schwarz mit «review us on Google». Perfekt für Theke, Tür oder Speisekarte – ein Tap führt direkt zur Bewertung.",
      "stripePriceId": "price_REPLACE_sticker",
      "highlights": [
        "Selbstklebender NFC-Sticker",
        "Integrierter NFC-Chip",
        "Für Theke, Tür oder Speisekarte",
        "Wisch- & wasserfest"
      ],
      "specs": {
        "Material": "PET-Folie, schwarz",
        "Funktion": "NFC (Tap)",
        "Reichweite": "bis 2 cm",
        "Kompatibel": "iPhone (ab XR) & Android mit NFC",
        "Lieferung": "2–4 Werktage (CH)"
      }
    }
  ]
};
