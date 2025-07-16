import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GraduationCap, User, Phone, BookOpen } from "lucide-react";

interface CourseRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  courseId: number;
}

const CourseRegistrationForm = ({ isOpen, onClose, courseName, courseId }: CourseRegistrationFormProps) => {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    lastName: "",
    phoneNumber: "",
    grade: undefined as string | undefined,
    hasAppliedBefore: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const grades = [
    { value: "seventh", label: "سابع" },
    { value: "eighth", label: "ثامن" },
    { value: "ninth", label: "تاسع" }
  ];

  // Add logging to check grade values
  console.log("Grades array:", grades);
  grades.forEach((grade, index) => {
    console.log(`Grade ${index}:`, grade.value, "length:", grade.value.length);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.fatherName || !formData.lastName || 
        !formData.phoneNumber || !formData.grade) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // حفظ طلب التسجيل
    const registrationRequest = {
      id: Date.now(),
      courseId,
      courseName,
      studentName: formData.studentName,
      fatherName: formData.fatherName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      grade: formData.grade,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    // حفظ في localStorage (يمكن استبداله بقاعدة البيانات لاحقاً)
    const existingRequests = JSON.parse(localStorage.getItem('courseRegistrations') || '[]');
    existingRequests.push(registrationRequest);
    localStorage.setItem('courseRegistrations', JSON.stringify(existingRequests));

    setIsSubmitted(true);
    
    // إعادة تعيين النموذج بعد 3 ثوان
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        studentName: "",
        fatherName: "",
        lastName: "",
        phoneNumber: "",
        grade: undefined,
        hasAppliedBefore: false
      });
      onClose();
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Changing ${field} to:`, value, "type:", typeof value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] glass-effect">
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-cairo text-foreground mb-4">
              تم قبول طلبك بنجاح!
            </h3>
            <p className="text-muted-foreground font-cairo text-center">
              في حال الموافقة سيتم التواصل معك على رقم هاتف ولي الأمر
            </p>
            <p className="text-primary font-cairo font-semibold mt-2">
              شكراً لك
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-effect">
        <DialogHeader>
          <DialogTitle className="font-cairo text-xl text-center">
            تسجيل في دورة: {courseName}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentName" className="font-cairo flex items-center gap-2">
              <User className="h-4 w-4" />
              الاسم
            </Label>
            <Input
              id="studentName"
              value={formData.studentName}
              onChange={(e) => handleInputChange('studentName', e.target.value)}
              placeholder="أدخل اسمك"
              className="font-cairo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fatherName" className="font-cairo flex items-center gap-2">
              <User className="h-4 w-4" />
              اسم الأب
            </Label>
            <Input
              id="fatherName"
              value={formData.fatherName}
              onChange={(e) => handleInputChange('fatherName', e.target.value)}
              placeholder="أدخل اسم الأب"
              className="font-cairo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="font-cairo flex items-center gap-2">
              <User className="h-4 w-4" />
              الكنية
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="أدخل الكنية"
              className="font-cairo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="font-cairo flex items-center gap-2">
              <Phone className="h-4 w-4" />
              رقم هاتف للتواصل
            </Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="أدخل رقم الهاتف"
              className="font-cairo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade" className="font-cairo flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              الصف
            </Label>
            <Select value={formData.grade || ""} onValueChange={(value) => handleInputChange('grade', value)}>
              <SelectTrigger className="font-cairo">
                <SelectValue placeholder="اختر الصف" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade, index) => {
                  console.log(`Rendering SelectItem ${index}:`, grade.value);
                  return (
                    <SelectItem key={grade.value} value={grade.value} className="font-cairo">
                      {grade.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full font-cairo enhanced-button">
              إرسال الطلب
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseRegistrationForm;
