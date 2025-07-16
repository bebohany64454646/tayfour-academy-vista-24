
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Users, Award } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=6000&auto=format&fit=crop"
          alt="Educational Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Welcome Message */}
        <div className="animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-amiri font-bold mb-6 leading-tight">
            مرحباً بكم في
            <br />
            <span className="text-yellow-300">مدرسة محمود طيفور الإعدادية</span>
          </h2>
          <p className="text-xl md:text-2xl font-cairo mb-8 text-blue-100 max-w-3xl mx-auto">
            نبني جيلاً متميزاً بالعلم والمعرفة، ونفتح آفاق المستقبل أمام طلابنا لتحقيق أحلامهم وطموحاتهم
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
          <Button 
            size="lg" 
            className="bg-white text-royal-blue-700 hover:bg-blue-50 font-cairo font-semibold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            استكشف المدرسة
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-royal-blue-700 font-cairo font-semibold text-lg px-8 py-4 rounded-full backdrop-blur-sm"
          >
            تواصل معنا
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in">
          <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <BookOpen className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-cairo mb-2">١٥+</h3>
            <p className="text-blue-100 font-cairo">مادة دراسية</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <Users className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-cairo mb-2">٥٠+</h3>
            <p className="text-blue-100 font-cairo">معلم متخصص</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <Award className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-cairo mb-2">١٠٠٠+</h3>
            <p className="text-blue-100 font-cairo">طالب متفوق</p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-bounce">
        <div className="w-16 h-16 bg-yellow-300 rounded-full opacity-20"></div>
      </div>
      <div className="absolute bottom-1/4 right-10 animate-bounce delay-1000">
        <div className="w-12 h-12 bg-white rounded-full opacity-20"></div>
      </div>
    </section>
  );
};

export default Hero;
