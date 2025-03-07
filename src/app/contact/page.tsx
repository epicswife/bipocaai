"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            We&apos;re here to help with any questions or feedback you may have
          </p>
        </motion.div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-background dark:text-background visionease:text-background high-contrast:text-background"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="bg-background border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                        className="bg-background border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={handleSelectChange}>
                        <SelectTrigger className="bg-background border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter message subject"
                        required
                        className="bg-background border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        required
                        className="min-h-32 bg-background border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-card border-secondary dark:border-primary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Email</h3>
                          <p className="text-muted-foreground">info@bipoca-ai.org</p>
                          <p className="text-muted-foreground">support@bipoca-ai.org</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                          <p className="text-muted-foreground">+1 (555) 123-4567</p>
                          <p className="text-muted-foreground">+1 (555) 987-6543</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Address</h3>
                          <p className="text-muted-foreground">
                            123 Education Lane<br />
                            Innovation District<br />
                            San Francisco, CA 94103
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Clock className="h-6 w-6 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 9:00 AM - 5:00 PM PST<br />
                            Saturday: 10:00 AM - 2:00 PM PST<br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground mb-6">
                      Connect With Us
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Follow us on social media to stay updated with our latest news, events, and educational resources.
                    </p>
                    <div className="flex space-x-4">
                      <Button variant="outline" className="border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary">
                        Twitter
                      </Button>
                      <Button variant="outline" className="border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary">
                        Facebook
                      </Button>
                      <Button variant="outline" className="border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary">
                        Instagram
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gray-dark dark:bg-gradient-gray-dark visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How can I sign up for BIPOCA AI?",
                answer: "You can sign up by clicking the 'Sign Up' button in the navigation bar and following the registration process. It's free to create an account!"
              },
              {
                question: "Is BIPOCA AI available for schools and districts?",
                answer: "Yes! We offer special packages for schools and districts. Please contact our team at partnerships@bipoca-ai.org for more information."
              },
              {
                question: "How does BIPOCA AI ensure content accuracy?",
                answer: "We work with educational experts and cultural consultants to ensure all content is accurate, culturally responsive, and pedagogically sound."
              },
              {
                question: "Can I use BIPOCA AI for homeschooling?",
                answer: "Absolutely! BIPOCA AI is designed to support various learning environments, including homeschooling. We offer special resources for parents."
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
