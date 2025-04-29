'use client';

import { useParams } from 'next/navigation';
import DetailsUser from '@/components/navBar/DetailsUser';
import CompanyProfile from '@/components/company/CompanyDeatailsPage';

export default function ClientPage() {
  const params = useParams();
  const id = params.id as string;
  const type = params.type as string;
console.log("params",params);
  return (
    <>
      {type === 'User' ? <DetailsUser id={id} /> : <CompanyProfile id={id} />}
    </>
  );
}
