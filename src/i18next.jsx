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
      Profile: 'Profile,'

      
   
    }
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
      Profile : 'الصفحة الشخصية',
   
    }
  }

}
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