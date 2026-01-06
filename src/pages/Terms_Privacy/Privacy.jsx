// Privacy.tsx
import React from 'react';
import { Lock, Eye, Shield, Database, Users, Mail, Phone, MapPin } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-secondary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Protecting your privacy in every property transaction
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="bg-primary/10 p-4 rounded-xl">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Our Commitment to Privacy
                </h2>
                <p className="text-muted-foreground">
                  At our real estate platform, we understand that buying and selling property involves 
                  sharing sensitive information. We're committed to protecting your privacy throughout 
                  every transaction.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/20">
                <Eye className="h-8 w-8 text-secondary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We clearly explain what data we collect and why
                </p>
              </div>
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <Database className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Security</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security for all your information
                </p>
              </div>
              <div className="bg-accent/5 rounded-xl p-6 border border-accent/20">
                <Users className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Control</h3>
                <p className="text-sm text-muted-foreground">
                  You control your data and how it's used
                </p>
              </div>
            </div>
          </div>

          {/* Data Collection Section */}
          <section className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Information We Collect</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Email Address</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Phone Number</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Full Name</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Property Address</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-secondary pl-6 py-2">
                <h3 className="font-semibold text-foreground mb-2">Property Information</h3>
                <p className="text-sm text-muted-foreground">
                  Details about properties you list, sell, or inquire about, including:
                  addresses, property features, pricing information, and transaction history.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6 py-2">
                <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                <p className="text-sm text-muted-foreground">
                  Information about how you interact with our platform, including:
                  search history, viewed properties, and communication logs.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Data */}
          <section className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">How We Use Your Information</h2>
            
            <div className="space-y-4">
              <div className="bg-linear-to-r from-primary/5 to-transparent p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-1">Property Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  To facilitate buying, selling, and renting properties through our platform
                </p>
              </div>
              
              <div className="bg-linear-to-r from-secondary/5 to-transparent p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-1">Communication</h3>
                <p className="text-sm text-muted-foreground">
                  To keep you informed about property updates, offers, and transaction status
                </p>
              </div>
              
              <div className="bg-linear-to-r from-accent/5 to-transparent p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-1">Legal Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  To comply with real estate regulations and legal requirements
                </p>
              </div>
              
              <div className="bg-linear-to-r from-primary/5 to-transparent p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-1">Service Improvement</h3>
                <p className="text-sm text-muted-foreground">
                  To enhance our platform and provide better real estate services
                </p>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Data Sharing & Protection</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-linear-to-br from-background to-secondary/5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-3">With Your Consent</h3>
                <p className="text-sm text-muted-foreground">
                  We only share your information with other parties (like real estate agents, 
                  notaries, or financial institutions) when necessary for your transaction 
                  and with your explicit consent.
                </p>
              </div>
              
              <div className="p-6 bg-linear-to-br from-background to-primary/5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-3">Legal Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  We may disclose information when required by law or to protect our rights, 
                  property, or safety, or that of others.
                </p>
              </div>
              
              <div className="p-6 bg-linear-to-br from-background to-accent/5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-3">Service Providers</h3>
                <p className="text-sm text-muted-foreground">
                  We work with trusted partners who help us operate our platform, 
                  all bound by strict confidentiality agreements.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
            <div className="text-center">
              <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Your Privacy Rights</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                You have the right to access, correct, or delete your personal information. 
                You can also object to or restrict certain processing of your data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:privacy@realestate.com" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Privacy Team
                </a>
                <a 
                  href="/data-request" 
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/90 transition-colors"
                >
                  Data Request Form
                </a>
              </div>
            </div>
          </section>

          {/* Update Notice */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p className="mt-2">We regularly review and update this policy to reflect changes in our practices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;