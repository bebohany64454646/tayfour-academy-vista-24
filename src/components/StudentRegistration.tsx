
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import { createPendingRegistration } from "@/lib/database";

interface StudentRegistrationProps {
  onBack: () => void;
  onRegister: (data: any) => void;
}

const StudentRegistration = ({ onBack, onRegister }: StudentRegistrationProps) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    studentNumber: "",
    fullName: "",
    grade: "",
    classSection: "",
    phone: "",
    parentPhone: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createPendingRegistration(formData);
      setSuccess(true);
      
      // العودة إلى صفحة تسجيل الدخول بعد 3 ثوان
      setTimeout(() => {
        onBack();
      }, 3000);
      
    } catch (error) {
      console.error('خطأ في إنشاء الطلب:', error);
      setError('حدث خطأ في إنشاء الطلب. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
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

        {/* Enhanced Gradient Background */}
        <div className="absolute inset-0 enhanced-gradient-bg opacity-10"></div>

        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <Card className="glass-effect border-border shadow-2xl text-center">
            <CardHeader className="pb-8">
              <div className="mb-4 pulse-glow inline-block p-4 rounded-full bg-green-500/10">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground font-cairo">
                ✅ تم إرسال طلب إنشاء الحساب
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg font-cairo text-foreground">
                  📋 الطلب قيد المراجعة
                </p>
                <p className="text-muted-foreground font-cairo">
                  ⏳ سيتم الرد بعد قليل
                </p>
                <p className="text-sm text-muted-foreground font-cairo">
                  🔄 جاري العودة إلى صفحة تسجيل الدخول...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 enhanced-gradient-bg opacity-10"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
          disabled={loading}
        >
          <ArrowLeft className="h-5 w-5 ml-2" />
          العودة
        </Button>

        <Card className="glass-effect border-border shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mb-4 pulse-glow inline-block p-4 rounded-full bg-primary/10">
              <UserPlus className="h-12 w-12 text-primary mx-auto" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground font-cairo">
              📝 إنشاء حساب طالب جديد
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span className="text-destructive font-cairo">{error}</span>
                </div>
              )}

              {/* اسم المستخدم */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-cairo">
                  👤 اسم المستخدم
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="bg-secondary/50 border-border"
                  placeholder="أدخل اسم المستخدم"
                  required
                  disabled={loading}
                />
              </div>

              {/* كلمة المرور */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-cairo">
                  🔒 كلمة المرور
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-secondary/50 border-border"
                  placeholder="أدخل كلمة المرور"
                  required
                  disabled={loading}
                />
              </div>

              {/* رقم الطالب */}
              <div className="space-y-2">
                <Label htmlFor="studentNumber" className="text-foreground font-cairo">
                  🔢 رقم الطالب
                </Label>
                <Input
                  id="studentNumber"
                  type="text"
                  value={formData.studentNumber}
                  onChange={(e) => handleInputChange('studentNumber', e.target.value)}
                  className="bg-secondary/50 border-border"
                  placeholder="أدخل رقم الطالب"
                  required
                  disabled={loading}
                />
              </div>

              {/* الاسم الكامل */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground font-cairo">
                  📝 الاسم الكامل
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="bg-secondary/50 border-border"
                  placeholder="أدخل الاسم الكامل"
                  required
                  disabled={loading}
                />
              </div>

              {/* الصف */}
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-foreground font-cairo">
                  🎓 الصف
                </Label>
                <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)} disabled={loading}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="اختر الصف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="سابع">السابع</SelectItem>
                    <SelectItem value="ثامن">الثامن</SelectItem>
                    <SelectItem value="تاسع">التاسع</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* الشعبة */}
              <div className="space-y-2">
                <Label htmlFor="classSection" className="text-foreground font-cairo">
                  📚 الشعبة
                </Label>
                <Select value={formData.classSection} onValueChange={(value) => handleInputChange('classSection', value)} disabled={loading}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="اختر الشعبة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* رقم الهاتف */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-cairo">
                  📞 رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-secondary/50 border-border"
                  placeholder="أدخل رقم الهاتف"
                  required
                  disabled={loading}
                />
              </div>

              {/* رقم هاتف ولي الأمر */}
              <div className="space-y-2">
                <Label htmlFor="parentPhone" className="text-foreground font-cairo">
                  👨‍👩‍👧‍👦 رقم هاتف ولي الأمر
                </Label>
                <Input
                  id="parentPhone"
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                  className="bg-secondary/50 border-border"
                  placeholder="أدخل رقم هاتف ولي الأمر"
                  required
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-cairo font-semibold py-3 pulse-glow"
                disabled={loading}
              >
                <UserPlus className="h-5 w-5 ml-2" />
                {loading ? '🔄 جاري إرسال الطلب...' : '📤 إرسال طلب إنشاء الحساب'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;
