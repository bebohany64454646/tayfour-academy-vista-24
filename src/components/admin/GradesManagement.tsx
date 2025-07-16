
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FileText, Star } from "lucide-react";

interface OralGrade {
  id: number;
  studentName: string;
  subject: string;
  grade: number;
  teacher: string;
  date: string;
  notes?: string;
}

const GradesManagement = () => {
  const [grades, setGrades] = useState<OralGrade[]>([]);
  const [newGrade, setNewGrade] = useState<{
    studentName: string;
    subject: string;
    grade: number;
    teacher: string;
    date: string;
    notes: string;
  }>({
    studentName: '',
    subject: '',
    grade: 0,
    teacher: '',
    date: '',
    notes: ''
  });
  
  const [editingGrade, setEditingGrade] = useState<OralGrade | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGrade = () => {
    if (newGrade.studentName && newGrade.subject && newGrade.grade >= 0 && newGrade.grade <= 100 && newGrade.teacher && newGrade.date) {
      const grade: OralGrade = {
        id: grades.length > 0 ? Math.max(...grades.map(g => g.id)) + 1 : 1,
        studentName: newGrade.studentName,
        subject: newGrade.subject,
        grade: newGrade.grade,
        teacher: newGrade.teacher,
        date: newGrade.date,
        notes: newGrade.notes || undefined
      };
      setGrades([...grades, grade]);
      setNewGrade({
        studentName: '',
        subject: '',
        grade: 0,
        teacher: '',
        date: '',
        notes: ''
      });
      setIsDialogOpen(false);
    }
  };

  const handleEditGrade = (grade: OralGrade) => {
    setEditingGrade(grade);
    setNewGrade({
      studentName: grade.studentName,
      subject: grade.subject,
      grade: grade.grade,
      teacher: grade.teacher,
      date: grade.date,
      notes: grade.notes || ''
    });
    setIsDialogOpen(true);
  };

  const handleUpdateGrade = () => {
    if (editingGrade) {
      setGrades(grades.map(g => g.id === editingGrade.id ? {
        ...editingGrade,
        studentName: newGrade.studentName,
        subject: newGrade.subject,
        grade: newGrade.grade,
        teacher: newGrade.teacher,
        date: newGrade.date,
        notes: newGrade.notes || undefined
      } : g));
      setEditingGrade(null);
      setNewGrade({
        studentName: '',
        subject: '',
        grade: 0,
        teacher: '',
        date: '',
        notes: ''
      });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteGrade = (id: number) => {
    setGrades(grades.filter(g => g.id !== id));
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return 'text-green-600';
    if (grade >= 70) return 'text-blue-600';
    if (grade >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground font-cairo">إدارة العلامات الشفهية</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => {
              setEditingGrade(null);
              setNewGrade({
                studentName: '',
                subject: '',
                grade: 0,
                teacher: '',
                date: '',
                notes: ''
              });
            }}>
              <Plus className="h-5 w-5 ml-2" />
              إضافة علامة شفهية
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-cairo">
                {editingGrade ? 'تعديل العلامة الشفهية' : 'إضافة علامة شفهية جديدة'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="studentName" className="font-cairo">اسم الطالب</Label>
                <Input
                  id="studentName"
                  value={newGrade.studentName}
                  onChange={(e) => setNewGrade({...newGrade, studentName: e.target.value})}
                  className="font-cairo"
                  placeholder="أدخل اسم الطالب"
                />
              </div>
              
              <div>
                <Label htmlFor="subject" className="font-cairo">المادة</Label>
                <Input
                  id="subject"
                  value={newGrade.subject}
                  onChange={(e) => setNewGrade({...newGrade, subject: e.target.value})}
                  className="font-cairo"
                  placeholder="أدخل اسم المادة (مثل: الرياضيات، العلوم، اللغة العربية)"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grade" className="font-cairo">العلامة (من 100)</Label>
                  <Input
                    id="grade"
                    type="number"
                    min="0"
                    max="100"
                    value={newGrade.grade}
                    onChange={(e) => setNewGrade({...newGrade, grade: Number(e.target.value)})}
                    className="font-cairo"
                    placeholder="0-100"
                  />
                </div>
                <div>
                  <Label htmlFor="date" className="font-cairo">التاريخ</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newGrade.date}
                    onChange={(e) => setNewGrade({...newGrade, date: e.target.value})}
                    className="font-cairo"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="teacher" className="font-cairo">اسم المعلم</Label>
                <Input
                  id="teacher"
                  value={newGrade.teacher}
                  onChange={(e) => setNewGrade({...newGrade, teacher: e.target.value})}
                  className="font-cairo"
                  placeholder="أدخل اسم المعلم"
                />
              </div>
              
              <div>
                <Label htmlFor="notes" className="font-cairo">ملاحظات (اختياري)</Label>
                <Input
                  id="notes"
                  value={newGrade.notes}
                  onChange={(e) => setNewGrade({...newGrade, notes: e.target.value})}
                  className="font-cairo"
                  placeholder="أدخل أي ملاحظات إضافية"
                />
              </div>
              
              <Button 
                onClick={editingGrade ? handleUpdateGrade : handleAddGrade}
                className="bg-primary hover:bg-primary/90 font-cairo"
              >
                {editingGrade ? 'تحديث العلامة' : 'إضافة العلامة'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grades Table */}
      <Card className="glass-effect border-border">
        <CardHeader>
          <CardTitle className="font-cairo">العلامات الشفهية</CardTitle>
        </CardHeader>
        <CardContent>
          {grades.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-cairo text-lg">لا توجد علامات شفهية مسجلة</p>
              <p className="text-muted-foreground font-cairo text-sm">ابدأ بإضافة العلامات الشفهية للطلاب</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-cairo">اسم الطالب</TableHead>
                  <TableHead className="font-cairo">المادة</TableHead>
                  <TableHead className="font-cairo">العلامة</TableHead>
                  <TableHead className="font-cairo">المعلم</TableHead>
                  <TableHead className="font-cairo">التاريخ</TableHead>
                  <TableHead className="font-cairo">ملاحظات</TableHead>
                  <TableHead className="font-cairo">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-cairo font-medium">{grade.studentName}</TableCell>
                    <TableCell className="font-cairo">{grade.subject}</TableCell>
                    <TableCell className="font-cairo">
                      <div className={`flex items-center gap-2 font-bold ${getGradeColor(grade.grade)}`}>
                        <Star className="h-4 w-4" />
                        {grade.grade}/100
                      </div>
                    </TableCell>
                    <TableCell className="font-cairo">{grade.teacher}</TableCell>
                    <TableCell className="font-cairo">{grade.date}</TableCell>
                    <TableCell className="font-cairo">{grade.notes || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEditGrade(grade)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteGrade(grade.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GradesManagement;
