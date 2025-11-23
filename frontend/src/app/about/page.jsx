import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Users, Award, Leaf, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Kumar Kosmetics</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe that beauty is personal. Our mission is to create premium, science-backed skincare products that
            celebrate your unique skin and empower you to feel confident.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2020, Kumar Kosmetics began with a simple vision: to revolutionize the skincare industry by
              combining traditional beauty wisdom with modern science.
            </p>
            <p className="text-muted-foreground mb-4">
              Our founder, Priya Kumar, spent years researching natural ingredients and dermatological science to create
              formulations that work for every skin type. Today, we're proud to serve thousands of customers who have
              discovered their best skin with our products.
            </p>
            <p className="text-muted-foreground">
              Every product is crafted with intention, tested rigorously, and designed to make a real difference in your
              skincare routine.
            </p>
          </div>
          <div className="bg-secondary rounded-lg h-80 flex items-center justify-center">
            <div className="text-secondary-foreground text-center">
              <Heart className="w-24 h-24 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold">Crafted with Care</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Quality */}
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Quality First</h3>
              <p className="text-sm text-muted-foreground">
                We use only the highest quality ingredients and rigorous testing to ensure product excellence.
              </p>
            </div>

            {/* Sustainability */}
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors">
              <Leaf className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Sustainability</h3>
              <p className="text-sm text-muted-foreground">
                Our packaging is eco-friendly and our practices minimize environmental impact.
              </p>
            </div>

            {/* Inclusivity */}
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Inclusivity</h3>
              <p className="text-sm text-muted-foreground">
                Beauty is for everyone. Our products are formulated for all skin types and tones.
              </p>
            </div>

            {/* Transparency */}
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors">
              <Heart className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                We believe in full ingredient disclosure and honest communication with our customers.
              </p>
            </div>
          </div>
        </div>

        {/* Team Highlight */}
        <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="mb-6 text-lg opacity-90">
            Our diverse team of skincare experts, chemists, and beauty enthusiasts are dedicated to innovation and
            customer satisfaction.
          </p>
          <button className="bg-primary-foreground text-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Join Our Team
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
          <div>
            <p className="text-4xl font-bold text-primary mb-2">50K+</p>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">200+</p>
            <p className="text-muted-foreground">Premium Products</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-2">5+</p>
            <p className="text-muted-foreground">Years of Excellence</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
