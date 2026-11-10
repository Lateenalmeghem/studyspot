"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  MapPin,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/studyspot/auth-context";
import { Logo } from "@/components/studyspot/logo";
import {
  AuroraBackground,
  GrainOverlay,
  CursorGlow,
  AnimatedGradientText,
  MagneticButton,
  FloatingParticles,
} from "@/components/studyspot/effects";

type Mode = "signin" | "signup";

export function AuthView() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = React.useState<Mode>("signin");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);

  const reset = () => {
    setError(null);
    setName("");
    setEmail("");
    setPassword("");
    setShowPass(false);
  };

  const switchMode = (m: Mode) => {
    reset();
    setMode(m);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 750));
    const res =
      mode === "signin"
        ? signIn(email, password)
        : signUp(name, email, password);
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      return;
    }
    setSuccess(true);
  };

  const fillDemo = () => {
    setEmail("demo@studyspot.app");
    setPassword("demo1234");
    setError(null);
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background p-4">
      <AuroraBackground />
      <FloatingParticles count={20} />
      <CursorGlow />
      <GrainOverlay />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5 animate-spin-slow" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border/60 shadow-3d-lg glass-strong md:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden p-8 text-white md:flex brand-gradient">
          <div className="orb animate-float-slow -left-10 -top-10 h-40 w-40 bg-sky-400/40" />
          <div className="orb animate-float-slower -bottom-12 right-0 h-44 w-44 bg-emerald-400/30" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="animate-float-3d preserve-3d">
                <Logo size={48} />
              </div>
              <div>
                <h2 className="text-2xl font-bold leading-tight">StudySpot</h2>
                <p className="text-xs text-white/80">Find. Study. Focus.</p>
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 text-3xl font-bold leading-tight"
            >
              Your campus,
              <br />
              <span className="text-emerald-200">in real time.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-3 max-w-xs text-sm text-white/85"
            >
              Find an available study space at Prince Sultan University before
              you walk over. Save time, study smarter.
            </motion.p>
          </div>

          <div className="relative space-y-3">
            {[
              { icon: MapPin, text: "Real GPS map of PSU campus" },
              { icon: Zap, text: "Live seating availability" },
              { icon: ShieldCheck, text: "Quick & secure demo access" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-sm text-white/90"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
                    <Icon className="h-4 w-4" />
                  </span>
                  {f.text}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative flex items-center justify-center p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-3d-lg"
                >
                  <CheckCircle2 className="h-11 w-11" />
                </motion.div>
                <h3 className="text-xl font-bold">Welcome to StudySpot!</h3>
                <p className="text-sm text-muted-foreground">
                  Taking you to your campus…
                </p>
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20, rotateX: -8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="mb-6 flex items-center gap-2 md:hidden">
                  <Logo size={40} />
                  <div>
                    <h2 className="text-lg font-bold">StudySpot</h2>
                    <p className="text-[11px] text-muted-foreground">
                      Find. Study. Focus.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    <Sparkles className="h-3 w-3" />
                    {mode === "signin" ? "Welcome back" : "Create your account"}
                  </div>
                  <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                    {mode === "signin" ? (
                      <>
                        Sign in to{" "}
                        <AnimatedGradientText>StudySpot</AnimatedGradientText>
                      </>
                    ) : (
                      <>
                        Join{" "}
                        <AnimatedGradientText>StudySpot</AnimatedGradientText>
                      </>
                    )}
                  </h1>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {mode === "signin"
                      ? "Enter your details to access live campus availability."
                      : "Create a free account to find your study space."}
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-3.5">
                  <AnimatePresence>
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <FormField
                          icon={User}
                          label="Full name"
                          type="text"
                          placeholder="Ahmed Al-Saud"
                          value={name}
                          onChange={setName}
                          autoComplete="name"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <FormField
                    icon={Mail}
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                  />

                  <FormField
                    icon={Lock}
                    label="Password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={setPassword}
                    autoComplete={
                      mode === "signin" ? "current-password" : "new-password"
                    }
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowPass((s) => !s)}
                        aria-label={showPass ? "Hide password" : "Show password"}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {showPass ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                  />

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    strength={0.25}
                    className={cn(
                      "shine-sweep relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-3d transition-all hover:shadow-3d-lg disabled:opacity-70",
                      !submitting && "animate-glow-pulse"
                    )}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Please wait…
                      </>
                    ) : (
                      <>
                        {mode === "signin" ? "Sign in" : "Create account"}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </MagneticButton>

                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={fillDemo}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                    >
                      <GraduationCap className="h-3.5 w-3.5" />
                      Use demo account (demo@studyspot.app / demo1234)
                    </button>
                  )}
                </form>

                <p className="mt-5 text-center text-sm text-muted-foreground">
                  {mode === "signin" ? (
                    <>
                      New to StudySpot?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("signup")}
                        className="font-semibold text-primary hover:underline"
                      >
                        Create an account
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("signin")}
                        className="font-semibold text-primary hover:underline"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function FormField({
  icon: Icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  trailing,
}: {
  icon: typeof Mail;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
        {label}
      </span>
      <div className="input-glow flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2.5 transition-all">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
        />
        {trailing}
      </div>
    </label>
  );
}
