// utils/translations.js

type Translations = {
  [language: string]: {
    [key: string]: string;
  };
};

const translations : Translations = {
  en: {
    loginTitle: 'Login to continue',
    loginSubtitle: 'Login with your registered Email ID & password to continue.',
    emailPlaceholder: 'Login with Email',
    passwordPlaceholder: 'Your Password',
    loginButton: 'Login',
    registerPrompt: "Don't have an account?",
    registerLink: 'Register',
    toggleJobSeeker: 'Job Seeker',
    toggleOrganization: 'Organization',
    errorMessage: 'Please fill in all fields.',
    successMessage: 'Login successful!',
    userNotRegistered: 'User not registered.',
    invalidCredentials: 'Invalid credentials.',
    serverError: 'An internal server error occurred.',
    connectionError: 'Unable to connect to the server.',
  },
  hi: {
    loginTitle: 'लॉग इन जारी रखें',
    loginSubtitle: 'जारी रखने के लिए अपना पंजीकृत ईमेल आईडी और पासवर्ड दर्ज करें।',
    emailPlaceholder: 'ईमेल के साथ लॉगिन करें',
    passwordPlaceholder: 'आपका पासवर्ड',
    loginButton: 'लॉग इन करें',
    registerPrompt: 'खाता नहीं है?',
    registerLink: 'पंजीकरण करें',
    toggleJobSeeker: 'नौकरी चाहने वाला',
    toggleOrganization: 'संगठन',
    errorMessage: 'कृपया सभी फ़ील्ड भरें।',
    successMessage: 'लॉग इन सफल!',
    userNotRegistered: 'उपयोगकर्ता पंजीकृत नहीं है।',
    invalidCredentials: 'अमान्य क्रेडेंशियल।',
    serverError: 'आंतरिक सर्वर त्रुटि हुई।',
    connectionError: 'सर्वर से कनेक्ट करने में असमर्थ।',
  },
  or: {
    loginTitle: 'ଲଗ ଇନ୍ ଜାରି ରଖନ୍ତୁ',
    loginSubtitle: 'ଆପଣଙ୍କ ପଞ୍ଜୀକୃତ ଇମେଲ୍ ID ଏବଂ ପାସୱାର୍ଡ୍ ଦ୍ୱାରା ଲଗଇନ୍ କରନ୍ତୁ।',
    emailPlaceholder: 'ଇମେଲ୍ ସହିତ ଲଗଇନ୍ କରନ୍ତୁ',
    passwordPlaceholder: 'ଆପଣଙ୍କ ପାସୱାର୍ଡ୍',
    loginButton: 'ଲଗଇନ୍',
    registerPrompt: 'ଖାତା ନାହିଁ?',
    registerLink: 'ପଞ୍ଜୀକରଣ କରନ୍ତୁ',
    toggleJobSeeker: 'ଜବ୍ ସିକର୍',
    toggleOrganization: 'ସଂଗଠନ',
    errorMessage: 'ଦୟାକରି ସମସ୍ତ ଫିଲ୍ଡ ଭରଣ କରନ୍ତୁ।',
    successMessage: 'ଲଗଇନ୍ ସଫଳ!',
    userNotRegistered: 'ବ୍ୟବହାରକାରୀ ପଞ୍ଜିକୃତ ନୁହେଁ।',
    invalidCredentials: 'ଅବୈଧ ପ୍ରମାଣପତ୍ର।',
    serverError: 'ଆନ୍ତର୍କାରୀ ସର୍ଭର ତ୍ରୁଟି ହୋଇଛି।',
    connectionError: 'ସର୍ଭର ସହିତ ସଂଯୋଗ କରିବାକୁ ଅସମର୍ଥ।',
  },
};

export default translations;
