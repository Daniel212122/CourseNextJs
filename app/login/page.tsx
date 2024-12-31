import AcmeLogo from '@/app/ui/acme-logo';
// import LoginForm from '@/app/ui/login2';
import LoginForm from './ui/components/loginForm'
import { Metadata } from 'next';
import { UserProvider } from './ui/context/UserContext';
export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <UserProvider>
      <LoginForm />
    </UserProvider>

  );
}