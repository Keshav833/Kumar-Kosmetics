import { useState, useEffect } from "react"
import { Star, User, CheckCircle } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast"

export default function ProductReviews({ productId, productRating, totalReviews, onReviewAdded }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [skinType, setSkinType] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { authUser, openAuthModal } = useAuthStore()

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(`/reviews/${productId}`)
      setReviews(res.data)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!authUser) {
      openAuthModal({ type: "review" })
      return
    }

    setSubmitting(true)
    try {
      const res = await axiosInstance.post(`/reviews/${productId}`, {
        rating,
        comment,
        skinType
      })
      setReviews([res.data, ...reviews])
      setComment("")
      setRating(5)
      if (onReviewAdded) onReviewAdded()
      toast.success("Review submitted successfully!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review")
    } finally {
      setSubmitting(false)
    }
  }

  // Calculate rating breakdown
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach(r => ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1)
  
  const total = reviews.length || 1 // Avoid division by zero
  
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Summary & Breakdown Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-gray-50/50 p-8 rounded-2xl border border-gray-100">
        {/* Overall Rating */}
        <div className="lg:col-span-4 text-center lg:text-left lg:border-r lg:border-gray-200 lg:pr-8">
          <h3 className="text-lg font-medium text-foreground mb-4">Customer Reviews</h3>
          <div className="flex items-baseline gap-4 justify-center lg:justify-start mb-2">
            <span className="text-6xl font-bold text-foreground tracking-tight">{productRating?.toFixed(1) || "0.0"}</span>
            <div className="flex flex-col items-start">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(productRating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{totalReviews || 0} Verified Reviews</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Based on genuine feedback from our customers.
          </p>
        </div>

        {/* Rating Bars */}
        <div className="lg:col-span-8 space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-4 group">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm font-semibold text-foreground">{star}</span>
                <Star className="w-3 h-3 text-gray-400" />
              </div>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out group-hover:bg-yellow-500"
                  style={{ width: `${(ratingCounts[star] / total) * 100}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-10 text-right tabular-nums">{ratingCounts[star]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Write Review Form - Sticky on Desktop */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <h3 className="text-lg font-semibold mb-1">Write a Review</h3>
            <p className="text-sm text-muted-foreground mb-6">Share your thoughts with the community</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-all hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Skin Type</label>
                <select 
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className="w-full rounded-lg border-gray-200 bg-gray-50/50 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 transition-colors hover:bg-white"
                >
                  <option value="">Select your skin type</option>
                  <option value="Oily">Oily</option>
                  <option value="Dry">Dry</option>
                  <option value="Combination">Combination</option>
                  <option value="Sensitive">Sensitive</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Your Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                  placeholder="What did you like or dislike? How was the texture?"
                  className="w-full rounded-lg border-gray-200 bg-gray-50/50 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 transition-colors hover:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-foreground">Latest Reviews</h3>
            <div className="text-sm text-muted-foreground">
              Showing {reviews.length} reviews
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">No reviews yet</h4>
              <p className="text-muted-foreground">Be the first to share your experience with this product!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        {review.user?.name?.charAt(0).toUpperCase() || "A"}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{review.user?.name || "Anonymous"}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          {review.skinType && (
                            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 font-medium">
                              {review.skinType} Skin
                            </span>
                          )}
                          <span>•</span>
                          <span>{new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    {review.isVerifiedPurchase && (
                      <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified Purchase
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
