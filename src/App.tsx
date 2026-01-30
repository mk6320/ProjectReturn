import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Download,
  Heart,
  Brain,
  Sparkles,
  Coffee,
  Menu,
  X,
  TrendingUp,
  Zap,
  Lock,
  Smartphone,
  Wind,
  CheckCircle2,
  Pause,
  Play,
  RotateCcw,
  Shield,
  BookOpen,
  Activity,
  Users
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);



// Interactive Breathing Widget
const BreathingWidget = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('rest');
  const [cycleCount, setCycleCount] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const startBreathing = useCallback(() => {
    setIsActive(true);
    setPhase('inhale');

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(circleRef.current, {
      scale: 1.5,
      duration: 4,
      ease: 'power1.inOut',
      onStart: () => setPhase('inhale'),
    })
      .to({}, { duration: 2, onStart: () => setPhase('hold') })
      .to(circleRef.current, {
        scale: 1,
        duration: 4,
        ease: 'power1.inOut',
        onStart: () => setPhase('exhale'),
      })
      .to({}, {
        duration: 2,
        onStart: () => {
          setPhase('rest');
          setCycleCount(c => c + 1);
        }
      });

    animationRef.current = tl;
  }, []);

  const stopBreathing = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
    gsap.to(circleRef.current, { scale: 1, duration: 0.5 });
    setIsActive(false);
    setPhase('rest');
  }, []);

  const resetBreathing = useCallback(() => {
    stopBreathing();
    setCycleCount(0);
  }, [stopBreathing]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  const phaseText = {
    inhale: 'Breathe In...',
    hold: 'Hold...',
    exhale: 'Breathe Out...',
    rest: 'Rest...'
  };

  return (
    <div className="glass-panel p-8 text-center">
      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Outer rings */}
        <div className="absolute inset-0 rounded-full border-2 border-[#2DD4BF]/20" />
        <div className="absolute inset-4 rounded-full border border-[#2DD4BF]/10" />

        {/* Breathing circle */}
        <div
          ref={circleRef}
          className={`absolute inset-8 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6]' : 'bg-[#2DD4BF]/20'
            }`}
        >
          {isActive ? (
            <Wind className="w-8 h-8 text-[#0B0F17]" />
          ) : (
            <Wind className="w-8 h-8 text-[#2DD4BF]" />
          )}
        </div>
      </div>

      <p className="font-display text-xl font-semibold text-[#F4F7FB] mb-2">
        {isActive ? phaseText[phase] : 'Try a breath'}
      </p>
      <p className="text-sm text-[#A9B3C2] mb-6">
        {isActive ? `Cycles completed: ${cycleCount}` : '4-7-8 breathing technique'}
      </p>

      <div className="flex gap-3 justify-center">
        {!isActive ? (
          <button
            onClick={startBreathing}
            className="btn-primary px-6 py-3"
          >
            <Play className="w-5 h-5" />
            Start
          </button>
        ) : (
          <button
            onClick={stopBreathing}
            className="btn-secondary px-6 py-3"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}
        <button
          onClick={resetBreathing}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-5 h-5 text-[#A9B3C2]" />
        </button>
      </div>
    </div>
  );
};





// Emergency Grounding Card
const EmergencyTools = () => {
  const tools = [
    { name: "5-4-3-2-1 Senses", desc: "Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste" },
    { name: "Cold Water", desc: "Splash cold water on your face or hold ice cubes" },
    { name: "Grounding Touch", desc: "Feel your feet on the floor, press your back against a chair" },
    { name: "Name It", desc: "Say your name, age, where you are, today's date" },
  ];

  return (
    <div className="glass-panel p-6 border-amber-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-[#F4F7FB]">Emergency Grounding</h4>
          <p className="text-xs text-amber-400">For when you feel overwhelmed</p>
        </div>
      </div>
      <div className="space-y-3">
        {tools.map((tool, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <p className="text-sm font-medium text-[#F4F7FB]">{tool.name}</p>
            <p className="text-xs text-[#A9B3C2]">{tool.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);


  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero load animation
      const heroTl = gsap.timeline();
      heroTl
        .fromTo('.hero-illustration',
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        )
        .fromTo('.hero-badge',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.8'
        )
        .fromTo('.hero-headline span',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.03 },
          '-=0.5'
        )
        .fromTo('.hero-subheadline',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo('.hero-ctas > *',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
          '-=0.3'
        );

      // Scroll animations
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(section.querySelectorAll('.reveal-item'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#0B0F17] min-h-screen">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2DD4BF]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#14B8A6]/5 rounded-full blur-[150px]" />
      </div>



      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${scrolled ? 'bg-[#0B0F17]/90 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="font-display font-bold text-lg text-[#F4F7FB] flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#0B0F17]" />
            </div>
            MD: The Return
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#understand" className="link-underline text-sm text-[#A9B3C2] hover:text-[#F4F7FB]">Understanding MD</a>
            <a href="#science" className="link-underline text-sm text-[#A9B3C2] hover:text-[#F4F7FB]">The Science</a>
            <a href="#tools" className="link-underline text-sm text-[#A9B3C2] hover:text-[#F4F7FB]">Tools</a>
            <a
              href="https://t.me/+vuLNodXDBL8zNjU0"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-[#A9B3C2] hover:text-[#2DD4BF] flex items-center gap-1"
            >
              <Users size={14} />
              Community
            </a>
            <a href="#support" className="link-underline text-sm text-[#A9B3C2] hover:text-[#2DD4BF] flex items-center gap-1">
              <Coffee size={14} />
              Support Us
            </a>
            <a href="#download" className="btn-primary text-sm py-2 px-4">Get the App</a>
          </div>

          <button
            className="md:hidden text-[#F4F7FB] p-2 rounded-lg hover:bg-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#111827]/98 backdrop-blur-xl border-t border-white/5 py-6">
            <div className="flex flex-col items-center gap-6">
              <a href="#understand" className="text-[#A9B3C2] hover:text-[#F4F7FB] text-lg">Understanding MD</a>
              <a href="#science" className="text-[#A9B3C2] hover:text-[#F4F7FB] text-lg">The Science</a>
              <a href="#tools" className="text-[#A9B3C2] hover:text-[#F4F7FB] text-lg">Tools</a>
              <a href="https://t.me/+vuLNodXDBL8zNjU0" target="_blank" rel="noopener noreferrer" className="text-[#2DD4BF] hover:text-[#5EEAD4] text-lg flex items-center gap-2">
                <Users size={20} />
                Community
              </a>
              <a href="#support" className="text-[#A9B3C2] hover:text-[#2DD4BF] text-lg flex items-center gap-2">
                <Coffee size={20} />
                Support Us
              </a>
              <a href="#download" className="btn-primary">Get the App</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-6 px-6 sm:px-12 lg:px-20 min-h-[60vh] flex items-center">
        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 mb-8">
            <Heart className="w-4 h-4 text-[#2DD4BF]" />
            <span className="text-sm font-medium text-[#2DD4BF]">You're not alone in this journey</span>
          </div>

          <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl font-bold text-[#F4F7FB] leading-tight mb-8">
            Make Reality Your <br />
            <span className="text-gradient">Favorite Place.</span>
          </h1>

          <p className="hero-subheadline text-xl sm:text-2xl text-[#A9B3C2] mb-12 max-w-2xl mx-auto leading-relaxed">
            Maladaptive daydreaming is a bridge between two worlds.
            We're here to help you stay in the one where you can truly thrive.
          </p>

          <div className="hero-ctas flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#download" className="btn-primary text-lg px-8 py-4">
              <Download size={24} />
              Start Your Return
            </a>
            <a
              href="https://buymeacoffee.com/zagros"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel px-8 py-4 flex items-center justify-center gap-3 text-lg font-semibold text-[#F4F7FB] hover:bg-white/5 transition-all duration-300 border border-white/10"
            >
              <Coffee size={24} className="text-[#2DD4BF]" />
              Buy Me a Coffee
            </a>
          </div>

          <p className="mt-10 text-sm text-[#A9B3C2] flex items-center justify-center gap-6">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#2DD4BF]" /> Free Forever</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#2DD4BF]" /> 100% Private</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#2DD4BF]" /> Built with Care</span>
          </p>
        </div>
      </section>



      {/* Understanding MD Section */}
      <section id="understand" className="reveal-section relative z-10 py-6 sm:py-10 px-6 sm:px-12 lg:px-20" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <span className="label-uppercase mb-4 block reveal-item">The Experience</span>
            <h2 className="reveal-item font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F7FB] mb-4">
              More Than Just a <span className="text-gradient">Wandering Mind.</span>
            </h2>
            <p className="reveal-item text-lg text-[#A9B3C2] max-w-2xl mx-auto leading-relaxed">
              Maladaptive Daydreaming is the experience of living between two worlds:
              the one you are in, and the one your mind created to keep you safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
            {[
              {
                icon: Brain,
                title: "Deep Immersion",
                desc: "It’s more than a distraction. You feel the physical sensations, the emotional highs, and the crushing lows of a world that doesn't exist. Real life begins to feel like a background noise.",
                color: "#2DD4BF"
              },
              {
                icon: Heart,
                title: "A Necessary Sanctuary",
                desc: "Your mind didn't do this to hurt you. It created these stories to protect you from loneliness, trauma, or a reality that felt too heavy to carry. It was your survival mechanism.",
                color: "#F472B6"
              },
              {
                icon: Zap,
                title: "The Addiction",
                desc: "Over time, the brain starts to crave the dopamine spikes that come with perfect fantasy worlds. It becomes a habitual loop that feels impossible to break through willpower alone.",
                color: "#FB923C"
              },
              {
                icon: Activity,
                title: "Physical Behaviors",
                desc: "You might find yourself pacing, whispering, or making facial expressions that match your stories. These repetitive movements are your body's way of 'fueling' the dream.",
                color: "#60A5FA"
              }
            ].map((item, i) => (
              <div key={i} className="reveal-item glass-panel p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full opacity-50 transitioning-all group-hover:w-2" style={{ backgroundColor: item.color }}></div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <item.icon size={24} style={{ color: item.color }} />
                </div>
                <h3 className="font-display text-xl font-bold text-[#F4F7FB] mb-4">{item.title}</h3>
                <p className="text-[#A9B3C2] leading-relaxed text-sm sm:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* The Addiction Loop Illustration */}
          <div className="reveal-item max-w-4xl mx-auto py-10">
            <div className="text-center mb-10">
              <h3 className="font-display text-2xl font-bold text-[#F4F7FB] mb-2">The Cycle of Addiction</h3>
              <p className="text-sm text-[#A9B3C2]">Why it's so hard to just "stop."</p>
            </div>

            <div className="relative flex flex-col items-center justify-center">
              {/* Simple Circle Illustration */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#2DD4BF]/30 flex items-center justify-center animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel px-4 py-2 text-xs font-bold text-[#2DD4BF]">TRIGGER</div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 glass-panel px-4 py-2 text-xs font-bold text-[#FB923C]">IMMERSION</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 glass-panel px-4 py-2 text-xs font-bold text-[#F472B6]">DOPAMINE RUSH</div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 glass-panel px-4 py-2 text-xs font-bold text-[#A9B3C2]">REALITY SHAME</div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 rounded-full bg-[#0B0F17] border border-[#2DD4BF]/20 shadow-2xl z-10">
                  <RotateCcw className="w-8 h-8 text-[#2DD4BF] mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-bold text-[#F4F7FB] tracking-widest">THE LOOP</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 text-center md:text-left">
              <div className="glass-panel p-6">
                <h4 className="text-[#F4F7FB] font-bold mb-2 flex items-center gap-2 justify-center md:justify-start">
                  <Activity size={18} className="text-[#60A5FA]" /> Repetitive Motion
                </h4>
                <p className="text-sm text-[#A9B3C2]">Pacing, rocking, or hand movements aren't just quirks—they stimulate the brain to keep the immersion alive. It's an engine for the dream.</p>
              </div>
              <div className="glass-panel p-6">
                <h4 className="text-[#F4F7FB] font-bold mb-2 flex items-center gap-2 justify-center md:justify-start">
                  <RotateCcw size={18} className="text-[#FB923C]" /> Dopamine Traps
                </h4>
                <p className="text-sm text-[#A9B3C2]">The brain learns that a perfect world is just a thought away. This creates a psychological dependency similar to social media or gaming addiction.</p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* The Science Section */}
      <section id="science" className="reveal-section relative z-10 py-6 sm:py-10 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-transparent via-[#2DD4BF]/5 to-transparent" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <span className="label-uppercase mb-4 block reveal-item">The Science</span>
            <h2 className="reveal-item font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F7FB] mb-4">
              Your Brain Can <span className="text-gradient">Rewire Itself.</span>
            </h2>
            <p className="reveal-item text-lg text-[#A9B3C2] max-w-2xl mx-auto">
              Neuroplasticity means every return to the present moment literally changes your brain.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="reveal-item glass-panel p-8 sm:p-12 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent opacity-50"></div>

              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-3xl bg-[#2DD4BF]/10 flex items-center justify-center border border-[#2DD4BF]/20 group-hover:scale-110 transition-transform duration-500">
                  <Brain size={40} className="text-[#2DD4BF]" />
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F7FB] mb-6">Change is a Biological Fact</h3>

              <div className="space-y-6 text-[#A9B3C2] leading-relaxed text-base sm:text-lg text-left sm:text-center max-w-3xl mx-auto">
                <p>
                  The most important thing to know is that <span className="text-[#F4F7FB] font-semibold">this addiction is not your identity.</span> Maladaptive daydreaming has carved deep, habitual pathways in your brain, making the "drift" feel automatic and out of your control.
                </p>
                <p>
                  But your brain is not static. Through <span className="text-[#2DD4BF] font-semibold">Neuroplasticity</span>, you have the physical ability to rebuild your mind. Every time you catch yourself drifting and gently return to the now, you are weakening the addictive loop and carving a new path of presence.
                </p>
                <p>
                  It’s like training a muscle. At first, reality feels thin and boring compared to the high of fantasy. But with every "return," your brain's ability to stay present grows. <span className="text-[#F4F7FB] font-semibold">You are not just stopping a habit—you are literally rewiring your future.</span>
                </p>
              </div>

              <div className="mt-10 inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-[#2DD4BF]/5 border border-[#2DD4BF]/10">
                <TrendingUp className="text-[#2DD4BF] w-5 h-5" />
                <span className="text-sm font-medium text-[#F4F7FB]">Small wins today lead to a lifetime of clarity.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Tools Section */}
      <section id="tools" className="reveal-section relative z-10 py-6 sm:py-10 px-6 sm:px-12 lg:px-20" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="label-uppercase mb-4 block reveal-item">The App Experience</span>
            <h2 className="reveal-item font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F7FB] mb-4">
              Designed to Bring You <span className="text-gradient">Back.</span>
            </h2>
            <p className="reveal-item text-lg text-[#A9B3C2] max-w-2xl mx-auto">
              Every feature in MD: The Return is built to help you bridge the gap between fantasy and reality.
            </p>
          </div>

          <div className="space-y-24 mb-20">
            {/* Feature 1: Home/Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-item order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 mb-4">
                  <Smartphone className="w-4 h-4 text-[#2DD4BF]" />
                  <span className="text-xs font-bold text-[#2DD4BF] uppercase tracking-wider">The Dashboard</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F7FB] mb-4">Your Progress at a Glance</h3>
                <p className="text-[#A9B3C2] leading-relaxed mb-6">
                  The home screen is your sanctuary. It shows your current "Clarity" level—a real-time reflection of your commitment to staying present. It's the first thing you see when you return.
                </p>
                <div className="glass-panel p-4 border-l-4 border-l-[#2DD4BF]">
                  <p className="text-sm text-[#F4F7FB] font-medium mb-1">How it helps:</p>
                  <p className="text-sm text-[#A9B3C2]">By quantifying your "returns," it turns the abstract goal of presence into a tangible achievement you can be proud of every single day.</p>
                </div>
              </div>
              <div className="reveal-item order-1 lg:order-2">
                <img src="/home-mockup.jpg" alt="The Dashboard" className="w-full max-w-[220px] mx-auto rounded-[2.5rem] shadow-2xl shadow-[#2DD4BF]/20 border border-white/10" />
              </div>
            </div>



            {/* Feature 3: Awareness & Reflection (Combined Video) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-item order-2 lg:order-1">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                    <Zap className="w-4 h-4 text-[#2DD4BF]" />
                    <span className="text-xs font-bold text-[#2DD4BF] uppercase tracking-wider">Awareness</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20">
                    <BookOpen className="w-4 h-4 text-[#60A5FA]" />
                    <span className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider">Reflection</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F7FB] mb-4">Check-in. Process. Return.</h3>
                <p className="text-[#A9B3C2] leading-relaxed mb-6">
                  Our dual approach helps you catch the drift and understand the trigger. Receive gentle prompts to confirm your presence, and immediately note down what pulled you away in your private journal.
                </p>
                <div className="space-y-4">
                  <div className="glass-panel p-4 border-l-4 border-l-[#2DD4BF]">
                    <p className="text-sm text-[#F4F7FB] font-medium mb-1">Gentle Check-ins:</p>
                    <p className="text-sm text-[#A9B3C2]">Trains your brain to notice the exact moment you start to drift into a fantasy world.</p>
                  </div>
                  <div className="glass-panel p-4 border-l-4 border-l-[#60A5FA]">
                    <p className="text-sm text-[#F4F7FB] font-medium mb-1">Instant Journaling:</p>
                    <p className="text-sm text-[#A9B3C2]">Helps you identify 'Why' you left reality, turning a moment of escape into a moment of growth.</p>
                  </div>
                </div>
              </div>
              <div className="reveal-item order-1 lg:order-2">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#2DD4BF]/20 border border-white/10 max-w-[220px] mx-auto">
                  <video
                    src="/awareness-video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Feature 5: Toolkit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-item order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 mb-4">
                  <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
                  <span className="text-xs font-bold text-[#2DD4BF] uppercase tracking-wider">The Toolkit</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F7FB] mb-4">A Tool for Every Moment</h3>
                <p className="text-[#A9B3C2] leading-relaxed mb-6">
                  Whether you need deep grounding, a quick reset, or a timed meditation, our library of exercises is always there to support your specific needs.
                </p>
                <div className="glass-panel p-4 border-l-4 border-l-[#2DD4BF]">
                  <p className="text-sm text-[#F4F7FB] font-medium mb-1">How it helps:</p>
                  <p className="text-sm text-[#A9B3C2]">Having multiple ways to return prevents "habituation"—your brain stays engaged because you can always find a new path back to clarity.</p>
                </div>
              </div>
              <div className="reveal-item order-1 lg:order-2">
                <img src="/exercises-mockup.jpg" alt="Guided Exercises Toolkit" className="w-full max-w-[220px] mx-auto rounded-[2.5rem] shadow-2xl shadow-[#2DD4BF]/20 border border-white/10" />
              </div>
            </div>
          </div>

          <div className="text-center mb-10 pt-10 border-t border-white/5">
            <h3 className="font-display text-2xl font-bold text-[#F4F7FB] mb-4">Try a Sample Tool</h3>
            <p className="text-[#A9B3C2] max-w-xl mx-auto mb-10 text-sm">Experience a simplified version of our core tools right here on the web.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              <div className="reveal-item">
                <BreathingWidget />
              </div>
              <div className="reveal-item">
                <EmergencyTools />
              </div>
            </div>
          </div>
        </div>
      </section>









      {/* Support Section */}
      <section id="support" className="reveal-section relative z-10 py-16 px-6 sm:px-12 lg:px-20 bg-[#2DD4BF]/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 mb-6">
            <Heart className="w-4 h-4 text-[#2DD4BF]" />
            <span className="text-xs font-bold text-[#2DD4BF] uppercase tracking-wider">Support Our Mission</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F7FB] mb-4">Help Us Grow</h2>
          <p className="text-[#A9B3C2] text-lg mb-10 max-w-2xl mx-auto">
            MD: The Return is a labor of love. If this project has helped you find your way back,
            consider supporting our work or joining our growing community.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://buymeacoffee.com/zagros"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel px-8 py-4 flex items-center justify-center gap-3 text-lg font-semibold text-[#F4F7FB] hover:border-[#2DD4BF]/50 transition-all duration-300 border border-white/10"
            >
              <Coffee size={24} className="text-[#2DD4BF]" />
              Buy Me a Coffee
            </a>
            <a
              href="#"
              className="glass-panel px-8 py-4 flex items-center justify-center gap-3 text-lg font-semibold text-[#F4F7FB] hover:border-[#2DD4BF]/50 transition-all duration-300 border border-white/10"
            >
              <Users size={24} className="text-[#2DD4BF]" />
              Join the Community
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-6 sm:py-10 px-6 sm:px-12 lg:px-20 border-t border-white/5" >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#0B0F17]" />
                </div>
                <span className="font-display font-bold text-xl text-[#F4F7FB]">MD: The Return</span>
              </div>
              <p className="text-[#A9B3C2] text-sm leading-relaxed mb-4 max-w-md">
                A compassionate companion for anyone seeking to reclaim their presence from maladaptive daydreaming. Built with care by someone who understands.
              </p>
              <div className="p-4 rounded-xl bg-[#2DD4BF]/5 border border-[#2DD4BF]/10">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-[#2DD4BF]" />
                  <span className="text-sm font-medium text-[#F4F7FB]">Privacy First</span>
                </div>
                <p className="text-xs text-[#A9B3C2]">
                  All data stays on your device. We collect nothing. Ever.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-[#F4F7FB] mb-4">Learn</h4>
              <ul className="space-y-3">
                <li><a href="#understand" className="text-sm text-[#A9B3C2] hover:text-[#2DD4BF]">Understanding MD</a></li>
                <li><a href="#science" className="text-sm text-[#A9B3C2] hover:text-[#2DD4BF]">The Science</a></li>
                <li><a href="#tools" className="text-sm text-[#A9B3C2] hover:text-[#2DD4BF]">Tools</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-[#F4F7FB] mb-4">Support Us</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://buymeacoffee.com/zagros"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#A9B3C2] hover:text-[#FFDD00]"
                  >
                    <Coffee className="w-4 h-4" />
                    Buy Me a Coffee
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-[#A9B3C2] hover:text-[#2DD4BF]"
                  >
                    <Users className="w-4 h-4" />
                    Join Community
                  </a>
                </li>
                <li><a href="mailto:hello@mdreturn.app" className="text-sm text-[#A9B3C2] hover:text-[#2DD4BF]">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#A9B3C2]">
              © 2026 MD: The Return. Made with compassion.
            </p>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#2DD4BF]" />
              <span className="text-xs text-[#A9B3C2]">For everyone finding their way back</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
