
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, Plus, Search, Edit, Trash2, Eye } from "lucide-react";

interface Note {
  id: number;
  studentName: string;
  note: string;
  date: string;
  type: 'positive' | 'negative' | 'neutral';
}

const NotesManagement = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState<'positive' | 'negative' | 'neutral'>('neutral');
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  const grades = ["سابع", "ثامن", "تاسع"];
  const sections = ["1", "2", "3", "4", "5", "6", "7"];
  const students: string[] = []; // Empty array - no students initially

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

      const note: Note = {
        id: Date.now(),
        studentName: selectedStudent,
        note: newNote.trim(),
        date: new Date().toISOString().split('T')[0],
        type: noteType
      };

      setNotes(prev => [note, ...prev]);
      setNewNote("");
      setSelectedStudent("");
      setNoteType('neutral');
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
          <div className="grid md:grid-cols-3 gap-6">
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
              <Label htmlFor="student" className="font-cairo text-foreground">الطالب</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger className="enhanced-input">
                  <SelectValue placeholder="اختر الطالب" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  {students.length === 0 ? (
                    <SelectItem value="" disabled className="font-cairo text-muted-foreground">
                      لا يوجد طلاب - أضف الطلاب أولاً
                    </SelectItem>
                  ) : (
                    students.map((student) => (
                      <SelectItem key={student} value={student} className="font-cairo">
                        {student}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
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
                disabled={!selectedStudent || !newNote.trim()}
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
