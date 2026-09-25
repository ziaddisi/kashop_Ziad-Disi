import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      Home: 'Home',
      Products: 'Products',
      Categories: 'Categories',
      Cart: 'Cart',
      Login: 'Login',
      Register: 'Register',
      Logout: 'Logout',

      Welcome: 'Welcome to iPhone Store',
      FeaturedProducts: 'Featured Products',
      AllProducts: 'All Products',
      AllCategories: 'All Categories',

      ProductDetails: 'Product Details',
      ViewDetails: 'View Details',
      AddToCart: 'Add to Cart',
      Price: 'Price',
      Description: 'Description',
      Quantity: 'Quantity',

      Search: 'Search',
      SearchProducts: 'Search products',

      Email: 'Email',
      Password: 'Password',
      ConfirmPassword: 'Confirm Password',
      FirstName: 'First Name',
      LastName: 'Last Name',
      Phone: 'Phone',
      Address: 'Address',

      Submit: 'Submit',
      Cancel: 'Cancel',
      Save: 'Save',
      Update: 'Update',
      Delete: 'Delete',

      EmptyCart: 'Your cart is empty',
      Total: 'Total',
      Checkout: 'Checkout',
      ContinueShopping: 'Continue Shopping',

      Loading: 'Loading...',
      Error: 'Something went wrong',
      NoProducts: 'No products found',
      NoCategories: 'No categories found',

      LoginSuccess: 'Login successful',
      RegisterSuccess: 'Registration successful',
      LogoutSuccess: 'Logout successful',

      RequiredField: 'This field is required',
      InvalidEmail: 'Please enter a valid email',
      PasswordRequired: 'Password is required',
      PasswordNotMatch: 'Passwords do not match',
    },
  },

  ar: {
    translation: {
      Home: 'الرئيسية',
      Products: 'المنتجات',
      Categories: 'الأقسام',
      Cart: 'السلة',
      Login: 'تسجيل الدخول',
      Register: 'إنشاء حساب',
      Logout: 'تسجيل الخروج',

      Welcome: 'أهلًا بك في متجر الآيفون',
      FeaturedProducts: 'المنتجات المميزة',
      AllProducts: 'كل المنتجات',
      AllCategories: 'كل الأقسام',

      ProductDetails: 'تفاصيل المنتج',
      ViewDetails: 'عرض التفاصيل',
      AddToCart: 'أضف إلى السلة',
      Price: 'السعر',
      Description: 'الوصف',
      Quantity: 'الكمية',

      Search: 'بحث',
      SearchProducts: 'ابحث عن المنتجات',

      Email: 'البريد الإلكتروني',
      Password: 'كلمة المرور',
      ConfirmPassword: 'تأكيد كلمة المرور',
      FirstName: 'الاسم الأول',
      LastName: 'اسم العائلة',
      Phone: 'رقم الهاتف',
      Address: 'العنوان',

      Submit: 'إرسال',
      Cancel: 'إلغاء',
      Save: 'حفظ',
      Update: 'تعديل',
      Delete: 'حذف',

      EmptyCart: 'السلة فارغة',
      Total: 'المجموع',
      Checkout: 'إتمام الشراء',
      ContinueShopping: 'متابعة التسوق',

      Loading: 'جارٍ التحميل...',
      Error: 'حدث خطأ ما',
      NoProducts: 'لا توجد منتجات',
      NoCategories: 'لا توجد أقسام',

      LoginSuccess: 'تم تسجيل الدخول بنجاح',
      RegisterSuccess: 'تم إنشاء الحساب بنجاح',
      LogoutSuccess: 'تم تسجيل الخروج بنجاح',

      RequiredField: 'هذا الحقل مطلوب',
      InvalidEmail: 'أدخل بريدًا إلكترونيًا صحيحًا',
      PasswordRequired: 'كلمة المرور مطلوبة',
      PasswordNotMatch: 'كلمتا المرور غير متطابقتين',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (language) => {
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
});

export default i18n;