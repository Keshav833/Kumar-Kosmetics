"use client"

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Content */}
        <div className="flex-1 slide-up">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
            <span className="font-semibold">Skincare</span> that Understands You
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Discover premium cosmetics and skincare products crafted for your unique skin type. Our curated collection
            combines luxury with science.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all">
            Explore Collection
          </button>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-sm h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center overflow-hidden">
            <img
              src="/luxury-cosmetics-skincare-products-arrangement.jpg"
              alt="Premium cosmetics collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
