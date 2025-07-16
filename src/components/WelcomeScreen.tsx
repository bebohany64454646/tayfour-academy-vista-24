
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Facebook } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Enhanced Floating Neon Dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="neon-dot neon-dot-1"></div>
        <div className="neon-dot neon-dot-2"></div>
        <div className="neon-dot neon-dot-3"></div>
        <div className="neon-dot neon-dot-4"></div>
        <div className="neon-dot neon-dot-5"></div>
        <div className="neon-dot neon-dot-6"></div>
        <div className="neon-dot neon-dot-7"></div>
        <div className="neon-dot neon-dot-8"></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="floating-particles">
        <div className="particle enhanced-particle"></div>
        <div className="particle enhanced-particle"></div>
        <div className="particle enhanced-particle"></div>
        <div className="particle enhanced-particle"></div>
        <div className="particle enhanced-particle"></div>
      </div>

      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 enhanced-gradient-bg opacity-15"></div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Enhanced Logo Container with proper frame */}
        <div className="mb-8 enhanced-pulse-glow inline-block">
          <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary/30 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <div className="w-24 h-24 mx-auto flex items-center justify-center">
              <img 
                src="/lovable-uploads/8860d291-d798-4f21-ab51-5a3d278c150e.png" 
                alt="شعار مدرسة محمود طيفور الإعدادية" 
                className="w-full h-full object-contain rounded-lg"
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(59, 130, 246, 0.3))'
                }}
              />
            </div>
            {/* Decorative corners */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-primary/50 rounded-tl-lg"></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-primary/50 rounded-tr-lg"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-primary/50 rounded-bl-lg"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-primary/50 rounded-br-lg"></div>
          </div>
        </div>

        {/* Enhanced Welcome Message */}
        <h1 className="text-5xl md:text-7xl font-amiri font-bold mb-6 text-foreground leading-tight enhanced-text-glow">
          مرحباً بكم في
          <br />
          <span className="text-primary enhanced-primary-glow">🏫 مدرسة محمود طيفور الإعدادية</span>
        </h1>

        <p className="text-xl md:text-2xl font-cairo mb-6 text-muted-foreground max-w-2xl mx-auto enhanced-fade-in">
          📚 منصة تعليمية متطورة لإدارة العملية التعليمية بكفاءة وسهولة
        </p>

        {/* KodCraft Message with Facebook Button */}
        <div className="mb-12 flex items-center justify-center gap-4 flex-wrap">
          <p className="text-lg font-cairo text-muted-foreground">
            مع تحيات KodCraft
          </p>
          <a 
            href="https://www.facebook.com/share/g/1CJerKaLkj/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl pulse-glow"
          >
            <Facebook className="h-5 w-5" />
            <span className="font-cairo">فيسبوك</span>
          </a>
        </div>

        {/* Enhanced Action Button */}
        <Button 
          onClick={onComplete}
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-cairo font-semibold text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-primary/30 transition-all duration-300 enhanced-pulse-glow hover:scale-105"
        >
          🚀 ادخل إلى المنصة
          <ArrowLeft className="mr-3 h-6 w-6" />
        </Button>

        {/* Enhanced Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-8">
          <div className="glass-effect rounded-2xl p-4 enhanced-bounce">
            <div className="w-12 h-12 bg-primary/30 rounded-full enhanced-inner-glow"></div>
          </div>
          <div className="glass-effect rounded-2xl p-4 enhanced-bounce-delay-1">
            <div className="w-8 h-8 bg-accent/30 rounded-full enhanced-inner-glow"></div>
          </div>
          <div className="glass-effect rounded-2xl p-4 enhanced-bounce-delay-2">
            <div className="w-10 h-10 bg-primary/40 rounded-full enhanced-inner-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
