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

import SKIN_CONCERN_DATA from "../utils/skinConcernData.js";
import SKIN_TYPE_DATA from "../utils/skinTypeData.js";

// Helper: Generate Key Insights
const generateInsights = (profile) => {
  const insights = [];
  
  // 1. Skin Type Insights
  const typeData = SKIN_TYPE_DATA[profile.skinType];
  if (typeData && typeData.insights) {
      insights.push(...typeData.insights);
  }

  // 2. Concern Insights (Dynamic from Map)
  profile.concerns.forEach(concern => {
    const data = SKIN_CONCERN_DATA[concern];
    if (data && data.insights) {
        // Add the first 2 insights for each concern
        insights.push(...data.insights.slice(0, 2));
    }
  });

  return insights; // Frontend slices to top 3, but we return more for flexibility
};

const getSkinTypeInfo = (skinType) => {
    return SKIN_TYPE_DATA[skinType] || {};
};

// Helper: Generate Routine Structure
const generateRoutine = (profile, recommendations) => {
  const steps = [];

  // 1. Cleanser (ALWAYS)
  steps.push({ 
    name: "Cleanser", 
    category: "Cleanser", 
    description: "Gentle removal of impurities", 
    icon: "Droplets",
    frequency: "Daily"
  });

  // 2. Toner (OPTIONAL)
  if (profile.skinType === "Dry" || profile.skinType === "Sensitive") {
    steps.push({ 
      name: "Toner", 
      category: "Toner", 
      description: "Prep and balance pH", 
      icon: "Spray",
      frequency: "Optional"
    });
  }

  // 3. Serum / Treatment (CONDITIONAL)
  const activeConcerns = ["Acne", "Pigmentation", "Dark spots", "Uneven tone", "Dullness", "Fine lines", "Wrinkles", "Uneven texture"];
  const hasActiveConcern = profile.concerns.some(c => activeConcerns.includes(c));
  const skipSerum = profile.skinType === "Sensitive" && !hasActiveConcern;

  if (hasActiveConcern && !skipSerum) {
    steps.push({ 
      name: "Treatment", 
      category: "Serum", 
      description: "Target specific concerns", 
      icon: "Sparkles",
      frequency: "Daily"
    });
  }

  // 4. Moisturizer (ALWAYS)
  steps.push({ 
    name: "Moisturizer", 
    category: "Moisturizer", 
    description: "Lock in hydration", 
    icon: "Waves",
    frequency: "Daily"
  });

  // 5. Sunscreen (ALWAYS)
  steps.push({ 
    name: "Sunscreen", 
    category: "Sunscreen", 
    description: "Protect from UV damage", 
    icon: "Sun",
    frequency: "Daily"
  });

  // 6. Mask (CONDITIONAL / OCCASIONAL)
  const maskConcerns = ["Dullness", "Uneven texture"];
  const showMask = (
    maskConcerns.some(c => profile.concerns.includes(c)) || 
    profile.skinType === "Dry" || 
    profile.skinType === "Oily"
  );
  const skipMask = profile.skinType === "Sensitive" || profile.concerns.includes("Rosacea");

  if (showMask && !skipMask) {
    steps.push({ 
      name: "Mask", 
      category: "Mask", 
      description: "Weekly boost", 
      icon: "Smile", 
      frequency: "Occasional"
    });
  }

  return steps.map(step => {
    // Find a product in recommendations that matches this category
    const product = recommendations.find(p => 
        p.category && p.category.toLowerCase().includes(step.category.toLowerCase())
    );
    
    return {
      step: step.name,
      description: step.description,
      icon: step.icon,
      product: product || null, 
      genericAdvice: !product ? `Choose a ${step.name.toLowerCase()} suitable for ${profile.skinType} skin.` : null,
      frequency: step.frequency
    };
  });
};

// Helper: Generate Avoid List
const generateAvoidList = (profile) => {
  const avoid = [];
  
  if (profile.skinType === "Oily" || profile.concerns.includes("Acne")) {
    avoid.push("Heavy, pore-clogging oils (Coconut oil, Cocoa butter)");
    avoid.push("Over-washing (strips barrier, causes more oil)");
  }
  if (profile.skinType === "Dry") {
    avoid.push("Harsh foaming cleansers (SLS/SLES)");
    avoid.push("Alcohol-based toners");
  }
  if (profile.skinType === "Sensitive") {
    avoid.push("Artificial fragrances & dyes");
    avoid.push("Physical scrubs (walnut shells, apricot pits)");
    avoid.push("Strong acids (high % Glycolic)");
  }
  
  // General
  avoid.push("Sleeping with makeup on");
  
  return [...new Set(avoid)].slice(0, 4);
};

// Helper: Generate Ingredient Highlights
const generateIngredientHighlights = (profile) => {
  const highlights = [];
  const concernMap = {
    "Acne": { name: "Salicylic Acid", benefit: "Penetrates pores to dissolve oil & bacteria" },
    "Pigmentation": { name: "Vitamin C", benefit: "Inhibits melanin to brighten dark spots" },
    "Dryness": { name: "Hyaluronic Acid", benefit: "Holds 1000x its weight in water" },
    "Fine lines": { name: "Retinol", benefit: "Accelerates cell turnover & collagen" },
    "Redness": { name: "Centella Asiatica", benefit: "Instantly soothes and calms inflammation" },
    "Dullness": { name: "Glycolic Acid", benefit: "Exfoliates dead surface cells for glow" },
    "Large pores": { name: "Niacinamide", benefit: "Tightens pores and regulates oil" }
  };

  profile.concerns.forEach(concern => {
    if (concernMap[concern]) {
        highlights.push(concernMap[concern]);
    }
  });

  // Add Skin Type specific if space
  if (profile.skinType === "Dry" && !highlights.find(h => h.name === "Ceramides")) {
      highlights.push({ name: "Ceramides", benefit: "Restores the protective skin barrier" });
  }

  return [...new Set(highlights.map(JSON.stringify))].map(JSON.parse).slice(0, 4);
};

// Helper: Generate Timeline
const generateTimeline = (profile) => {
  const timeline = [];
  
  if (profile.concerns.includes("Dryness") || profile.skinType === "Dry") {
    timeline.push({ period: "Immediate", result: "Relief from tightness & flaking" });
  }
  if (profile.concerns.includes("Dullness")) {
    timeline.push({ period: "1-2 Weeks", result: "Noticeable glow & smoother texture" });
  }
  if (profile.concerns.includes("Acne") || profile.skinType === "Oily") {
    timeline.push({ period: "3-4 Weeks", result: "Reduction in active breakouts & oil" });
  }
  if (profile.concerns.includes("Pigmentation") || profile.concerns.includes("Fine lines")) {
    timeline.push({ period: "8-12 Weeks", result: "Visible fading of spots & firmer skin" });
  }
  
  return timeline.length > 0 ? timeline : [{ period: "4 Weeks", result: "Visible improvement in overall skin health" }];
};

// Helper: Ingredient Conflicts
const CONFLICTS = [
  { ingredients: ["Retinol", "Vitamin C"], reason: "May cause irritation used together" },
  { ingredients: ["Retinol", "AHAs/BHAs"], reason: "High irritation risk" },
  { ingredients: ["Retinol", "Salicylic Acid"], reason: "Excessive drying risk" },
  { ingredients: ["Vitamin C", "AHAs/BHAs"], reason: "Can destabilize Vitamin C" },
  { ingredients: ["Benzoyl Peroxide", "Retinol"], reason: "Deactivates each other" }
];

// Helper: Score products based on profile
const scoreProducts = (profile, products) => {
  return products.map((product) => {
    let score = 0;
    const reasons = [];
    
    // 1. Skin Type Match (Weight: 3)
    if (product.skinType && (product.skinType.includes(profile.skinType) || product.skinType.includes("All"))) {
      score += 3;
      // reasons.push("Matches your skin type");
    }

    // 2. Concern Match (Weight: 5)
    profile.concerns.forEach((concern) => {
      if (product.skinConcerns && product.skinConcerns.includes(concern)) {
        score += 5;
        if (!reasons.includes(`Targets ${concern}`)) reasons.push(`Targets ${concern}`);
      }
    });

    // 3. Ingredient Match (Weight: 4)
    // Check if product has ingredients that help with user's concerns
    profile.concerns.forEach((concern) => {
      const targetIngredients = INGREDIENT_MAPPING[concern] || [];
      const productActives = product.activeIngredients || [];
      
      const matchedActive = productActives.find(active => 
        targetIngredients.some(target => target.toLowerCase() === active.toLowerCase())
      );

      if (matchedActive) {
        score += 4;
        if (!reasons.includes(`Contains ${matchedActive}`)) {
            reasons.push(`Contains ${matchedActive}`);
        }
      }
    });

    // 4. Allergy Penalty (Weight: 100)
    // Filter out products with user's allergies
    const hasAllergy = profile.allergies.some(allergy => {
        // Simple check: if product ingredients or allergyLabels imply the allergy
        // Note: In real app, we'd check full ingredient list. 
        // Here we rely on allergyLabels (e.g. "Fragrance-free") vs allergy "Fragrance"
        if (allergy === "Fragrance" && !product.allergyLabels.includes("Fragrance-free")) return true;
        if (allergy === "Parabens" && !product.allergyLabels.includes("Paraben-free")) return true;
        // ... add more mapping if needed
        return false;
    });

    if (hasAllergy) {
        score -= 100;
        reasons.push("Contains potential allergen");
    }

    // 5. Conflict Penalty (Weight: 50)
    // Check against current routine
    profile.currentRoutine.forEach(routineItem => {
        const productActives = product.activeIngredients || [];
        productActives.forEach(active => {
            const conflict = CONFLICTS.find(c => 
                (c.ingredients.includes(routineItem) && c.ingredients.includes(active))
            );
            if (conflict) {
                score -= 50;
                reasons.push(`Conflict: ${active} vs ${routineItem} (${conflict.reason})`);
            }
        });
    });

    // Normalize score to percentage
    // Base score is 60, max added is roughly 30-40. 
    // We want to keep it between 60 and 98 for good matches.
    let percentage = Math.min(98, Math.max(60, 60 + score * 2));
    
    // If heavily penalized, drop the score significantly
    if (score < 0) percentage = 10; 

    return {
      ...product.toObject(),
      matchScore: Math.round(percentage),
      matchReasons: reasons,
      rawScore: score 
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

    // 4. Generate Comprehensive Analysis Data
    const insights = generateInsights(profile);
    const routine = generateRoutine(profile, recommendations);
    const avoid = generateAvoidList(profile);
    const ingredientHighlights = generateIngredientHighlights(profile);
    const timeline = generateTimeline(profile);
    const skinTypeInfo = getSkinTypeInfo(profile.skinType);

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
      recommendations,
      analysisResult: {
        insights,
        routine,
        avoid,
        ingredientHighlights,
        timeline,
        skinTypeInfo
      }
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

        // Generate comprehensive analysis data dynamically
        const scoredRecommendations = scoreProducts(profile, profile.recommendedProducts);
        
        const insights = generateInsights(profile);
        const routine = generateRoutine(profile, scoredRecommendations);
        const avoid = generateAvoidList(profile);
        const ingredientHighlights = generateIngredientHighlights(profile);
        const timeline = generateTimeline(profile);
        const skinTypeInfo = getSkinTypeInfo(profile.skinType);

        res.json({
            profile,
            recommendations: scoredRecommendations,
            analysisResult: {
                insights,
                routine,
                avoid,
                ingredientHighlights,
                timeline,
                skinTypeInfo
            }
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Error fetching profile" });
    }
};
