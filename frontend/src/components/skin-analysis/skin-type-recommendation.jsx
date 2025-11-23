import { Link } from "react-router-dom"

export default function SkinTypeRecommendation() {
  const skinTypes = [
    { name: "Oily", color: "bg-primary/20", icon: "🌊" },
    { name: "Dry", color: "bg-secondary/20", icon: "☀️" },
    { name: "Combination", color: "bg-accent/20", icon: "⚖️" },
    { name: "Sensitive", color: "bg-primary/10", icon: "🍃" },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-foreground mb-3">
          Find Your <span className="font-semibold">Perfect Match</span>
        </h2>
        <p className="text-muted-foreground">Select your skin type to get personalized product recommendations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skinTypes.map((type) => (
          <Link key={type.name} to={`/skin-analyzer?type=${type.name.toLowerCase()}`}>
            <div
              className={`${type.color} rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-4xl mb-3">{type.icon}</div>
              <h3 className="text-lg font-medium text-foreground">{type.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">Skin Type</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/skin-analyzer" className="inline-block text-primary font-medium hover:underline">
          Take Full Skin Assessment →
        </Link>
      </div>
    </section>
  )
}
