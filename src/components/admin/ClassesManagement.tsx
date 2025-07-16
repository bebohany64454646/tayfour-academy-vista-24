
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School, Plus, Edit, Trash2, Users, GraduationCap } from "lucide-react";

interface ClassSection {
  id: number;
  grade: string;
  section: string;
  customName?: string;
  studentCount: number;
}

const ClassesManagement = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [customName, setCustomName] = useState("");
  const [classSections, setClassSections] = useState<ClassSection[]>([]);

  const grades = ["سابع", "ثامن", "تاسع"];
  const sections = ["1", "2", "3", "4", "5", "6", "7"];

  const addClassSection = () => {
    try {
      if (!selectedGrade || !selectedSection) {
        console.warn('Please select both grade and section');
        return;
      }

      const exists = classSections.some(cs => cs.grade === selectedGrade && cs.section === selectedSection);
      if (exists) {
        console.warn('This class section already exists');
        return;
      }

      const newClassSection: ClassSection = {
        id: Date.now(),
        grade: selectedGrade,
        section: selectedSection,
        customName: customName.trim() || undefined,
        studentCount: 0
      };

      setClassSections(prev => [...prev, newClassSection]);
      setSelectedGrade("");
      setSelectedSection("");
      setCustomName("");
    } catch (error) {
      console.error('Error adding class section:', error);
    }
  };

  const deleteClassSection = (id: number) => {
    try {
      setClassSections(prev => prev.filter(cs => cs.id !== id));
    } catch (error) {
      console.error('Error deleting class section:', error);
    }
  };

  const updateCustomName = (id: number, newName: string) => {
    try {
      setClassSections(prev => prev.map(cs => cs.id === id ? {
        ...cs,
        customName: newName.trim() || undefined
      } : cs));
    } catch (error) {
      console.error('Error updating custom name:', error);
    }
  };

  const groupedSections = grades.reduce((acc, grade) => {
    acc[grade] = classSections.filter(cs => cs.grade === grade);
    return acc;
  }, {} as Record<string, ClassSection[]>);

  const totalStudents = classSections.reduce((sum, cs) => sum + cs.studentCount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-4 rounded-xl glass-effect">
            <School className="h-12 w-12 text-primary animate-glow" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground font-cairo">إدارة الصفوف والشُعب</h1>
            <p className="text-muted-foreground font-cairo text-lg">تنظيم الصفوف الدراسية والشعب</p>
          </div>
        </div>
      </div>

      {/* Add New Section Form */}
      <Card className="enhanced-card hover-lift animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 font-cairo text-2xl">
            <Plus className="h-8 w-8 text-primary" />
            إضافة شعبة جديدة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grade" className="font-cairo text-foreground">الصف</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  {grades.map(grade => (
                    <SelectItem key={grade} value={grade} className="font-cairo">
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section" className="font-cairo text-foreground">رقم الشعبة</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="اختر رقم الشعبة" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  {sections.map(section => (
                    <SelectItem key={section} value={section} className="font-cairo">
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customName" className="font-cairo text-foreground">اسم مخصص (اختياري)</Label>
              <Input 
                id="customName" 
                placeholder="مثل: الشعبة المتميزة" 
                value={customName} 
                onChange={e => setCustomName(e.target.value)} 
                className="enhanced-input font-cairo" 
              />
            </div>
          </div>

          <Button onClick={addClassSection} className="enhanced-button hover-lift font-cairo w-full">
            <Plus className="h-5 w-5 ml-2" />
            إضافة الشعبة
          </Button>
        </CardContent>
      </Card>

      {/* Class Sections Display */}
      <div className="space-y-6">
        {grades.map(grade => (
          <Card key={grade} className="enhanced-card animate-slide-in-right">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-cairo text-xl">
                <GraduationCap className="h-6 w-6 text-primary" />
                الصف {grade}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {groupedSections[grade]?.length === 0 ? (
                <div className="text-center py-8">
                  <School className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground font-cairo">لا توجد شعب لهذا الصف</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedSections[grade]?.map((classSection, index) => (
                    <div key={classSection.id} className="enhanced-card p-4 hover-lift" style={{
                      animationDelay: `${index * 0.1}s`
                    }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="font-cairo font-semibold text-foreground">
                            الشعبة {classSection.section}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => deleteClassSection(classSection.id)} 
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {classSection.customName && (
                        <p className="text-blue-400 font-cairo text-sm mb-2">
                          {classSection.customName}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-cairo">عدد الطلاب:</span>
                        <span className="text-foreground font-bold">{classSection.studentCount}</span>
                      </div>

                      <Input 
                        placeholder="تعديل الاسم المخصص..." 
                        defaultValue={classSection.customName || ""} 
                        onBlur={e => updateCustomName(classSection.id, e.target.value)} 
                        className="enhanced-input mt-3 text-sm font-cairo" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassesManagement;
