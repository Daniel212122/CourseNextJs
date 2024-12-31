import { UserProvider } from '@/app/login/ui/context/UserContext';
import AcmeLogo from '@/app/ui/acme-logo';
// import LoginForm from '@/app/ui/login2';
// import LoginForm from './ui/components/loginForm'
import { Metadata } from 'next';
import UpdateForm from './ui/components/updateForm';

// import { UserProvider } from './ui/context/UserContext';
export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <UserProvider>
      <UpdateForm />
    </UserProvider>

  );
}