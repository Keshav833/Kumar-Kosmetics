"use client"

export default function BrandStory() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="order-2 md:order-1">
          <div className="relative h-96 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl overflow-hidden">
            <img
              src="/luxury-cosmetics-brand-story-founder-wellness.jpg"
              alt="Kumar Kosmetics brand story"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="order-1 md:order-2 slide-up">
          <h2 className="text-3xl font-light text-foreground mb-6">
            Our <span className="font-semibold">Story</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Founded with a simple belief that skincare should be personal, effective, and luxurious. Kumar Kosmetics was
            born from a passion to bridge the gap between beauty and science.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Every product is carefully formulated with premium ingredients, cruelty-free practices, and backed by
            dermatological research. We believe beauty comes from within, and great skincare should make you feel
            confident and radiant.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  )
}
