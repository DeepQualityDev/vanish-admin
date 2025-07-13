
'use client'
import dynamic from 'next/dynamic';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const HomeLayout = dynamic(() => import('./homeLayout'), { ssr: false });

export default function App({ children }: {children: React.ReactNode}) {
  console.log("Home app Layout");
 return (    
    <div>
      <HomeLayout>
			<AppRouterCacheProvider options={{ key: 'css' }}>
				{children}
			</AppRouterCacheProvider>
      </HomeLayout>
    </div>
 );
}
