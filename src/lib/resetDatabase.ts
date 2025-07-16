
import { db, resetDatabaseCompletely } from './database';

// تنفيذ إعادة تعيين قاعدة البيانات بالكامل عند تحميل التطبيق
export const performDatabaseReset = async () => {
  try {
    console.log('بدء عملية إعادة تعيين قاعدة البيانات...');
    await resetDatabaseCompletely();
    console.log('تم إعادة تعيين قاعدة البيانات بنجاح - تم البدء من الصفر');
    return true;
  } catch (error) {
    console.error('خطأ في إعادة تعيين قاعدة البيانات:', error);
    return false;
  }
};

// تنفيذ الإعادة تعيين فوراً
performDatabaseReset();
