"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { HeartPulse, ArrowLeft, ShieldCheck } from "lucide-react";

type UrgencyLevel = "low" | "medium" | "high" | "emergency";
type SupportType = "counseling" | "resources" | "crisis" | "information";

export default function MentalHealthRequestPage() {
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [urgency, setUrgency] = useState<UrgencyLevel>("low");
  const [supportType, setSupportType] = useState<SupportType>("counseling");
  const [description, setDescription] = useState("");
  const [preferredContact, setPreferredContact] = useState("email");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || (!anonymous && (!name || !contactEmail))) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (preferredContact === "phone" && !phoneNumber) {
      toast.error("Please provide a phone number for phone contact");
      return;
    }
    
    try {
      setLoading(true);
      
      // Get current user if logged in
      const currentUser = auth.currentUser;
      
      // Create the request document
      await addDoc(collection(db, "mentalHealthRequests"), {
        name: anonymous ? "Anonymous" : name,
        contactEmail: anonymous ? null : contactEmail,
        phoneNumber: anonymous ? null : phoneNumber,
        urgency,
        supportType,
        description,
        preferredContact: anonymous ? null : preferredContact,
        anonymous,
        status: "pending",
        createdAt: serverTimestamp(),
        userId: currentUser?.uid || null,
        userRole: currentUser?.displayName ? "student" : null, // This should be fetched from user document in a real app
      });
      
      setSubmitted(true);
      toast.success("Your request has been submitted");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit request";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 dark:bg-secondary/20 flex items-center justify-center mb-4">
              <HeartPulse className="h-10 w-10 text-primary dark:text-secondary" />
            </div>
            <CardTitle className="text-3xl font-orbitron font-bold text-foreground">
              Mental Health Support
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {submitted 
                ? "Your request has been received" 
                : "Request support from our mental health professionals"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {submitted ? (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <ShieldCheck className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Thank You for Reaching Out</h3>
                  <p className="text-muted-foreground">
                    {anonymous 
                      ? "Your anonymous request has been submitted. A counselor will review it shortly."
                      : "Your request has been submitted. A counselor will contact you soon via your preferred method."}
                  </p>
                  
                  {urgency === "emergency" && (
                    <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-800 dark:text-red-200">
                      <p className="font-semibold">If this is a life-threatening emergency, please call 911 or your local emergency number immediately.</p>
                      <p className="mt-2">National Suicide Prevention Lifeline: 988 or 1-800-273-8255</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button
                    onClick={() => router.push("/mental-health/resources")}
                    className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground"
                  >
                    View Resources
                  </Button>
                  
                  <Button
                    onClick={() => router.push("/dashboard")}
                    variant="outline"
                    className="border-primary dark:border-secondary text-foreground"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="anonymous" 
                      checked={anonymous} 
                      onCheckedChange={(checked) => setAnonymous(checked === true)}
                    />
                    <Label htmlFor="anonymous" className="text-foreground">Submit anonymously</Label>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {anonymous 
                      ? "Your request will be anonymous. We won't be able to contact you directly, but you can check resources or submit another request later."
                      : "Providing your contact information allows our counselors to reach out to you directly."}
                  </p>
                </div>
                
                {!anonymous && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Your Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="bg-background text-foreground border-border"
                        required={!anonymous}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-foreground">Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="bg-background text-foreground border-border"
                        required={!anonymous}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferredContact" className="text-foreground">Preferred Contact Method</Label>
                      <RadioGroup 
                        value={preferredContact} 
                        onValueChange={setPreferredContact}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="contact-email" />
                          <Label htmlFor="contact-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="contact-phone" />
                          <Label htmlFor="contact-phone">Phone</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {preferredContact === "phone" && (
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-foreground">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="(123) 456-7890"
                          className="bg-background text-foreground border-border"
                          required={preferredContact === "phone" && !anonymous}
                        />
                      </div>
                    )}
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="urgency" className="text-foreground">Urgency Level</Label>
                  <Select
                    value={urgency}
                    onValueChange={(value) => setUrgency(value as UrgencyLevel)}
                  >
                    <SelectTrigger className="bg-background text-foreground border-border">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - I&apos;d like to talk when someone is available</SelectItem>
                      <SelectItem value="medium">Medium - I&apos;m struggling but can wait</SelectItem>
                      <SelectItem value="high">High - I need help soon</SelectItem>
                      <SelectItem value="emergency">Emergency - I need immediate assistance</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {urgency === "emergency" && (
                    <div className="mt-2 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-800 dark:text-red-200">
                      <p className="font-semibold">If this is a life-threatening emergency, please call 911 or your local emergency number immediately.</p>
                      <p className="mt-2">National Suicide Prevention Lifeline: 988 or 1-800-273-8255</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportType" className="text-foreground">Type of Support Needed</Label>
                  <Select
                    value={supportType}
                    onValueChange={(value) => setSupportType(value as SupportType)}
                  >
                    <SelectTrigger className="bg-background text-foreground border-border">
                      <SelectValue placeholder="Select support type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="counseling">Personal Counseling</SelectItem>
                      <SelectItem value="resources">Mental Health Resources</SelectItem>
                      <SelectItem value="crisis">Crisis Support</SelectItem>
                      <SelectItem value="information">General Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Describe what you&apos;re experiencing
                    <span className="text-primary dark:text-secondary"> *</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please share what you're going through and how we can help..."
                    className="bg-background text-foreground border-border min-h-[120px]"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <HeartPulse className="mr-2 h-5 w-5" />
                      <span>Submit Request</span>
                    </div>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <Link 
                href="/mental-health" 
                className="text-primary hover:text-secondary dark:text-secondary dark:hover:text-primary transition-colors font-semibold flex items-center justify-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Mental Health Support
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

// Add Link import at the top
import Link from "next/link";
