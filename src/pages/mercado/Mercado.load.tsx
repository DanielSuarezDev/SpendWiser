import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../Contexts/AuthContext';

import { Mercado } from './Mercado'

export const MercadoLoad = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  return (
    <Mercado />
  )
}
