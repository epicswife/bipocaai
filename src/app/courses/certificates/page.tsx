"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Award, Download, Share2, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Certificate {
  id: string;
  courseTitle: string;
  completionDate: string;
  certificateUrl?: string;
  grade?: string;
  instructor: string;
  credentialId: string;
}

export default function CertificatesPage() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // In a real app, you'd fetch from your database
        // For now, using mock data
        const mockCertificates: Certificate[] = [
          {
            id: "cert-001",
            courseTitle: "Black History 101",
            completionDate: "2024-12-15",
            grade: "A",
            instructor: "Dr. Maya Johnson",
            credentialId: "BIPOCA-BH101-2024-001"
          },
          {
            id: "cert-002", 
            courseTitle: "Indigenous Cultures",
            completionDate: "2024-11-28",
            grade: "A-",
            instructor: "Prof. Sarah Whitehorse",
            credentialId: "BIPOCA-IC101-2024-002"
          }
        ];
        
        setCertificates(mockCertificates);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        toast.error("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [user]);

  const handleDownload = (certificate: Certificate) => {
    // In a real app, this would generate and download the certificate
    toast.success(`Downloading certificate for ${certificate.courseTitle}`);
  };

  const handleShare = (certificate: Certificate) => {
    // In a real app, this would share the certificate
    if (navigator.share) {
      navigator.share({
        title: `BIPOCA AI Certificate - ${certificate.courseTitle}`,
        text: `I've completed ${certificate.courseTitle} on BIPOCA AI!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`I've completed ${certificate.courseTitle} on BIPOCA AI! Credential ID: ${certificate.credentialId}`);
      toast.success("Certificate details copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your certificates</h1>
        <Link href="/auth/login">
          <Button>Log In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4 flex items-center justify-center gap-2">
          <Award className="w-8 h-8 text-[var(--color-pan-amber)]" />
          My Certificates
        </h1>
        <p className="text-lg text-muted-foreground">
          Your achievements and completed course certifications.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="text-center py-12">
          <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No certificates yet</h2>
          <p className="text-muted-foreground mb-6">Complete courses to earn certificates and showcase your achievements.</p>
          <Link href="/courses">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
              Browse Courses
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <Card
              key={certificate.id}
              className="bg-card border-[var(--color-pan-amber)] dark:border-[var(--color-pan-green)] shadow-glow hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="text-center">
                <Award className="w-12 h-12 mx-auto mb-2 text-[var(--color-pan-amber)]" />
                <CardTitle className="text-lg text-foreground">{certificate.courseTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge variant="secondary" className="bg-[var(--color-pan-green)]/20 text-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]/20 dark:text-[var(--color-pan-amber)]">
                    Grade: {certificate.grade}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Completed: {new Date(certificate.completionDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="font-medium">Instructor:</span> {certificate.instructor}
                  </div>
                  <div>
                    <span className="font-medium">Credential ID:</span>
                    <br />
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">{certificate.credentialId}</code>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    size="sm"
                    onClick={() => handleDownload(certificate)}
                    className="flex-1 bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare(certificate)}
                    className="flex-1 border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">Certificate Verification</h3>
          <p className="text-sm text-muted-foreground">
            All BIPOCA AI certificates can be verified using the credential ID. 
            Employers and institutions can verify authenticity through our verification portal.
          </p>
          <Button variant="outline" className="mt-4">
            Verify a Certificate
          </Button>
        </div>
      </div>
    </div>
  );
}
