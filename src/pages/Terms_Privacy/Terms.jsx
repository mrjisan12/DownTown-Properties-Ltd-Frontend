// Terms.tsx
import React from 'react';
import { CheckCircle, Home, Shield, FileText, Building, Landmark } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-secondary/10 to-primary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Quick Navigation */}
            <div className="md:col-span-1">
              <div className="sticky top-8 bg-card border border-border rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
                  <Landmark className="h-5 w-5" />
                  Table of Contents
                </h3>
                <nav className="space-y-3">
                  {['agreement', 'property-listings', 'transactions', 'intellectual-property', 'liability', 'termination'].map((section) => (
                    <a
                      key={section}
                      href={`#${section}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/50 last:border-0"
                    >
                      {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Introduction */}
              <section className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Home className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Welcome to Our Platform</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  These Terms of Service govern your use of our real estate and land selling services. 
                  By accessing our platform, you agree to be bound by these terms.
                </p>
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-sm text-foreground">
                      <strong>Important:</strong> Please read these terms carefully before using our services. 
                      These terms affect your legal rights and obligations.
                    </p>
                  </div>
                </div>
              </section>

              {/* Agreement Section */}
              <section id="agreement" className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Shield className="h-7 w-7 text-secondary" />
                  1. Agreement to Terms
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    By accessing or using our real estate platform, you confirm that you're at least 18 years old 
                    and agree to be bound by these Terms. If you're using our services on behalf of an organization, 
                    you represent that you have the authority to bind that organization.
                  </p>
                  <p>
                    Our services are designed specifically for real estate transactions, including but not limited 
                    to residential properties, commercial properties, vacant land, and agricultural land.
                  </p>
                </div>
              </section>

              {/* Property Listings Section */}
              <section id="property-listings" className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">2. Property Listings</h2>
                <div className="space-y-6">
                  <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/20">
                    <h3 className="font-semibold text-foreground mb-3">Listing Requirements</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                        All property information must be accurate and up-to-date
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                        Photos must be recent and accurately represent the property
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                        Disclose all known material defects and issues
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                        Comply with all local real estate laws and regulations
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Transactions Section */}
              <section id="transactions" className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">3. Transaction Process</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-3">For Buyers</h3>
                    <p className="text-sm text-muted-foreground">
                      All offers are subject to verification and property inspection. 
                      We recommend conducting due diligence before purchasing.
                    </p>
                  </div>
                  <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/20">
                    <h3 className="font-semibold text-foreground mb-3">For Sellers</h3>
                    <p className="text-sm text-muted-foreground">
                      You agree to provide accurate documentation and cooperate 
                      with the transaction process in good faith.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
                <div className="text-center">
                  <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Questions About Our Terms?</h3>
                  <p className="text-muted-foreground mb-6">
                    Contact our legal department for clarification
                  </p>
                  <a 
                    href="mailto:legal@realestate.com" 
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contact Legal Team
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;