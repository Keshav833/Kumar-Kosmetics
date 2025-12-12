import Product from "../models/product.model.js";
import SkinProfile from "../models/SkinProfile.model.js";

// Helper: Ingredient mapping for concerns
const INGREDIENT_MAPPING = {
  "Acne": ["salicylic-acid", "benzoyl-peroxide", "niacinamide", "tea-tree", "retinol"],
  "Breakouts": ["salicylic-acid", "benzoyl-peroxide", "niacinamide", "tea-tree"],
  "Blackheads": ["salicylic-acid", "glycolic-acid", "clay"],
  "Large pores": ["niacinamide", "salicylic-acid", "retinol"],
  "Pigmentation": ["vitamin-c", "niacinamide", "azelaic-acid", "glycolic-acid", "kojic-acid", "alpha-arbutin"],
  "Dark spots": ["vitamin-c", "niacinamide", "azelaic-acid", "glycolic-acid", "kojic-acid", "alpha-arbutin"],
  "Uneven tone": ["vitamin-c", "niacinamide", "aha", "glycolic-acid", "lactic-acid"],
  "Dullness": ["vitamin-c", "glycolic-acid", "lactic-acid", "aha"],
  "Uneven texture": ["glycolic-acid", "lactic-acid", "retinol", "aha", "bha"],
  "Fine lines": ["retinol", "peptides", "vitamin-c", "hyaluronic-acid", "ceramides"],
  "Wrinkles": ["retinol", "peptides", "vitamin-c", "hyaluronic-acid"],
  "Loss of firmness": ["peptides", "retinol", "vitamin-c"],
  "Dryness": ["hyaluronic-acid", "ceramides", "glycerin", "squalane", "shea-butter"],
  "Flakiness": ["ceramides", "hyaluronic-acid", "squalane", "lactic-acid"],
  "Redness": ["centella-asiatica", "allantoin", "panthenol", "niacinamide", "aloe-vera", "green-tea"],
  "Rosacea": ["azelaic-acid", "centella-asiatica", "allantoin", "panthenol"],
  "Sensitivity": ["centella-asiatica", "allantoin", "panthenol", "ceramides"],
  "Dark circles": ["caffeine", "vitamin-c", "retinol", "peptides"],
  "Puffiness": ["caffeine", "green-tea"],
};

// Helper: Tips generation based on profile
const generateTips = (profile) => {
  const tips = [];

  if (profile.skinType === "Oily") {
    tips.push({
      title: "Control Oil, Don't Strip It",
      detail: "Use a gentle foaming cleanser and a lightweight, oil-free moisturizer. Over-washing can make your skin produce more oil.",
    });
  } else if (profile.skinType === "Dry") {
    tips.push({
      title: "Layer Your Hydration",
      detail: "Start with a hydrating toner or essence, follow with a serum, and seal it all in with a rich moisturizer.",
    });
  } else if (profile.skinType === "Sensitive") {
    tips.push({
      title: "Less is More",
      detail: "Stick to a simple routine with fragrance-free products. Introduce new actives one at a time.",
    });
  }

  if (profile.concerns.includes("Acne") || profile.concerns.includes("Breakouts")) {
    tips.push({
      title: "Target Breakouts Gently",
      detail: "Use Salicylic Acid (BHA) to unclog pores. Don't pick at blemishes to avoid scarring.",
    });
  }

  if (profile.concerns.includes("Pigmentation") || profile.concerns.includes("Dark spots")) {
    tips.push({
      title: "Brighten and Protect",
      detail: "Vitamin C is your best friend for brightening. And never skip sunscreen—UV rays darken spots instantly.",
    });
  }

  if (profile.concerns.includes("Fine lines") || profile.concerns.includes("Wrinkles")) {
    tips.push({
      title: "Start Anti-Aging Early",
      detail: "Retinoids are the gold standard for anti-aging. Start slow (1-2x a week) to build tolerance.",
    });
  }

  if (profile.lifestyle.sunscreen === false) {
    tips.push({
      title: "The #1 Rule: Sunscreen",
      detail: "Sunscreen is the most effective anti-aging product. Wear it daily, even when it's cloudy.",
    });
  }

  return tips;
};

// Helper: Score products based on profile
const scoreProducts = (profile, products) => {
  return products.map((product) => {
    let score = 0;
    const reasons = [];

    // A. Match Concerns (High Weight)
    profile.concerns.forEach((concern) => {
      // Direct match in product's skinConcerns
      if (product.skinConcerns && product.skinConcerns.includes(concern)) {
        score += 5;
        if (!reasons.includes(`Targets ${concern}`)) reasons.push(`Targets ${concern}`);
      }

      // Match via Active Ingredients
      const targetIngredients = INGREDIENT_MAPPING[concern] || [];
      const productActives = product.activeIngredients || [];
      
      const hasActive = productActives.some(active => targetIngredients.includes(active.toLowerCase()));
      if (hasActive) {
          score += 4;
          // Find which active matched for the reason
          const matchedActive = productActives.find(active => targetIngredients.includes(active.toLowerCase()));
          if (matchedActive && !reasons.includes(`Contains ${matchedActive}`)) {
              reasons.push(`Contains ${matchedActive}`);
          }
      }
    });

    // B. Skin Type Bonus
    if (product.skinType && product.skinType.includes(profile.skinType)) {
      score += 3;
    }

    // C. Goal Alignment
    if (profile.goal) {
        // Simple keyword matching for goal
        const goalKeywords = profile.goal.toLowerCase().split(" ");
        const productTags = (product.tags || []).concat(product.category.toLowerCase());
        
        if (productTags.some(tag => goalKeywords.some(k => tag.includes(k)))) {
            score += 2;
        }
    }

    // D. Penalties / Exclusions
    
    // Fragrance Check (if sensitive or allergic)
    if ((profile.skinType === "Sensitive" || profile.allergies.includes("Fragrance")) && !product.allergyLabels.includes("Fragrance-free")) {
        score -= 10;
    }

    // Contraindications (Simple Example)
    if (profile.currentRoutine.includes("Retinol") && product.activeIngredients.includes("Retinol")) {
        // score -= 5; 
    }

    // Normalize score to percentage (rough approximation, max score ~30-40)
    // Let's cap it at 98% for realism, and ensure it's at least 60% if it's a match
    let percentage = Math.min(98, Math.max(60, 60 + score * 2));

    return {
      ...product.toObject(),
      matchScore: Math.round(percentage),
      matchReasons: reasons,
      rawScore: score // Keep raw score for sorting
    };
  });
};

export const evaluateProfile = async (req, res) => {
  try {
    const { answers, userId } = req.body;
    
    // Construct Profile Object
    const profile = {
      skinType: answers.skinType,
      concerns: answers.concerns || [],
      allergies: answers.allergies || [],
      lifestyle: {
        sleep: answers.sleep,
        outdoors: answers.outdoors,
        sunscreen: answers.sunscreen,
      },
      currentRoutine: answers.currentRoutine || [],
      history: {
        reactions: answers.reactions,
        medications: answers.medications,
      },
      goal: answers.goal,
    };

    // 1. Fetch Candidate Products
    const candidates = await Product.find({
      $and: [
        { 
            $or: [
                { skinType: { $in: [profile.skinType, "All"] } },
                { skinType: { $size: 0 } }
            ]
        },
        { allergyLabels: { $nin: profile.allergies } },
      ],
    });

    // 2. Score Products
    const scoredProducts = scoreProducts(profile, candidates);

    // 3. Sort and Filter
    const recommendations = scoredProducts
      .filter((p) => p.rawScore > 0) // Only positive matches
      .sort((a, b) => b.rawScore - a.rawScore)
      .slice(0, 6); // Top 6

    // 4. Generate Tips
    const tips = generateTips(profile);

    // 5. Save Profile if User is Logged In
    if (userId) {
        const recommendedProductIds = recommendations.map(p => p._id);
        
        await SkinProfile.findOneAndUpdate(
            { userId },
            { 
              ...profile,
              recommendedProducts: recommendedProductIds
            },
            { upsert: true, new: true }
        );
    }

    res.json({
      profile,
      tips,
      recommendations,
    });

  } catch (error) {
    console.error("Error in evaluateProfile:", error);
    res.status(500).json({ message: "Server error during evaluation", error: error.message });
  }
};

export const saveProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const profileData = req.body;

        const profile = await SkinProfile.findOneAndUpdate(
            { userId },
            { ...profileData, userId },
            { upsert: true, new: true }
        );

        res.json(profile);
    } catch (error) {
        console.error("Error saving profile:", error);
        res.status(500).json({ message: "Error saving profile" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const profile = await SkinProfile.findOne({ userId }).populate("recommendedProducts");
        
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Generate tips dynamically
        const tips = generateTips(profile);

        // Re-calculate scores for display
        // We need to pass the populated products to the scoring function
        // Note: scoreProducts expects Mongoose documents or objects. 
        // populate returns documents, so we should be good.
        // However, scoreProducts calls .toObject(), so we need to make sure we don't double call it if they are already objects.
        // Actually, populate returns documents. scoreProducts calls .toObject().
        
        const scoredRecommendations = scoreProducts(profile, profile.recommendedProducts);

        res.json({
            profile,
            tips,
            recommendations: scoredRecommendations
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Error fetching profile" });
    }
};
