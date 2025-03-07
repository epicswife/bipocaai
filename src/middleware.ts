import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory store for rate limiting
const rateLimit = new Map();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = {
  auth: 5, // 5 requests per minute for auth endpoints
  api: 60, // 60 requests per minute for API endpoints
  default: 100, // 100 requests per minute for other endpoints
};

export async function middleware(request: NextRequest) {
  // Get client IP
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || "127.0.0.1";
  const path = request.nextUrl.pathname;

  // Determine rate limit based on path
  let limit = MAX_REQUESTS.default;
  if (path.startsWith("/api/auth")) {
    limit = MAX_REQUESTS.auth;
  } else if (path.startsWith("/api")) {
    limit = MAX_REQUESTS.api;
  }

  // Create unique key for this IP and path type
  const key = `${ip}-${path.startsWith("/api/auth") ? "auth" : path.startsWith("/api") ? "api" : "default"}`;

  // Get existing rate limit data
  const rateLimitData = rateLimit.get(key) || {
    count: 0,
    timestamp: Date.now(),
  };

  // Reset count if window has passed
  if (Date.now() - rateLimitData.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitData.count = 0;
    rateLimitData.timestamp = Date.now();
  }

  // Increment count
  rateLimitData.count++;

  // Store updated rate limit data
  rateLimit.set(key, rateLimitData);

  // Check if rate limit exceeded
  if (rateLimitData.count > limit) {
    return new NextResponse(

      JSON.stringify({
        error: "Too many requests",
        retryAfter: Math.ceil((RATE_LIMIT_WINDOW - (Date.now() - rateLimitData.timestamp)) / 1000),
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": Math.ceil((RATE_LIMIT_WINDOW - (Date.now() - rateLimitData.timestamp)) / 1000).toString(),
        },
      }
    );
  }

  // Check for authentication on protected routes
  const publicPaths = [
    '/',
    '/login',
    '/signup',
    '/about',
    '/contact',
    '/legal',
  ];
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(`${publicPath}/`)
  );
  
  // If it's a public path or an API path, allow access without auth check
  if (isPublicPath || path.startsWith('/api')) {
    // Add security headers
    const response = NextResponse.next();
    response.headers.set("X-DNS-Prefetch-Control", "off");
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    );
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.firebase.com https://*.firebaseio.com https://*.googleapis.com;"
    );
    
    return response;
  }
  
  // For protected paths, we'll let the client-side authentication handle redirects
  // This is because Firebase auth is primarily client-side and we're using the AuthContext
  // to manage authentication state
  
  // Add security headers for authenticated routes
  const response = NextResponse.next();
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.firebase.com https://*.firebaseio.com https://*.googleapis.com;"
  );
  
  return response;
}

// Configure which paths to run middleware on
export const config = {
  matcher: [
    "/api/:path*",
    // Only apply rate limiting to API routes and public pages
    // Let client-side auth handle protected routes
    "/login",
    "/signup",
    "/about",
    "/contact",
    "/legal",
  ],
};
