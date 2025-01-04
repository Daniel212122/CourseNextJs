import { UserProvider } from '@/app/login/ui/context/UserContext';
import AcmeLogo from '@/app/ui/acme-logo';
import { Metadata } from 'next';
import UpdateForm from '../../login/ui/components/updateForm';

// import { UserProvider } from './ui/context/UserContext';
export const metadata: Metadata = {
  title: 'Profile',
};

export default function LoginPage() {
  return (
    <UserProvider>
      <UpdateForm />
    </UserProvider>

  );
}