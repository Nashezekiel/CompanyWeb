import React, { useState, Children, useRef, useLayoutEffect, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "@/components/Seo";

// Stepper components (in-file implementation)
function StepContentWrapper({ isCompleted, currentStep, direction, children, className }: any) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={(h: number) => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }: any) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady((containerRef.current as any).offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants as any}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '50%' : '-50%',
    opacity: 0,
  }),
};

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }: any) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status as any}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },
          active: { scale: 1, backgroundColor: '#5227FF', color: '#5227FF' },
          complete: { scale: 1, backgroundColor: '#5227FF', color: '#3b82f6' },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === 'complete' ? (
          <CheckIcon className="h-4 w-4 text-black" />
        ) : status === 'active' ? (
          <div className="h-3 w-3 rounded-full bg-[#060010]" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }: any) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: '#5227FF' },
  } as const;

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-neutral-600">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants as any}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export function Step({ children }: any) {
  return <div className="px-8">{children}</div>;
}

function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  resetOnCompleteDelayMs = 2500,
  ...rest
}: any) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  // Auto-reset to step 1 after completion, with delay
  useEffect(() => {
    if (!isCompleted || resetOnCompleteDelayMs <= 0) return;
    const t = setTimeout(() => {
      setDirection(1);
      setCurrentStep(1);
      onStepChange(1);
    }, resetOnCompleteDelayMs);
    return () => clearTimeout(t);
  }, [isCompleted, resetOnCompleteDelayMs, onStepChange]);

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center p-4" {...rest}>
      <div className={`mx-auto w-full max-w-2xl rounded-3xl shadow-xl ${stepCircleContainerClassName}`} style={{ border: '1px solid #222' }}>
        <div className={`${stepContainerClassName} flex w-full items-center p-6`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked: number) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked: number) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>
        <StepContentWrapper isCompleted={isCompleted} currentStep={currentStep} direction={direction} className={`space-y-2 px-6`}>
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>
        {!isCompleted && (
          <div className={`px-6 pb-6`}>
            <div className={`mt-8 flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              {currentStep !== 1 && (
                <button onClick={handleBack} className={`duration-350 rounded px-2 py-1 transition ${currentStep === 1 ? 'pointer-events-none opacity-50 text-neutral-400' : 'text-neutral-400 hover:text-neutral-700'}`} {...backButtonProps}>
                  {backButtonText}
                </button>
              )}
              <button onClick={isLastStep ? handleComplete : handleNext} className="duration-350 flex items-center justify-center rounded-full bg-green-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-green-600 active:bg-green-700" {...nextButtonProps}>
                {isLastStep ? 'Complete' : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    message: ""
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const text = encodeURIComponent(
      `Hello Starlink, I'd like a quote.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nService: ${formData.service}\nMessage: ${formData.message}`,
    );

    window.open(`https://wa.me/09060976424?text=${text}`, "_blank");
    setTimeout(() => {
      setLoading(false);
      toast.success("Thanks! We will reach out shortly via WhatsApp/email.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        service: "",
        message: ""
      });
    }, 600);
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Seo
        title="Contact Starlink Installers in Nigeria | Get Connected"
        description="Contact Starlink Installation & Services to get Starlink installation, internet connection, and enterprise networking solutions anywhere in Nigeria. Request a quote or talk to our team."
      />
      {/* Hero Section */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="mt-3 text-lg text-foreground/70 max-w-2xl mx-auto">
              Ready to transform your connectivity? Let's discuss your Starlink and enterprise networking needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form + Quick Chat side-by-side */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* Left: Quick Chat CTA */}
            <div className="order-2 md:order-1">
              <Card className="shadow-lg h-full flex flex-col justify-center">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Prefer a quick chat?</CardTitle>
                  <CardDescription>Reach us instantly via call or WhatsApp.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4">
                  <p className="text-sm text-foreground/70 text-center max-w-md">
                    Our team is available <span className="font-medium">Mon–Sat, 8:00–18:00</span>. Typical response time is
                    <span className="font-medium"> under 5 minutes</span> during business hours.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row w-full">
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white flex-1 h-12 md:h-14 text-base">
                      <a href="tel:09060976424"><Phone className="mr-2 h-5 w-5" /> Call Us</a>
                    </Button>
                    <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 flex-1 h-12 md:h-14 text-base">
                      <a
                        href={`https://wa.me/09060976424?text=${encodeURIComponent("Hello Starlink, I'd like to get connected.")}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Contact Form */}
            <div className="order-1 md:order-2">
              <Card className="shadow-lg h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">Request a Quote</CardTitle>
                  <CardDescription>
                    Tell us about your connectivity needs and we'll provide a tailored solution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="City, Country"
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service Type</Label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="starlink-sales">Starlink Sales & Installation</SelectItem>
                          <SelectItem value="wifi-coverage">Whole-Premises WiFi Coverage</SelectItem>
                          <SelectItem value="wifi-extension">Long-Range WiFi Extension</SelectItem>
                          <SelectItem value="wisp-setup">WISP Business Setup</SelectItem>
                          <SelectItem value="enterprise-plans">Enterprise Internet Plans</SelectItem>
                          <SelectItem value="backup-power">Backup Power Systems</SelectItem>
                          <SelectItem value="global-roaming">Starlink Global Roaming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                        rows={4}
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm text-foreground/60">
                        We'll respond within 24 hours
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="transition-all hover:scale-105 h-11 px-4 text-sm md:h-12 md:px-6 md:text-base"
                      >
                        {loading ? (
                          <>
                            <div className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                            Send Request
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Purchasing Process Stepper */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center mb-8">
            <h2 className="text-3xl font-bold">How to Get Your Device</h2>
            <p className="mt-2 text-foreground/70">Follow these quick steps to purchase, schedule installation, and get online fast.</p>
          </div>
          <Stepper
            initialStep={1}
            nextButtonText="Next"
            backButtonText="Previous"
            resetOnCompleteDelayMs={3000}
            onFinalStepCompleted={() => toast.success("All steps completed!") }
          >
            <Step>
              <h3 className="text-xl font-semibold">1. Choose Your Device</h3>
              <p className="mt-2 text-foreground/70">Select from our product range (e.g., Starlink Gen3 v4 Standard Dish, Flat High Performance, or Starlink Mini) based on your needs.</p>
            </Step>
            <Step>
              <h3 className="text-xl font-semibold">2. Share Site Details</h3>
              <p className="mt-2 text-foreground/70">Provide your location and any special requirements. We verify coverage and recommend mounts, cabling, and Wi‑Fi distribution.</p>
            </Step>
            <Step>
              <h3 className="text-xl font-semibold">3. Get Quote & Schedule</h3>
              <p className="mt-2 text-foreground/70">Receive a tailored quote. Once approved, we schedule installation at your convenience.</p>
            </Step>
            <Step>
              <h3 className="text-xl font-semibold">4. Installation & Activation</h3>
              <p className="mt-2 text-foreground/70">Our team installs, aligns, and activates your Starlink. We test Wi‑Fi coverage and hand over.</p>
            </Step>
          </Stepper>
        </div>
      </section>
    </div>
  );
}
