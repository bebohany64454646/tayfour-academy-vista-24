
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Search, Users } from "lucide-react";

interface Faculty {
  id: number;
  name: string;
  position: string;
}

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  const [newFaculty, setNewFaculty] = useState({
    name: '', position: ''
  });
  
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredFaculty = faculty.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFaculty = () => {
    if (newFaculty.name && newFaculty.position) {
      const member = {
        id: faculty.length > 0 ? Math.max(...faculty.map(f => f.id)) + 1 : 1,
        ...newFaculty
      };
      setFaculty([...faculty, member]);
      setNewFaculty({ name: '', position: '' });
      setIsDialogOpen(false);
    }
  };

  const handleEditFaculty = (member: Faculty) => {
    setEditingFaculty(member);
    setNewFaculty(member);
    setIsDialogOpen(true);
  };

  const handleUpdateFaculty = () => {
    if (editingFaculty) {
      setFaculty(faculty.map(f => f.id === editingFaculty.id ? { ...editingFaculty, ...newFaculty } : f));
      setEditingFaculty(null);
      setNewFaculty({ name: '', position: '' });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteFaculty = (id: number) => {
    setFaculty(faculty.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground font-cairo">إدارة الكادر التدريسي</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => {
              setEditingFaculty(null);
              setNewFaculty({ name: '', position: '' });
            }}>
              <Plus className="h-5 w-5 ml-2" />
              إضافة عضو كادر
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-cairo">
                {editingFaculty ? 'تعديل عضو الكادر' : 'إضافة عضو كادر جديد'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name" className="font-cairo">اسم المدرّس</Label>
                <Input
                  id="name"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                  className="font-cairo"
                  placeholder="مثال: أحمد محمود"
                />
              </div>
              <div>
                <Label htmlFor="position" className="font-cairo">الوظيفة</Label>
                <Input
                  id="position"
                  value={newFaculty.position}
                  onChange={(e) => setNewFaculty({...newFaculty, position: e.target.value})}
                  className="font-cairo"
                  placeholder="مثال: مدرس رياضيات"
                />
              </div>
              <Button 
                onClick={editingFaculty ? handleUpdateFaculty : handleAddFaculty}
                className="bg-primary hover:bg-primary/90 font-cairo"
              >
                {editingFaculty ? 'تحديث البيانات' : 'إضافة العضو'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في الكادر التدريسي..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 bg-secondary/50 border-border font-cairo"
          />
        </div>
      </div>

      {/* Faculty Table */}
      <Card className="glass-effect border-border">
        <CardHeader>
          <CardTitle className="font-cairo">قائمة الكادر التدريسي</CardTitle>
        </CardHeader>
        <CardContent>
          {faculty.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-cairo text-lg">لا يوجد كادر تدريسي مسجل</p>
              <p className="text-muted-foreground font-cairo text-sm">ابدأ بإضافة أعضاء الكادر التدريسي</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-cairo">اسم المدرّس</TableHead>
                  <TableHead className="font-cairo">الوظيفة</TableHead>
                  <TableHead className="font-cairo">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-cairo">{member.name}</TableCell>
                    <TableCell className="font-cairo">{member.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEditFaculty(member)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteFaculty(member.id)}
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

export default FacultyManagement;
