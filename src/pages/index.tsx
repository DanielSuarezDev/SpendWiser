import { Inter } from 'next/font/google'
import { MercadoLoad } from './mercado/Mercado.load'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <MercadoLoad />
  )
}
