import '@/css/reservation.css'
import ReservationContent from '@/components/ReservationContent'
import Layout from '@/components/layout/Layout'
import Script from 'next/script'
import { getListSpa } from '@/api/common'

export default async function ReservationPage() {
  const spaLocations = await getListSpa()

  return (
    <Layout spaLocations={spaLocations?.data || []}>
      <ReservationContent spaLocations={spaLocations?.data || []} />
      <Script src='/js/service.js' strategy='afterInteractive' />
    </Layout>
  )
}
