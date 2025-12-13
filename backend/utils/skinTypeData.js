const SKIN_TYPE_DATA = {
  "Oily": {
    description: "Produces excess sebum, especially in the T-zone (forehead, nose, chin).",
    insights: [
      "More prone to clogged pores and breakouts",
      "Needs lightweight, non-comedogenic products",
      "Over-cleansing can increase oil production"
    ],
    careFocus: "Oil control, gentle exfoliation, balanced hydration"
  },
  "Dry": {
    description: "Lacks natural oils, often feeling tight, rough, or flaky.",
    insights: [
      "Skin barrier may be compromised",
      "Requires nourishing and barrier-repairing care",
      "Harsh cleansers worsen dryness"
    ],
    careFocus: "Deep hydration, barrier repair, gentle cleansing"
  },
  "Combination": {
    description: "Oily in some areas (usually T-zone) and dry or normal in others.",
    insights: [
      "Requires balanced, multi-tasking products",
      "T-zone may need oil control while cheeks need hydration",
      "One-size-fits-all products may not work"
    ],
    careFocus: "Balanced formulations, targeted treatment"
  },
  "Normal": {
    description: "Well-balanced skin with minimal oiliness or dryness.",
    insights: [
      "Generally low sensitivity",
      "Maintenance is key to preserve balance",
      "Still needs sun protection and hydration"
    ],
    careFocus: "Maintenance, prevention, protection"
  },
  "Sensitive": {
    description: "Reacts easily to products, weather, or environmental factors.",
    insights: [
      "Prone to redness, irritation, or stinging",
      "Fragrance and alcohol can trigger reactions",
      "Patch testing is important"
    ],
    careFocus: "Soothing, minimal routines, barrier support"
  }
};

export default SKIN_TYPE_DATA;
