import Link from "next/link";
import { Button } from "../ui/button";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative py-12 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-[#111813] dark:text-white">
                Book a Live Video Call With an{" "}
                <span className="text-primary">AI Mentor</span>.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Real-time guidance. Personalized advice. Instant clarity. Break
                through learning plateaus with 24/7 expert AI mentorship
                tailored just for you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="group flex h-12 items-center justify-center gap-2 px-8 rounded-xl bg-primary text-[#111813] text-base font-bold transition-all hover:-translate-y-0.5 hover:shadow-glow"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    videocam
                  </span>
                  <span>Book a Session</span>
                </Button>
              </Link>
              <Link href="/sign-up">
              <Button variant='outline' className="flex h-12 items-center justify-center gap-2 px-8 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-[#111813] dark:text-white text-base font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined text-[22px] text-primary">
                  play_circle
                </span>
                <span>See How It Works</span>
              </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/${i + 10}/80/80`}
                    className="w-10 h-10 rounded-full border-[3px] border-white dark:border-[#112116] object-cover"
                    alt="User"
                  />
                ))}
                <div className="flex w-10 h-10 items-center justify-center rounded-full border-[3px] border-white dark:border-[#112116] bg-gray-100 dark:bg-surface-dark text-xs font-bold text-gray-600 dark:text-gray-300">
                  +1k
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1 text-yellow-500 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px] fill-1"
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-medium">Trusted by 967+ learners</p>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-blue-400/20 rounded-full blur-[60px] transform scale-90 translate-y-4 -z-10"></div>
            <div className="relative overflow-hidden rounded-3xl bg-[#112116] shadow-2xl border border-gray-200/20 dark:border-gray-700 aspect-video group">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3svjxtVWNxs-iTMN7TbQfM6U-aKz3I1cwsLRpRCCML7gzEAGn1mBT-N6QPv8h9QEkmUwdT8XiTsTuywWK9mDSQnfu1pnIBJ3HakUrHMDdEgXWRIir11F8Qie477UYlBP_PBu4iEv9hsu3PaoZTuuDF33SzN5IUubITh2T8FU9COOmaQC0f0wnXI_zN0IyDgRiPi18qzTlQZa9YDKI3zelaPhL1DGd8C2mFmh5NXvxfJbztxKdg4-bngXmyfZ1594oeDD90egtoCs')",
                }}
              >
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
                <div className="bg-white/50 px-3 py-1.5 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-xs font-bold dark:text-white">
                    LIVE 04:21
                  </span>
                </div>
              </div>

              <div className="absolute top-1/4 left-4 max-w-50 bg-white/50 p-3 rounded-2xl rounded-tl-none floating shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-primary text-[16px]">
                    smart_toy
                  </span>
                  <span className="text-[10px] font-bold uppercase text-gray-500 dark:text-gray-300">
                    AI Mentor
                  </span>
                </div>
                <p className="text-xs font-medium dark:text-white leading-snug">
                  I've analyzed your project structure. Here is a simplified
                  roadmap.
                </p>
              </div>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white/30 transition">
                  <span className="material-symbols-outlined text-[20px]">
                    mic_off
                  </span>
                </button>
                <button className="w-12 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition">
                  <span className="material-symbols-outlined text-[20px]">
                    call_end
                  </span>
                </button>
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white/30 transition">
                  <span className="material-symbols-outlined text-[20px]">
                    chat
                  </span>
                </button>
              </div>

              <div className="absolute -bottom-4 -right-4 w-32 h-24 rounded-2xl bg-gray-200 border-4 border-white dark:border-[#1c2e22] shadow-xl overflow-hidden hidden md:block">
                <img
                  src="https://picsum.photos/seed/user1/150/100"
                  className="w-full h-full object-cover"
                  alt="User Camera"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
