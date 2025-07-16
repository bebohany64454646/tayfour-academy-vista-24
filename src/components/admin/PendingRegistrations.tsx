
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, User, Phone, GraduationCap } from 'lucide-react';
import { getPendingRegistrations, approveRegistration, rejectRegistration } from "@/lib/database";

interface PendingRegistration {
  id: number;
  username: string;
  student_number: string;
  full_name: string;
  grade: string;
  class_section: string;
  phone: string;
  parent_phone: string;
  status: string;
  created_at: string;
}

const PendingRegistrations = () => {
  const [requests, setRequests] = useState<PendingRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingRequests = async () => {
    try {
      const data = await getPendingRegistrations();
      // تحويل البيانات من Row[] إلى PendingRegistration[]
      const formattedData: PendingRegistration[] = data.map((row: any) => ({
        id: row.id as number,
        username: row.username as string,
        student_number: row.student_number as string,
        full_name: row.full_name as string,
        grade: row.grade as string,
        class_section: row.class_section as string,
        phone: row.phone as string,
        parent_phone: row.parent_phone as string,
        status: row.status as string,
        created_at: row.created_at as string
      }));
      setRequests(formattedData);
    } catch (error) {
      console.error('خطأ في جلب الطلبات المعلقة:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await approveRegistration(id);
      await fetchPendingRequests(); // إعادة تحميل البيانات
      console.log('تم قبول الطلب بنجاح');
    } catch (error) {
      console.error('خطأ في قبول الطلب:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectRegistration(id);
      await fetchPendingRequests(); // إعادة تحميل البيانات
      console.log('تم رفض الطلب بنجاح');
    } catch (error) {
      console.error('خطأ في رفض الطلب:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">⏳ طلبات التسجيل المعلقة</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">جاري تحميل الطلبات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">⏳ طلبات التسجيل المعلقة</h2>
        <Badge variant="secondary" className="text-sm">
          {requests.length} طلب معلق
        </Badge>
      </div>

      {requests.length === 0 ? (
        <Card className="glass-effect">
          <CardContent className="py-8 text-center">
            <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد طلبات معلقة</h3>
            <p className="text-muted-foreground">جميع طلبات التسجيل تم مراجعتها</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="glass-effect border-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-cairo">
                    <User className="inline h-5 w-5 ml-2" />
                    {request.full_name}
                  </CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    معلق
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-muted-foreground">📝 اسم المستخدم:</span>
                    <p className="text-foreground">{request.username}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">🎓 رقم الطالب:</span>
                    <p className="text-foreground">{request.student_number}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">📚 الصف:</span>
                    <p className="text-foreground">{request.grade}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">🏫 الشعبة:</span>
                    <p className="text-foreground">{request.class_section}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">📱 هاتف الطالب:</span>
                    <p className="text-foreground">{request.phone}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">👨‍👩‍👧‍👦 هاتف ولي الأمر:</span>
                    <p className="text-foreground">{request.parent_phone}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  >
                    <CheckCircle className="h-4 w-4 ml-2" />
                    ✅ قبول
                  </Button>
                  <Button
                    onClick={() => handleReject(request.id)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 ml-2" />
                    ❌ رفض
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRegistrations;
