"use client";
import { useState, useEffect } from "react";
import { Footer, Navbar } from "./layout";
import { Hero } from "./Hero";
import {
  FAQS,
  FEATURES,
  PRICING_PLANS,
  STEPS,
  TESTIMONIALS,
} from "../constants";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        <Hero />

        {/* Benefits Section */}
        <section
          id="benefits"
          className="py-24 bg-white dark:bg-background-dark"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-dark text-xs font-bold uppercase tracking-wider mb-4">
                Core Benefits
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                Why Choose AI Mentorship?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Experience the future of personal growth with mentors available
                at your fingertips.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="group p-8 rounded-3xl bg-gray-50 dark:bg-surface-dark border border-transparent hover:border-primary/20 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-3xl">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section
          id="how-it-works"
          className="py-24 bg-background-light dark:bg-background-dark"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Process
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight dark:text-white mb-6">
                Start your journey in 3 steps
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  className="relative group p-8 rounded-3xl bg-white dark:bg-surface-dark shadow-soft hover:shadow-xl transition-all"
                >
                  <div className="absolute -top-6 left-8 size-12 flex items-center justify-center rounded-2xl bg-primary text-white font-black text-xl shadow-lg ring-8 ring-white dark:ring-gray-800">
                    {step.number}
                  </div>
                  <div className="mt-6 mb-6 size-16 flex items-center justify-center rounded-2xl bg-primary/5 text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                  {idx < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-primary/20">
                      <span className="material-symbols-outlined text-4xl">
                        chevron_right
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <InteractiveAdvisor /> */}

        {/* Testimonials */}
        <section
          id="mentors"
          className="py-24 bg-white dark:bg-background-dark overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] mr-1.5">
                  verified
                </span>
                Proven Results
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight dark:text-white mb-6">
                Mentorship that{" "}
                <span className="text-primary">accelerates careers</span>.
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 bg-gray-50 dark:bg-surface-dark p-8 rounded-3xl flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 dark:text-white">
                  Excellent
                </h3>
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="material-symbols-outlined fill-1">
                      star
                    </span>
                  ))}
                  <span className="text-gray-900 dark:text-white font-bold ml-2">
                    4.9
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  Based on 1,248 reviews from verified students.
                </p>
                <div className="space-y-3">
                  {[80, 15, 3, 1, 1].map((pct, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-bold dark:text-gray-400">
                        {5 - i}
                      </span>
                      <div className="grow h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 w-8">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {TESTIMONIALS.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft border border-gray-100 dark:border-white/5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex text-primary">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-[18px] fill-1"
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {t.timeAgo}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                        "{t.content}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                      <img
                        src={t.avatar}
                        className="size-10 rounded-full object-cover"
                        alt={t.name}
                      />
                      <div>
                        <p className="text-sm font-bold dark:text-white">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-white dark:bg-background-dark">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase mb-4">
                Support Center
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">
                          {faq.icon}
                        </span>
                      </div>
                      <span className="font-bold dark:text-white">
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined transition-transform duration-300 ${
                        activeFaq === idx ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <div className="px-6 pb-6 pl-18 text-gray-500 dark:text-gray-400 text-sm leading-relaxed animate-sweep">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-white dark:bg-background-dark">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-[3rem] bg-[#111813] dark:bg-surface-dark p-12 lg:p-24 text-center">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-150 h-150 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-125 h-125 bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Mentors are online now
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                  Your AI Mentor Is Ready <br />
                  <span className="text-primary">When You Are.</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                  Connect with world-class AI knowledge instantly via live
                  video. 24/7 availability means you never have to wait.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/sign-up">
                    <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary text-[#111813] font-black text-lg shadow-glow hover:-translate-y-0.5 transition-all">
                      Book an AI Mentor Now
                    </button>
                  </Link>
                  <Link href="/sign-in">
                    <button className="w-full sm:w-auto px-10 py-5 rounded-2xl border border-gray-700 text-white font-bold text-lg hover:bg-white/5 transition-all">
                      View Demo
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
