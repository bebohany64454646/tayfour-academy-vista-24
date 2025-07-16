import { createClient } from '@libsql/client';

export const db = createClient({
  url: 'libsql://taufor-yuseefvipadmin.aws-ap-northeast-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTI2NzI1NjYsImlkIjoiNjEwMmRkNWItMzg0Ni00Y2U2LWI2NzktNDVjZjUwOTM1NjYxIiwicmlkIjoiOWViZjA0MjQtNGQyMC00NjI3LTlmZjktOWE2ZWExNTAzNzQxIn0.1q-G3SHbl9pSoBYTpzzB1x8e2A5sCO6496ikq2O_kl8PQ74v1uMRpfSK3Ifil1Trbs4HSiqKUEiCaMXwpo5eAQ'
});

// إنشاء الجداول
export async function initializeDatabase() {
  try {
    // جدول المستخدمين
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('student', 'admin')),
        student_number TEXT,
        full_name TEXT,
        grade TEXT,
        class_section TEXT,
        phone TEXT,
        parent_phone TEXT,
        is_approved BOOLEAN DEFAULT false,
        remember_token TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // جدول الطلبات المعلقة
    await db.execute(`
      CREATE TABLE IF NOT EXISTS pending_registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        student_number TEXT,
        full_name TEXT,
        grade TEXT,
        class_section TEXT,
        phone TEXT,
        parent_phone TEXT,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // جدول الصفوف
    await db.execute(`
      CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        grade TEXT NOT NULL,
        section TEXT NOT NULL,
        capacity INTEGER DEFAULT 30,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // جدول المواد
    await db.execute(`
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT UNIQUE NOT NULL,
        grade TEXT NOT NULL,
        hours_per_week INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // جدول الجداول الدراسية
    await db.execute(`
      CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        teacher_id INTEGER,
        day_of_week TEXT NOT NULL CHECK (day_of_week IN ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday')),
        period INTEGER NOT NULL CHECK (period BETWEEN 1 AND 8),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (class_id) REFERENCES classes(id),
        FOREIGN KEY (subject_id) REFERENCES subjects(id),
        FOREIGN KEY (teacher_id) REFERENCES faculty(id)
      )
    `);

    // جدول الكادر التدريسي
    await db.execute(`
      CREATE TABLE IF NOT EXISTS faculty (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        specialization TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        hire_date DATE,
        status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // جدول الدورات
    await db.execute(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        subject_id INTEGER NOT NULL,
        teacher_id INTEGER NOT NULL,
        class_id INTEGER NOT NULL,
        start_date DATE,
        end_date DATE,
        status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (subject_id) REFERENCES subjects(id),
        FOREIGN KEY (teacher_id) REFERENCES faculty(id),
        FOREIGN KEY (class_id) REFERENCES classes(id)
      )
    `);

    // جدول الحضور والغياب
    await db.execute(`
      CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        course_id INTEGER NOT NULL,
        date DATE NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
      )
    `);

    // جدول العلامات الشفهية
    await db.execute(`
      CREATE TABLE IF NOT EXISTS oral_grades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        teacher_id INTEGER NOT NULL,
        grade REAL NOT NULL CHECK (grade >= 0 AND grade <= 100),
        date DATE NOT NULL,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (subject_id) REFERENCES subjects(id),
        FOREIGN KEY (teacher_id) REFERENCES faculty(id)
      )
    `);

    // جدول الملاحظات السلوكية
    await db.execute(`
      CREATE TABLE IF NOT EXISTS behavioral_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        teacher_id INTEGER NOT NULL,
        note_type TEXT NOT NULL CHECK (note_type IN ('positive', 'negative', 'neutral')),
        description TEXT NOT NULL,
        date DATE NOT NULL,
        severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (teacher_id) REFERENCES faculty(id)
      )
    `);

    console.log('تم إنشاء قاعدة البيانات بنجاح');
  } catch (error) {
    console.error('خطأ في إنشاء قاعدة البيانات:', error);
  }
}

// وظيفة شاملة لحذف جميع البيانات وإعادة تعيين المشرف
export async function resetDatabaseCompletely() {
  try {
    console.log('بدء عملية إعادة تعيين قاعدة البيانات بالكامل...');
    
    // حذف جميع البيانات بما في ذلك المشرف
    const tables = [
      'behavioral_notes',
      'oral_grades', 
      'attendance',
      'schedules',
      'courses',
      'faculty',
      'subjects',
      'classes',
      'pending_registrations',
      'users' // حذف جميع المستخدمين بما في ذلك المشرف
    ];

    for (const table of tables) {
      await db.execute(`DELETE FROM ${table}`);
      console.log(`تم حذف جميع البيانات من جدول ${table}`);
      
      // إعادة تعيين العداد التلقائي
      await db.execute(`DELETE FROM sqlite_sequence WHERE name='${table}'`);
      console.log(`تم إعادة تعيين العداد التلقائي لجدول ${table}`);
    }

    // إعادة إنشاء المشرف الافتراضي
    await db.execute(`
      INSERT INTO users (username, password, type, full_name, is_approved) 
      VALUES ('Yuseef.vipadmin', '000999.admintaifor', 'admin', 'يوسف المشرف', true)
    `);
    
    console.log('تم إعادة تعيين قاعدة البيانات بالكامل وإعادة إنشاء المشرف');
  } catch (error) {
    console.error('خطأ في إعادة تعيين قاعدة البيانات:', error);
    throw error;
  }
}

// وظائف حذف جميع البيانات
export async function deleteAllStudents() {
  try {
    await db.execute('DELETE FROM users WHERE type = "student"');
    console.log('تم حذف جميع الطلاب');
  } catch (error) {
    console.error('خطأ في حذف الطلاب:', error);
    throw error;
  }
}

export async function deleteAllPendingRegistrations() {
  try {
    await db.execute('DELETE FROM pending_registrations');
    console.log('تم حذف جميع طلبات التسجيل المعلقة');
  } catch (error) {
    console.error('خطأ في حذف طلبات التسجيل:', error);
    throw error;
  }
}

export async function deleteAllClasses() {
  try {
    await db.execute('DELETE FROM classes');
    console.log('تم حذف جميع الصفوف');
  } catch (error) {
    console.error('خطأ في حذف الصفوف:', error);
    throw error;
  }
}

export async function deleteAllSubjects() {
  try {
    await db.execute('DELETE FROM subjects');
    console.log('تم حذف جميع المواد');
  } catch (error) {
    console.error('خطأ في حذف المواد:', error);
    throw error;
  }
}

export async function deleteAllSchedules() {
  try {
    await db.execute('DELETE FROM schedules');
    console.log('تم حذف جميع الجداول الدراسية');
  } catch (error) {
    console.error('خطأ في حذف الجداول:', error);
    throw error;
  }
}

export async function deleteAllFaculty() {
  try {
    await db.execute('DELETE FROM faculty');
    console.log('تم حذف جميع الكادر التدريسي');
  } catch (error) {
    console.error('خطأ في حذف الكادر التدريسي:', error);
    throw error;
  }
}

export async function deleteAllCourses() {
  try {
    await db.execute('DELETE FROM courses');
    console.log('تم حذف جميع الدورات');
  } catch (error) {
    console.error('خطأ في حذف الدورات:', error);
    throw error;
  }
}

export async function deleteAllAttendance() {
  try {
    await db.execute('DELETE FROM attendance');
    console.log('تم حذف جميع سجلات الحضور والغياب');
  } catch (error) {
    console.error('خطأ في حذف سجلات الحضور:', error);
    throw error;
  }
}

export async function deleteAllOralGrades() {
  try {
    await db.execute('DELETE FROM oral_grades');
    console.log('تم حذف جميع العلامات الشفهية');
  } catch (error) {
    console.error('خطأ في حذف العلامات الشفهية:', error);
    throw error;
  }
}

export async function deleteAllBehavioralNotes() {
  try {
    await db.execute('DELETE FROM behavioral_notes');
    console.log('تم حذف جميع الملاحظات السلوكية');
  } catch (error) {
    console.error('خطأ في حذف الملاحظات السلوكية:', error);
    throw error;
  }
}

// وظيفة حذف جميع البيانات دفعة واحدة
export async function deleteAllData() {
  try {
    console.log('بدء عملية حذف جميع البيانات...');
    
    // حذف البيانات بالترتيب الصحيح لتجنب مشاكل المفاتيح الخارجية
    await deleteAllBehavioralNotes();
    await deleteAllOralGrades();
    await deleteAllAttendance();
    await deleteAllSchedules();
    await deleteAllCourses();
    await deleteAllFaculty();
    await deleteAllSubjects();
    await deleteAllClasses();
    await deleteAllPendingRegistrations();
    await deleteAllStudents();
    
    console.log('تم حذف جميع البيانات بنجاح');
  } catch (error) {
    console.error('خطأ في حذف جميع البيانات:', error);
    throw error;
  }
}

// وظائف للمستخدمين (بقاء الوظائف الموجودة)
export async function authenticateUser(username: string, password: string, type: 'student' | 'admin') {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE username = ? AND password = ? AND type = ? AND is_approved = true',
      args: [username, password, type]
    });
    return result.rows[0] || null;
  } catch (error) {
    console.error('خطأ في المصادقة:', error);
    return null;
  }
}

export async function saveRememberToken(username: string, token: string) {
  try {
    await db.execute({
      sql: 'UPDATE users SET remember_token = ? WHERE username = ?',
      args: [token, username]
    });
  } catch (error) {
    console.error('خطأ في حفظ رمز التذكر:', error);
  }
}

export async function getUserByRememberToken(token: string) {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE remember_token = ?',
      args: [token]
    });
    return result.rows[0] || null;
  } catch (error) {
    console.error('خطأ في استرجاع المستخدم:', error);
    return null;
  }
}

export async function createPendingRegistration(data: any) {
  try {
    await db.execute({
      sql: `INSERT INTO pending_registrations 
            (username, password, student_number, full_name, grade, class_section, phone, parent_phone) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [data.username, data.password, data.studentNumber, data.fullName, data.grade, data.classSection, data.phone, data.parentPhone]
    });
  } catch (error) {
    console.error('خطأ في إنشاء طلب التسجيل:', error);
    throw error;
  }
}

export async function getPendingRegistrations() {
  try {
    const result = await db.execute('SELECT * FROM pending_registrations WHERE status = "pending" ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('خطأ في استرجاع الطلبات المعلقة:', error);
    return [];
  }
}

export async function approveRegistration(id: number) {
  try {
    // الحصول على بيانات الطلب
    const request = await db.execute({
      sql: 'SELECT * FROM pending_registrations WHERE id = ?',
      args: [id]
    });
    
    if (request.rows[0]) {
      const data = request.rows[0];
      // إضافة المستخدم إلى جدول المستخدمين
      await db.execute({
        sql: `INSERT INTO users 
              (username, password, type, student_number, full_name, grade, class_section, phone, parent_phone, is_approved) 
              VALUES (?, ?, 'student', ?, ?, ?, ?, ?, ?, true)`,
        args: [data.username, data.password, data.student_number, data.full_name, data.grade, data.class_section, data.phone, data.parent_phone]
      });
      
      // تحديث حالة الطلب
      await db.execute({
        sql: 'UPDATE pending_registrations SET status = "approved" WHERE id = ?',
        args: [id]
      });
    }
  } catch (error) {
    console.error('خطأ في الموافقة على التسجيل:', error);
    throw error;
  }
}

export async function rejectRegistration(id: number) {
  try {
    await db.execute({
      sql: 'UPDATE pending_registrations SET status = "rejected" WHERE id = ?',
      args: [id]
    });
  } catch (error) {
    console.error('خطأ في رفض التسجيل:', error);
    throw error;
  }
}

// وظائف جديدة لإدارة البيانات في Turso
export async function getAllStudents() {
  try {
    const result = await db.execute('SELECT * FROM users WHERE type = "student" ORDER BY full_name');
    return result.rows;
  } catch (error) {
    console.error('خطأ في جلب الطلاب:', error);
    return [];
  }
}

export async function createStudent(data: any) {
  try {
    await db.execute({
      sql: `INSERT INTO users 
            (username, password, type, student_number, full_name, grade, class_section, phone, parent_phone, is_approved) 
            VALUES (?, ?, 'student', ?, ?, ?, ?, ?, ?, true)`,
      args: [data.username, data.password, data.studentNumber, data.fullName, data.grade, data.classSection, data.phone, data.parentPhone]
    });
  } catch (error) {
    console.error('خطأ في إنشاء الطالب:', error);
    throw error;
  }
}

export async function updateStudent(id: number, data: any) {
  try {
    await db.execute({
      sql: `UPDATE users SET 
            username = ?, student_number = ?, full_name = ?, grade = ?, 
            class_section = ?, phone = ?, parent_phone = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND type = 'student'`,
      args: [data.username, data.studentNumber, data.fullName, data.grade, data.classSection, data.phone, data.parentPhone, id]
    });
  } catch (error) {
    console.error('خطأ في تحديث الطالب:', error);
    throw error;
  }
}

export async function deleteStudent(id: number) {
  try {
    await db.execute({
      sql: 'DELETE FROM users WHERE id = ? AND type = "student"',
      args: [id]
    });
  } catch (error) {
    console.error('خطأ في حذف الطالب:', error);
    throw error;
  }
}
