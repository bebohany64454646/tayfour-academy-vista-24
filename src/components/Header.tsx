
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap, Home, BookOpen, Users, Award, LogIn } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "الرئيسية", href: "#", icon: Home },
    { name: "المواد الدراسية", href: "#subjects", icon: BookOpen },
    { name: "الكادر التدريسي", href: "#faculty", icon: Users },
    { name: "الدورات التدريبية", href: "#courses", icon: Award },
    { name: "تسجيل الدخول", href: "#login", icon: LogIn },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-effect shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and School Name */}
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <GraduationCap className="h-8 w-8 text-royal-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-amiri font-bold text-white">
                مدرسة محمود طيفور الإعدادية
              </h1>
              <p className="text-blue-100 text-sm font-cairo">
                تعليم متميز • مستقبل مشرق
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-cairo font-medium"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg mx-4 mb-4 shadow-xl animate-fade-in">
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-royal-blue-800 hover:bg-royal-blue-50 rounded-lg transition-all duration-300 font-cairo font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
