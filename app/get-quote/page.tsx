"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader } from "lucide-react" // Import the loader icon

export default function GetQuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupPoint: "",
    deliveryPoint: "",
    weight: "",
    itemCategory: "",
    additionalInfo: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false) // New state for submission
  const [loading, setLoading] = useState(false) // New state for loading spinner

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return // Prevent multiple submissions

    setIsSubmitting(true)
    setLoading(true)

    const url = process.env.NEXT_PUBLIC_API_URL || "https://fallback-url.com";

 // Replace with your deployed Apps Script URL

    const formDataObj = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value)
    })

    try {
      const response = await fetch(url, { method: "POST", body: formDataObj })
      const result = await response.text()

      if (result === "Success") {
        alert("Quote request submitted successfully!")
        setFormData({
          name: "",
          email: "",
          phone: "",
          pickupPoint: "",
          deliveryPoint: "",
          weight: "",
          itemCategory: "",
          additionalInfo: "",
        })
      } else {
        alert("Error submitting form. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Submission failed.")
    } finally {
      setLoading(false) // Hide the spinner once done
      setIsSubmitting(false) // Re-enable the button
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12 lg:px-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Request a Quote for China to India Shipping</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            name="pickupPoint"
            placeholder="Pickup Point (City, China)"
            value={formData.pickupPoint}
            onChange={handleChange}
            required
          />
          <Input
            name="deliveryPoint"
            placeholder="Delivery Point (City, India)"
            value={formData.deliveryPoint}
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="weight"
              type="number"
              placeholder="Approximate Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            <Select onValueChange={(value) => handleSelectChange("itemCategory", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Item Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="machinery">Machinery</SelectItem>
                <SelectItem value="chemicals">Chemicals</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Textarea
            name="additionalInfo"
            placeholder="Additional Information"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting} // Disable the button during submission
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader className="animate-spin h-5 w-5 text-white" />
              </div>
            ) : (
              "Submit Quote Request"
            )}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
