"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, Building, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["hello@bipoca-ai.org", "support@bipoca-ai.org"],
      description: "General inquiries and support"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567"],
      description: "Monday - Friday, 9 AM - 6 PM EST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["123 Education Way", "San Francisco, CA 94105"],
      description: "Headquarters"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Support Hours",
      details: ["24/7 Online Support", "Live Chat Available"],
      description: "We're here to help anytime"
    }
  ];

  const departments = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "General Inquiries",
      email: "hello@bipoca-ai.org",
      description: "Questions about our platform and services"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Partnerships",
      email: "partnerships@bipoca-ai.org",
      description: "Collaboration and partnership opportunities"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Enterprise Sales",
      email: "enterprise@bipoca-ai.org",
      description: "School districts and institutional sales"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Support",
      email: "support@bipoca-ai.org",
      description: "Technical support and customer service"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // In a real app, you'd send this to your backend
      console.log("Form submitted:", formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
        inquiryType: ""
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-pan-green)]/10 to-[var(--color-pan-amber)]/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-orbitron font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about BIPOCA AI? We'd love to hear from you. Reach out to our team for support, partnerships, or general inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Send us a message</CardTitle>
                  <p className="text-muted-foreground">Fill out the form below and we'll get back to you as soon as possible.</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
                        placeholder="School, district, or organization"
                      />
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="enterprise">Enterprise Sales</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="press">Press/Media</SelectItem>
                          <SelectItem value="careers">Careers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief subject line"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-6">Get in Touch</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={info.title} className="bg-card border-[var(--color-pan-amber)]/20 dark:border-[var(--color-pan-green)]/20 shadow-glow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mt-1">
                            {info.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-muted-foreground text-sm">{detail}</p>
                            ))}
                            <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Department Contacts</h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <Card key={dept.title} className="bg-card border-[var(--color-pan-green)]/20 dark:border-[var(--color-pan-amber)]/20 shadow-glow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] mt-1">
                            {dept.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{dept.title}</h4>
                            <p className="text-sm text-muted-foreground mb-1">{dept.description}</p>
                            <a href={`mailto:${dept.email}`} className="text-sm text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] hover:underline">
                              {dept.email}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Looking for quick answers? Check out our comprehensive FAQ section for common questions about BIPOCA AI.
            </p>
            <Button variant="outline" className="border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
              View FAQ
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
