import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Pan-African colors
const colors = {
  green: "#0f7c3d",
  amber: "#ffc107",
  red: "#e53935",
  black: "#1c1c1c",
  teal: "#00897b",
  white: "#ffffff"
};

export default function PanAfricanThemePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Pan-African colors */}
      <section 
        style={{
          background: `linear-gradient(135deg, ${colors.green}, ${colors.black})`,
          color: colors.white,
          padding: "4rem 1rem",
          position: "relative",
          borderTop: `4px solid ${colors.red}`,
          borderBottom: `4px solid ${colors.amber}`
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <div 
            style={{ 
              backgroundColor: `${colors.green}20`, 
              display: "inline-block",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
              color: colors.amber
            }}
          >
            Established 2024 • Trusted by 10,000+ Students Worldwide
          </div>
          
          <h1 style={{ 
            fontSize: "4rem", 
            fontWeight: "bold", 
            marginBottom: "1.5rem",
            color: colors.white
          }}>
            <span style={{ color: colors.white }}>About</span>{" "}
            <span style={{ color: colors.amber }}>BIPOCA AI</span>
          </h1>
          
          <p style={{ 
            fontSize: "1.5rem", 
            maxWidth: "800px", 
            margin: "0 auto 2.5rem",
            color: colors.white
          }}>
            Transforming education for Black, Indigenous, People of Color, and Allies through AI-powered learning
          </p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Button 
              style={{ 
                backgroundColor: colors.green, 
                color: colors.white,
                borderRadius: "9999px",
                padding: "0.75rem 1.5rem"
              }}
            >
              Our Mission <ArrowRight style={{ marginLeft: "0.5rem", height: "1rem", width: "1rem" }} />
            </Button>
            
            <Button 
              style={{ 
                backgroundColor: "transparent", 
                color: colors.red,
                borderRadius: "9999px",
                padding: "0.75rem 1.5rem",
                border: `1px solid ${colors.red}`
              }}
            >
              Watch Video
            </Button>
          </div>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "2rem", 
            marginTop: "3rem"
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: "bold", color: colors.white }}>50+</span>
              <span style={{ color: colors.white }}>Courses</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: "bold", color: colors.white }}>25+</span>
              <span style={{ color: colors.white }}>Partners</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: "bold", color: colors.white }}>10K+</span>
              <span style={{ color: colors.white }}>Students</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section style={{ padding: "4rem 1rem", backgroundColor: colors.white }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <div 
            style={{ 
              backgroundColor: `${colors.green}20`, 
              display: "inline-block",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
              color: colors.green
            }}
          >
            OUR PURPOSE
          </div>
          
          <h2 style={{ 
            fontSize: "3rem", 
            fontWeight: "bold", 
            marginBottom: "1.5rem",
            color: colors.black
          }}>
            Mission &{" "}
            <span style={{ color: colors.green }}>Values</span>
          </h2>
          
          <div style={{ 
            width: "6rem", 
            height: "0.25rem", 
            background: `linear-gradient(to right, ${colors.green}, ${colors.red})`,
            borderRadius: "9999px",
            margin: "0 auto 1.5rem"
          }}></div>
          
          <p style={{ 
            fontSize: "1.25rem", 
            maxWidth: "800px", 
            margin: "0 auto 4rem",
            color: colors.black
          }}>
            Guided by purpose, driven by innovation, committed to inclusive education for all
          </p>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "4rem",
            textAlign: "left"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                <div style={{ 
                  width: "3rem", 
                  height: "3rem", 
                  borderRadius: "0.5rem",
                  backgroundColor: `${colors.green}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1rem"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 2H5C3.89543 2 3 2.89543 3 4V18C3 19.1046 3.89543 20 5 20H7V22H17V20H19C20.1046 20 21 19.1046 21 18V4C21 2.89543 20.1046 2 19 2Z" stroke={colors.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: "1.875rem", 
                  fontWeight: "bold",
                  color: colors.black
                }}>
                  Our{" "}
                  <span style={{ color: colors.green }}>Mission</span>
                </h3>
              </div>
              <p style={{ 
                fontSize: "1.125rem", 
                lineHeight: "1.7",
                marginBottom: "2rem",
                color: colors.black
              }}>
                BIPOCA AI is on a mission to break down educational barriers for Black, Indigenous, People of Color, and Allies worldwide. We strive to create an inclusive learning environment that celebrates diverse perspectives, promotes cultural understanding, and empowers learners through accessible, AI-driven education.
              </p>
            </div>
            
            <div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                <div style={{ 
                  width: "3rem", 
                  height: "3rem", 
                  borderRadius: "0.5rem",
                  backgroundColor: `${colors.red}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1rem"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={colors.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke={colors.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke={colors.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: "1.875rem", 
                  fontWeight: "bold",
                  color: colors.black
                }}>
                  Our{" "}
                  <span style={{ color: colors.red }}>Vision</span>
                </h3>
              </div>
              <p style={{ 
                fontSize: "1.125rem", 
                lineHeight: "1.7",
                color: colors.black
              }}>
                We envision a future where education is limitless, powered by AI to provide personalized, accessible learning for every individual, regardless of location, device, or ability. Our goal is to create a world where diverse histories and perspectives are valued, and where technology bridges educational gaps rather than widening them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.green}, ${colors.black})`,
        padding: "4rem 1rem",
        position: "relative",
        borderTop: `4px solid ${colors.red}`,
        borderBottom: `4px solid ${colors.amber}`,
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "3rem", 
            fontWeight: "bold", 
            marginBottom: "1.5rem",
            color: colors.white
          }}>
            Join Our{" "}
            <span style={{ color: colors.amber }}>Mission</span>
          </h2>
          
          <p style={{ 
            fontSize: "1.5rem", 
            maxWidth: "800px", 
            margin: "0 auto 3rem",
            color: colors.white
          }}>
            Whether you&apos;re a student, educator, parent, or institution, there&apos;s a place for you in the BIPOCA AI community. Join us in transforming education for everyone.
          </p>
          
          <Link href="/contact" passHref>
            <Button 
              style={{ 
                backgroundColor: colors.amber, 
                color: colors.black,
                borderRadius: "9999px",
                padding: "0.75rem 1.5rem",
                fontWeight: "bold"
              }}
            >
              Get Started Today <ArrowRight style={{ marginLeft: "0.5rem", height: "1rem", width: "1rem" }} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
