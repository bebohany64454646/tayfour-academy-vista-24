
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, Plus, Search, Edit, Trash2, Eye, RefreshCw } from "lucide-react";
import { getAllStudents } from "@/lib/database";

interface Note {
  id: number;
  studentName: string;
  note: string;
  date: string;
  type: 'positive' | 'negative' | 'neutral';
}

interface Student {
  id: number;
  username: string;
  student_number: string;
  full_name: string;
  grade: string;
  class_section: string;
  phone: string;
  parent_phone: string;
}

const NotesManagement = () => {
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState<'positive' | 'negative' | 'neutral'>('neutral');
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const grades = ["سابع", "ثامن", "تاسع"];
  const sections = ["1", "2", "3", "4", "5", "6", "7"];

  // جلب بيانات الطلاب من قاعدة البيانات
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      const formattedData: Student[] = data.map((row: any) => ({
        id: row.id as number,
        username: row.username as string,
        student_number: row.student_number as string,
        full_name: row.full_name as string,
        grade: row.grade as string,
        class_section: row.class_section as string,
        phone: row.phone as string,
        parent_phone: row.parent_phone as string,
      }));
      setStudents(formattedData);
      console.log('تم جلب بيانات الطلاب:', formattedData.length);
    } catch (error) {
      console.error('خطأ في جلب الطلاب:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // تصفية الطلاب حسب الصف والشعبة والبحث
  const filteredStudents = students.filter(student => {
    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade;
    const matchesSection = selectedSection === "all" || student.class_section === selectedSection;
    const matchesSearch = !searchTerm || 
      student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesGrade && matchesSection && matchesSearch;
  });

  const filteredNotes = notes.filter(note =>
    note.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNote = () => {
    try {
      if (!selectedStudent || !newNote.trim()) {
        console.warn('Please select a student and enter a note');
        return;
      }

      const selectedStudentData = students.find(s => s.id.toString() === selectedStudent);
      if (!selectedStudentData) {
        console.warn('Selected student not found');
        return;
      }

      const note: Note = {
        id: Date.now(),
        studentName: selectedStudentData.full_name,
        note: newNote.trim(),
        date: new Date().toISOString().split('T')[0],
        type: noteType
      };

      setNotes(prev => [note, ...prev]);
      setNewNote("");
      setSelectedStudent("");
      setNoteType('neutral');
      console.log('تمت إضافة الملاحظة بنجاح');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = (noteId: number) => {
    try {
      setNotes(prev => prev.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const getNoteTypeColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return 'border-green-500/30 bg-green-500/10 text-green-400';
      case 'negative': return 'border-red-500/30 bg-red-500/10 text-red-400';
      default: return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
    }
  };

  const getNoteTypeIcon = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return '✓';
      case 'negative': return '⚠';
      default: return 'ℹ';
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
            <h1 className="text-4xl font-bold text-foreground font-cairo">إدارة الملاحظات السلوكية</h1>
            <p className="text-muted-foreground font-cairo text-lg">إضافة ومتابعة ملاحظات الطلاب</p>
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
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grade" className="font-cairo text-foreground">الصف</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  <SelectItem value="all" className="font-cairo">جميع الصفوف</SelectItem>
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
                  <SelectItem value="all" className="font-cairo">جميع الشعب</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section} className="font-cairo">
                      الشعبة {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search" className="font-cairo text-foreground">البحث عن طالب</Label>
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث بالاسم أو رقم الطالب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="enhanced-input pr-10 font-cairo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-cairo text-foreground">تحديث البيانات</Label>
              <Button 
                onClick={fetchStudents} 
                variant="outline" 
                className="w-full font-cairo"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'جاري التحديث...' : 'تحديث قائمة الطلاب'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="student" className="font-cairo text-foreground">الطالب</Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger className="enhanced-input">
                <SelectValue placeholder={
                  loading ? "جاري تحميل الطلاب..." :
                  filteredStudents.length === 0 ? "لا يوجد طلاب - تأكد من إضافة الطلاب أولاً" :
                  "اختر الطالب"
                } />
              </SelectTrigger>
              <SelectContent className="glass-effect max-h-60">
                {filteredStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()} className="font-cairo">
                    {student.full_name} - {student.grade} / {student.class_section} - رقم: {student.student_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {filteredStudents.length > 0 && (
              <p className="text-sm text-muted-foreground font-cairo">
                عدد الطلاب المتاحين: {filteredStudents.length}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-3 space-y-2">
              <Label htmlFor="note" className="font-cairo text-foreground">الملاحظة</Label>
              <Textarea
                id="note"
                placeholder="اكتب الملاحظة هنا..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="enhanced-input min-h-[120px] font-cairo"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="font-cairo text-foreground">نوع الملاحظة</Label>
                <Select value={noteType} onValueChange={(value: 'positive' | 'negative' | 'neutral') => setNoteType(value)}>
                  <SelectTrigger className="enhanced-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-effect">
                    <SelectItem value="positive" className="font-cairo text-green-400">إيجابية ✓</SelectItem>
                    <SelectItem value="neutral" className="font-cairo text-blue-400">عادية ℹ</SelectItem>
                    <SelectItem value="negative" className="font-cairo text-red-400">سلبية ⚠</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={addNote}
                className="enhanced-button hover-lift font-cairo w-full"
                disabled={!selectedStudent || !newNote.trim() || loading}
              >
                <Save className="h-5 w-5 ml-2" />
                إضافة الملاحظة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="enhanced-card">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في الملاحظات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="enhanced-input pr-10 font-cairo"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card className="enhanced-card animate-slide-in-right">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-cairo text-xl">
            <Eye className="h-6 w-6 text-primary" />
            الملاحظات المسجلة ({filteredNotes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-cairo text-lg">لا توجد ملاحظات مسجلة</p>
                <p className="text-muted-foreground font-cairo text-sm">ابدأ بإضافة ملاحظات سلوكية للطلاب</p>
              </div>
            ) : (
              filteredNotes.map((note, index) => (
                <div
                  key={note.id}
                  className="enhanced-card p-4 hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-4">
                        <h3 className="font-cairo text-lg font-semibold text-foreground">
                          {note.studentName}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-cairo border ${getNoteTypeColor(note.type)}`}>
                          {getNoteTypeIcon(note.type)} {
                            note.type === 'positive' ? 'إيجابية' :
                            note.type === 'negative' ? 'سلبية' : 'عادية'
                          }
                        </div>
                        <span className="text-muted-foreground font-cairo text-sm">
                          {note.date}
                        </span>
                      </div>
                      <p className="text-foreground font-cairo leading-relaxed">
                        {note.note}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNote(note.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesManagement;
