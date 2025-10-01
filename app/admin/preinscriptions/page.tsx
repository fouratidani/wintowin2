'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

interface Preinscription {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  niveau_etude: string
  domaine_formation: string
  statut: string
  created_at: string
}

export default function PreinscriptionsPage() {
  const router = useRouter()
  const [preinscriptions, setPreinscriptions] = useState<Preinscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [filter, setFilter] = useState('all') // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('')
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set())
  const [selectedPreinscription, setSelectedPreinscription] = useState<Preinscription | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchPreinscriptions()
  }, [filter])

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        closeModal()
      }
    }

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  const fetchPreinscriptions = async () => {
    try {
      setLoading(true)
      setError('') // Clear any existing errors
      setSuccessMessage('') // Clear any existing success messages
      
      const token = localStorage.getItem('admin_token')
      
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/admin/preinscriptions', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('admin_token')
          router.push('/admin/login')
          return
        }
        throw new Error('Erreur lors du chargement des pré-inscriptions')
      }

      const result = await response.json()
      if (result.success) {
        setPreinscriptions(result.data.preinscriptions || [])
        setError('')
      } else {
        setError(result.message || 'Erreur inconnue')
      }
    } catch (error) {
      console.error('Error fetching preinscriptions:', error)
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_attente':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">En attente</span>
      case 'approuve':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Approuvé</span>
      case 'rejete':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejeté</span>
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      // Add to updating set
      setUpdatingIds(prev => new Set(prev).add(id))
      setError('') // Clear any previous errors
      
      const token = localStorage.getItem('admin_token')
      
      if (!token) {
        router.push('/admin/login')
        return
      }
      
      const response = await fetch(`/api/admin/preinscriptions/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statut: newStatus })
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('admin_token')
          router.push('/admin/login')
          return
        }
        
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Erreur lors de la mise à jour du statut (${response.status})`)
      }

      const result = await response.json()
      if (result.success) {
        // Update local state and refresh data
        await fetchPreinscriptions()
        
        // Show success message
        const statusText = newStatus === 'approuve' ? 'approuvée' : 'rejetée'
        setSuccessMessage(`Pré-inscription ${statusText} avec succès`)
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        throw new Error(result.message || 'Erreur lors de la mise à jour du statut')
      }
    } catch (error) {
      console.error('Status update error:', error)
      setError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour du statut')
    } finally {
      // Remove from updating set
      setUpdatingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handleViewPreinscription = (preinscription: Preinscription) => {
    setSelectedPreinscription(preinscription)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPreinscription(null)
  }

  const filteredPreinscriptions = (preinscriptions || []).filter(p => {
    const matchesFilter = filter === 'all' || p.statut === filter
    const matchesSearch = searchTerm === '' || 
      p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.domaine_formation.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: (preinscriptions || []).length,
    pending: (preinscriptions || []).filter(p => p.statut === 'en_attente').length,
    approved: (preinscriptions || []).filter(p => p.statut === 'approuve').length,
    rejected: (preinscriptions || []).filter(p => p.statut === 'rejete').length
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg border p-6 h-24"></div>
              ))}
            </div>
            <div className="bg-white rounded-lg border p-6 h-96"></div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-medium mb-2">
              Erreur de chargement
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={() => fetchPreinscriptions()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des pré-inscriptions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez et suivez toutes les demandes de pré-inscription
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-700 font-medium">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-red-700 font-medium">{error}</span>
              <button 
                onClick={() => setError('')}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-500">En attente</div>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-500">Approuvées</div>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-500">Rejetées</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex space-x-3">
                {[
                  { key: 'all', label: 'Tous', count: stats.total },
                  { key: 'en_attente', label: 'En attente', count: stats.pending },
                  { key: 'approuve', label: 'Approuvés', count: stats.approved },
                  { key: 'rejete', label: 'Rejetés', count: stats.rejected }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setFilter(item.key)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      filter === item.key
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {item.label} ({item.count})
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher par nom, email ou formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidat
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Formation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPreinscriptions.map((preinscription) => (
                  <tr key={preinscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {preinscription.prenom} {preinscription.nom}
                      </div>
                      <div className="text-sm text-gray-500">
                        {preinscription.niveau_etude}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{preinscription.email}</div>
                      <div className="text-sm text-gray-500">{preinscription.telephone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{preinscription.domaine_formation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(preinscription.statut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(preinscription.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewPreinscription(preinscription)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Voir
                        </button>
                        {preinscription.statut === 'en_attente' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(preinscription.id, 'approuve')}
                              disabled={updatingIds.has(preinscription.id)}
                              className={`text-green-600 hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed ${
                                updatingIds.has(preinscription.id) ? 'opacity-50' : ''
                              }`}
                            >
                              {updatingIds.has(preinscription.id) ? 'En cours...' : 'Approuver'}
                            </button>
                            <button 
                              onClick={() => handleStatusChange(preinscription.id, 'rejete')}
                              disabled={updatingIds.has(preinscription.id)}
                              className={`text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed ${
                                updatingIds.has(preinscription.id) ? 'opacity-50' : ''
                              }`}
                            >
                              {updatingIds.has(preinscription.id) ? 'En cours...' : 'Rejeter'}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPreinscriptions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchTerm ? 'Aucune pré-inscription ne correspond à votre recherche' : 'Aucune pré-inscription trouvée'}
              </div>
            </div>
          )}
        </div>

        {/* Modal for viewing preinscription details */}
        {showModal && selectedPreinscription && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Détails de la pré-inscription
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
                      Informations personnelles
                    </h4>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Prénom</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPreinscription.prenom}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Nom</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPreinscription.nom}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPreinscription.email}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Téléphone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPreinscription.telephone}</p>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
                      Informations académiques
                    </h4>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Niveau d'étude</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPreinscription.niveau_etude}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Domaine de formation</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPreinscription.domaine_formation}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Statut</label>
                      <div className="mt-1">
                        {getStatusBadge(selectedPreinscription.statut)}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Date de soumission</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedPreinscription.created_at).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons in modal */}
                {selectedPreinscription.statut === 'en_attente' && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Actions</h4>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          handleStatusChange(selectedPreinscription.id, 'approuve')
                          closeModal()
                        }}
                        disabled={updatingIds.has(selectedPreinscription.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {updatingIds.has(selectedPreinscription.id) ? 'En cours...' : 'Approuver'}
                      </button>
                      
                      <button
                        onClick={() => {
                          handleStatusChange(selectedPreinscription.id, 'rejete')
                          closeModal()
                        }}
                        disabled={updatingIds.has(selectedPreinscription.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {updatingIds.has(selectedPreinscription.id) ? 'En cours...' : 'Rejeter'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}