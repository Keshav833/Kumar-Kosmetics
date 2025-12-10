"use client"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Skincare Enthusiast",
      image: "/professional-woman-portrait.png",
      content:
        "Kumar Kosmetics changed my skin routine completely. The products are luxurious and truly effective. Highly recommended!",
    },
    {
      name: "Aisha Patel",
      role: "Beauty Blogger",
      image: "/professional-woman-headshot.png",
      content:
        "I have sensitive skin and was hesitant about trying new brands. Kumar Kosmetics was a game-changer for me.",
    },
    {
      name: "Neha Gupta",
      role: "Makeup Artist",
      image: "/woman-makeup-artist-portrait.jpg",
      content:
        "The quality is unmatched. My clients absolutely love using these products as their base. Worth every penny!",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center  mb-12">
        <h2 className="text-5xl font-light text-foreground mb-3">
          Loved by <span className="font-semibold">Thousands</span>
        </h2>
        <p className="text-muted-foreground">Real testimonials from our happy customers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-gray-200 rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
            <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>

            <div className="flex items-center gap-3">
              <img
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
