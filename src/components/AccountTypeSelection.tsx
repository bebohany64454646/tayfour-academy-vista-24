
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, ArrowLeft } from "lucide-react";

interface AccountTypeSelectionProps {
  onSelectType: (type: 'student' | 'admin') => void;
  onBack: () => void;
}

const AccountTypeSelection = ({ onSelectType, onBack }: AccountTypeSelectionProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Enhanced Floating Neon Dots */}
      <div className="fixed inset-0 pointer-events-none z-0">
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
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="floating-particles">
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
        </div>
      </div>

      {/* Enhanced Gradient Background */}
      <div className="fixed inset-0 enhanced-gradient-bg opacity-10 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="absolute top-8 right-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5 ml-2" />
            العودة
          </Button>
          
          <h1 className="text-6xl md:text-7xl font-amiri font-bold text-foreground mb-6 animate-fade-in">
            اختر نوع الحساب
          </h1>
          <p className="text-2xl text-muted-foreground font-cairo animate-fade-in">
            يرجى تحديد نوع الحساب للمتابعة
          </p>
        </div>

        {/* Account Type Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Student Account */}
          <Card 
            className="group cursor-pointer glass-effect border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-scale-in"
            onClick={() => onSelectType('student')}
          >
            <CardContent className="p-12 text-center">
              <div className="mb-8 pulse-glow inline-block p-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <Users className="h-20 w-20 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-6 font-cairo">
                حساب طالب
              </h3>
              <p className="text-muted-foreground mb-8 font-cairo leading-relaxed text-lg">
                للطلاب للوصول إلى المواد الدراسية، الجدول، العلامات والمزيد
              </p>
              <div className="space-y-3 text-muted-foreground font-cairo">
                <div className="flex items-center justify-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>عرض المواد الدراسية</span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>مشاهدة الجدول الدراسي</span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>متابعة العلامات</span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>حالة الحضور والغياب</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Account */}
          <Card 
            className="group cursor-pointer glass-effect border-border hover:border-accent/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 animate-scale-in"
            onClick={() => onSelectType('admin')}
          >
            <CardContent className="p-12 text-center">
              <div className="mb-8 pulse-glow inline-block p-6 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-all duration-300">
                <Shield className="h-20 w-20 text-accent" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-6 font-cairo">
                حساب مشرف
              </h3>
              <p className="text-muted-foreground mb-8 font-cairo leading-relaxed text-lg">
                للمشرفين والإداريين لإدارة النظام والطلاب والمواد الدراسية
              </p>
              <div className="space-y-3 text-muted-foreground font-cairo">
                <div className="flex items-center justify-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>إدارة الطلاب والصفوف</span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>إدارة المواد الدراسية</span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>متابعة الحضور والغياب</span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>إدارة الكادر التدريسي</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground font-cairo text-lg">
            تم تصميم الموقع وبنائه بواسطة <span className="text-primary font-bold">KodCraft</span>
          </p>
          <p className="text-muted-foreground font-cairo text-sm mt-2">
            مع تحيات مدرسة محمود طيفور
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;
