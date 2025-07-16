
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Search, Save, Trash2, Star } from "lucide-react";

interface BehavioralNote {
  id: number;
  studentId: number;
  studentName: string;
  grade: string;
  section: string;
  noteType: 'إيجابية' | 'سلبية' | 'تحذير';
  description: string;
  date: string;
  createdBy: string;
}

interface Student {
  id: number;
  name: string;
  grade: string;
  section: string;
}

const BehavioralNotesManagement = () => {
  const [notes, setNotes] = useState<BehavioralNote[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  
  const [newNote, setNewNote] = useState({
    studentId: '',
    noteType: 'إيجابية' as 'إيجابية' | 'سلبية' | 'تحذير',
    description: ''
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [filterType, setFilterType] = useState("");

  const grades = ["سابع", "ثامن", "تاسع"];
  const sections = ["1", "2", "3", "4", "5", "6", "7"];
  const noteTypes = ['إيجابية', 'سلبية', 'تحذير'];

  // جلب البيانات من localStorage
  useEffect(() => {
    try {
      // جلب الطلاب
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        setStudents(JSON.parse(savedStudents));
      }

      // جلب الملاحظات
      const savedNotes = localStorage.getItem('behavioral_notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
    }
  }, []);

  // تصفية الطلاب
  useEffect(() => {
    let filtered = students;
    
    if (selectedGrade) {
      filtered = filtered.filter(student => student.grade === selectedGrade);
    }
    
    if (selectedSection) {
      filtered = filtered.filter(student => student.section === selectedSection);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredStudents(filtered);
  }, [students, selectedGrade, selectedSection, searchTerm]);

  const handleAddNote = () => {
    if (newNote.studentId && newNote.description) {
      const selectedStudent = students.find(s => s.id.toString() === newNote.studentId);
      if (selectedStudent) {
        const note: BehavioralNote = {
          id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
          studentId: selectedStudent.id,
          studentName: selectedStudent.name,
          grade: selectedStudent.grade,
          section: selectedStudent.section,
          noteType: newNote.noteType,
          description: newNote.description,
          date: new Date().toLocaleDateString('ar-EG'),
          createdBy: 'المشرف'
        };
        
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        localStorage.setItem('behavioral_notes', JSON.stringify(updatedNotes));
        
        setNewNote({
          studentId: '',
          noteType: 'إيجابية',
          description: ''
        });
      }
    }
  };

  const handleDeleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('behavioral_notes', JSON.stringify(updatedNotes));
  };

  const getFilteredNotes = () => {
    let filtered = notes;
    
    if (filterType) {
      filtered = filtered.filter(note => note.noteType === filterType);
    }
    
    if (selectedGrade) {
      filtered = filtered.filter(note => note.grade === selectedGrade);
    }
    
    if (selectedSection) {
      filtered = filtered.filter(note => note.section === selectedSection);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => b.id - a.id);
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'إيجابية':
        return 'default';
      case 'سلبية':
        return 'destructive';
      case 'تحذير':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'إيجابية':
        return <Star className="h-3 w-3 ml-1" />;
      case 'سلبية':
        return <span className="ml-1">⚠️</span>;
      case 'تحذير':
        return <span className="ml-1">🔔</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-4 rounded-xl glass-effect">
            <FileText className="h-12 w-12 text-primary animate-glow" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground font-cairo">الملاحظات السلوكية</h1>
            <p className="text-muted-foreground font-cairo text-lg">إدارة وتتبع الملاحظات السلوكية للطلاب</p>
          </div>
        </div>
      </div>

      {/* Add New Note Form */}
      <Card className="enhanced-card hover-lift animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 font-cairo text-2xl">
            <Plus className="h-8 w-8 text-primary" />
            إضافة ملاحظة جديدة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grade-filter" className="font-cairo text-foreground">الصف</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الصفوف</SelectItem>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade} className="font-cairo">
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section-filter" className="font-cairo text-foreground">الشعبة</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="اختر الشعبة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الشعب</SelectItem>
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

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="student" className="font-cairo text-foreground">الطالب</Label>
              <Select value={newNote.studentId} onValueChange={(value) => setNewNote({...newNote, studentId: value})}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="اختر الطالب" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {filteredStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()} className="font-cairo">
                      {student.name} - {student.grade} / {student.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="noteType" className="font-cairo text-foreground">نوع الملاحظة</Label>
              <Select value={newNote.noteType} onValueChange={(value: any) => setNewNote({...newNote, noteType: value})}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {noteTypes.map((type) => (
                    <SelectItem key={type} value={type} className="font-cairo">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-type" className="font-cairo text-foreground">تصفية حسب النوع</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="جميع الأنواع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الأنواع</SelectItem>
                  {noteTypes.map((type) => (
                    <SelectItem key={type} value={type} className="font-cairo">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-cairo text-foreground">وصف الملاحظة</Label>
            <Textarea
              id="description"
              placeholder="اكتب تفاصيل الملاحظة..."
              value={newNote.description}
              onChange={(e) => setNewNote({...newNote, description: e.target.value})}
              className="enhanced-input min-h-[100px] font-cairo"
            />
          </div>

          <Button 
            onClick={handleAddNote}
            className="enhanced-button hover-lift font-cairo"
            disabled={!newNote.studentId || !newNote.description}
          >
            <Save className="h-5 w-5 ml-2" />
            حفظ الملاحظة
          </Button>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card className="enhanced-card animate-slide-in-right">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-cairo text-xl">
            <FileText className="h-6 w-6 text-primary" />
            قائمة الملاحظات ({getFilteredNotes().length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {getFilteredNotes().length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2 font-cairo">لا توجد ملاحظات</h3>
              <p className="text-muted-foreground font-cairo">لا توجد ملاحظات مطابقة للبحث الحالي</p>
            </div>
          ) : (
            <div className="space-y-4">
              {getFilteredNotes().map((note, index) => (
                <div
                  key={note.id}
                  className="enhanced-card p-4 hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-cairo font-semibold text-lg text-foreground">
                          {note.studentName}
                        </h3>
                        <Badge variant={getBadgeVariant(note.noteType)} className="font-cairo">
                          {getBadgeIcon(note.noteType)}
                          {note.noteType}
                        </Badge>
                        <span className="text-sm text-muted-foreground font-cairo">
                          {note.grade} - الشعبة {note.section}
                        </span>
                      </div>
                      
                      <p className="text-foreground font-cairo leading-relaxed">
                        {note.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground font-cairo">
                        <span>📅 {note.date}</span>
                        <span>👤 {note.createdBy}</span>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BehavioralNotesManagement;
