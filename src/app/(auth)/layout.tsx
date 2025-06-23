import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accedi a QCoach | Piattaforma Coaching Online',
  description: 'Accedi alla tua area riservata su QCoach per gestire sessioni di coaching, clienti e progressi.',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
          <div className="flex flex-col justify-center px-12 py-12 relative z-10">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                QCoach
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                La piattaforma che trasforma il tuo coaching
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Gestione Clienti</h3>
                  <p className="text-gray-400">Organizza e monitora il progresso di ogni cliente</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Calendario Integrato</h3>
                  <p className="text-gray-400">Pianifica e gestisci le tue sessioni di coaching</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Analytics Avanzate</h3>
                  <p className="text-gray-400">Analizza i risultati e ottimizza il tuo approccio</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full translate-y-48 -translate-x-48"></div>
        </div>

        {/* Right side - Auth form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mx-auto w-full max-w-md">
            {/* Mobile brand */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">QCoach</h1>
              <p className="text-gray-600 mt-2">Benvenuto nella tua piattaforma di coaching</p>
            </div>

            {children}

            {/* Footer links */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Continuando accetti i nostri{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                  Termini di Servizio
                </a>{' '}
                e{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
