"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Loader } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);

    const url = process.env.NEXT_PUBLIC_API_URL || "https://fallback-url.com"; // Replace with Apps Script URL

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    formDataObj.append("formType", "contact"); // Important: Identify this as a Contact Us form

    try {
      const response = await fetch(url, { method: "POST", body: formDataObj });
      const result = await response.text();

      if (result === "Success") {
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />

      <div className="container relative z-10 px-4 mx-auto lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600">Have questions? Our team is here to help.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="bg-gray-50" />
                  <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="bg-gray-50" />
                </div>
                <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="bg-gray-50" />
                <Input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="bg-gray-50" />
                <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required className="h-32 bg-gray-50" />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  {isSubmitting ? <Loader className="animate-spin h-5 w-5 text-white" /> : "Send Message"}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-blue-100 rounded-full"><Mail className="w-6 h-6 text-blue-600" /></div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                <p className="text-gray-600">safeshippinglogistics54@gmail.com</p>
                <p className="text-gray-600">support@safeshiplogistics.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-4 bg-blue-100 rounded-full"><Phone className="w-6 h-6 text-blue-600" /></div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                <p className="text-gray-600">+91 80008-00046</p>
                <p className="text-gray-600">+91 99107-17572</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-4 bg-blue-100 rounded-full"><MapPin className="w-6 h-6 text-blue-600" /></div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                <p className="text-gray-600">A2/105 Paschim Vihar, New Delhi - 110063, India.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}