
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, CheckCircle, Users, Plus, Search, Save } from "lucide-react";

interface Student {
  id: number;
  name: string;
  grade: string;
  section: string;
  present: boolean;
  notes: string;
}

const AttendanceManagement = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const grades = ["سابع", "ثامن", "تاسع"];
  const sections = ["1", "2", "3", "4", "5", "6", "7"];

  // جلب الطلاب من localStorage
  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        const studentsWithAttendance = parsedStudents.map((student: any) => ({
          id: student.id,
          name: student.name,
          grade: student.grade,
          section: student.section,
          present: true,
          notes: ""
        }));
        setAllStudents(studentsWithAttendance);
      }
    } catch (error) {
      console.error('خطأ في جلب الطلاب:', error);
    }
  }, []);

  // تصفية الطلاب حسب الصف والشعبة
  useEffect(() => {
    let filteredStudents = allStudents;
    
    if (selectedGrade) {
      filteredStudents = filteredStudents.filter(student => student.grade === selectedGrade);
    }
    
    if (selectedSection) {
      filteredStudents = filteredStudents.filter(student => student.section === selectedSection);
    }
    
    if (searchTerm) {
      filteredStudents = filteredStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setStudents(filteredStudents);
  }, [selectedGrade, selectedSection, searchTerm, allStudents]);

  const toggleAttendance = (studentId: number) => {
    try {
      setStudents(prev => prev.map(student =>
        student.id === studentId ? { ...student, present: !student.present } : student
      ));
    } catch (error) {
      console.error('Error toggling attendance:', error);
    }
  };

  const updateNotes = (studentId: number, notes: string) => {
    try {
      setStudents(prev => prev.map(student =>
        student.id === studentId ? { ...student, notes } : student
      ));
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const markAllPresent = () => {
    try {
      setStudents(prev => prev.map(student => ({ ...student, present: true })));
    } catch (error) {
      console.error('Error marking all present:', error);
    }
  };

  const saveAttendance = () => {
    try {
      const attendanceData = {
        date: selectedDate,
        grade: selectedGrade,
        section: selectedSection,
        students: students
      };
      
      // حفظ الحضور في localStorage
      const existingAttendance = localStorage.getItem('attendance') || '[]';
      const attendanceHistory = JSON.parse(existingAttendance);
      attendanceHistory.push(attendanceData);
      localStorage.setItem('attendance', JSON.stringify(attendanceHistory));
      
      console.log('تم حفظ الحضور بنجاح:', attendanceData);
      alert('تم حفظ الحضور بنجاح!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('حدث خطأ في حفظ الحضور');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-4 rounded-xl glass-effect">
            <CheckCircle className="h-12 w-12 text-primary animate-glow" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground font-cairo">إدارة الحضور والغياب</h1>
            <p className="text-muted-foreground font-cairo text-lg">تتبع حضور الطلاب اليومي</p>
          </div>
        </div>
      </div>

      {/* Add New Attendance Form */}
      <Card className="enhanced-card hover-lift animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 font-cairo text-2xl">
            <Plus className="h-8 w-8 text-primary" />
            تسجيل الحضور الجديد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="font-cairo text-foreground">التاريخ</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="enhanced-input font-cairo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade" className="font-cairo text-foreground">الصف</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade} className="font-cairo">
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section" className="font-cairo text-foreground">الشعبة</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="اختر الشعبة" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  {sections.map((section) => (
                    <SelectItem key={section} value={section} className="font-cairo">
                      الشعبة {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search" className="font-cairo text-foreground">البحث</Label>
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="ابحث عن طالب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="enhanced-input pr-10 font-cairo"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={markAllPresent}
              className="enhanced-button hover-lift font-cairo"
              variant="outline"
              disabled={students.length === 0}
            >
              <Users className="h-5 w-5 ml-2" />
              الكل حاضر
            </Button>
            <Button 
              onClick={saveAttendance}
              className="enhanced-button hover-lift font-cairo"
              disabled={students.length === 0 || !selectedGrade || !selectedSection}
            >
              <Save className="h-5 w-5 ml-2" />
              حفظ الحضور
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      {students.length > 0 && (
        <Card className="enhanced-card animate-slide-in-right">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-cairo text-xl">
              <Calendar className="h-6 w-6 text-primary" />
              قائمة الطلاب ({students.length} طالب/طالبة)
              {selectedGrade && selectedSection && (
                <span className="text-muted-foreground">- {selectedGrade} / الشعبة {selectedSection}</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student, index) => (
                <div
                  key={student.id}
                  className="enhanced-card p-4 hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={student.present}
                        onCheckedChange={() => toggleAttendance(student.id)}
                        className="scale-125"
                      />
                      <span className={`font-cairo text-lg ${
                        student.present ? 'text-foreground' : 'text-muted-foreground line-through'
                      }`}>
                        {student.name}
                      </span>
                      <div className={`px-3 py-1 rounded-full text-sm font-cairo ${
                        student.present 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {student.present ? '✓ حاضر' : '✗ غائب'}
                      </div>
                    </div>
                    <div className="flex-1 max-w-md">
                      <Textarea
                        placeholder="ملاحظات (اختياري)..."
                        value={student.notes}
                        onChange={(e) => updateNotes(student.id, e.target.value)}
                        className="enhanced-input min-h-[60px] font-cairo"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Students Message */}
      {selectedGrade && selectedSection && students.length === 0 && (
        <Card className="enhanced-card">
          <CardContent className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2 font-cairo">لا يوجد طلاب</h3>
            <p className="text-muted-foreground font-cairo">
              لا يوجد طلاب مسجلين في {selectedGrade} - الشعبة {selectedSection}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendanceManagement;
