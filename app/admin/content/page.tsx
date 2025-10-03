'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

interface CarouselItem {
  id: number
  title: string
  subtitle: string
  cta_text: string
  cta_link: string
  image_url: string
  is_active: boolean
  order_position: number
  created_at: string
  updated_at: string
}

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  isPublished: boolean
  publishDate: string
  createdAt: string
  updatedAt: string
}

interface Preinscription {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  niveau: string
  domaine: string
  statut: string
  created_at: string
}

interface ContentData {
  carousel_items: CarouselItem[]
  recent_news: NewsArticle[]
  newsletter_data: {
    total_subscribers: number
    active_subscribers: number
    unsubscribed: number
    recent_campaigns: Array<{
      id: number
      subject: string
      sent_at: string
      recipients: number
      open_rate: number
      click_rate: number
    }>
  }
  preinscriptions_summary: {
    total_preinscriptions: number
    pending_review: number
    approved: number
    rejected: number
    recent_preinscriptions: Preinscription[]
  }
}

export default function ContentPage() {
  const router = useRouter()
  const [data, setData] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('carousel')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{show: boolean, id: number, type: string}>({show: false, id: 0, type: ''})
  const [formData, setFormData] = useState<any>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/dashboard/content', {
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
        throw new Error('Erreur lors du chargement des données')
      }

      const result = await response.json()
      if (result.success) {
        setData(result.data)
        setError('')
      } else {
        setError(result.message || 'Erreur inconnue')
      }
    } catch (error) {
      console.error('Error fetching content:', error)
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  // Handle create new item
  const handleCreate = (type: string) => {
    setEditingItem(null)
    // Initialize form data based on type
    if (type === 'carousel') {
      setFormData({
        title: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        isActive: true,
        order: 0
      })
    } else if (type === 'news') {
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        isPublished: false,
        readTime: '3 min'
      })
    }
    setShowCreateModal(true)
  }

  // Handle edit item
  const handleEdit = (item: any, type: string) => {
    setEditingItem({...item, type})
    setFormData({...item})
    setShowEditModal(true)
  }

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const token = localStorage.getItem('admin_token')
      const isEditing = !!editingItem
      const type = editingItem?.type || (showCreateModal ? (formData.category !== undefined ? 'news' : 'carousel') : '')
      
      let endpoint = ''
      let method = 'POST'
      
      if (isEditing) {
        method = 'PATCH'
        endpoint = type === 'carousel' 
          ? `/api/carousel/${editingItem.id}`
          : `/api/news/${editingItem.id}`
      } else {
        endpoint = type === 'carousel' 
          ? '/api/carousel'
          : '/api/news'
      }

      let body: string | FormData
      let headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`
      }

      // Handle carousel with file upload
      if (type === 'carousel') {
        const formDataToSend = new FormData()
        formDataToSend.append('title', formData.title || '')
        formDataToSend.append('description', formData.description || formData.subtitle || '')
        formDataToSend.append('buttonText', formData.buttonText || formData.cta_text || '')
        formDataToSend.append('buttonLink', formData.buttonLink || formData.cta_link || '')
        
        // Convert boolean properly
        const isActiveValue = formData.isActive !== undefined ? formData.isActive : (formData.is_active !== undefined ? formData.is_active : true)
        formDataToSend.append('isActive', String(isActiveValue))
        
        // Convert order properly
        const orderValue = formData.order !== undefined ? formData.order : (formData.order_position !== undefined ? formData.order_position : 0)
        formDataToSend.append('order', String(orderValue))
        
        // Add image file if selected
        if (formData.imageFile) {
          formDataToSend.append('image', formData.imageFile)
        }
        
        body = formDataToSend
        // Don't set Content-Type for FormData, let browser set it with boundary
      } else {
        // Handle news with JSON
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(formData)
      }

      const response = await fetch(endpoint, {
        method,
        headers,
        body
      })

      if (response.ok) {
        // Refresh data and close modal
        await fetchContent()
        setShowCreateModal(false)
        setShowEditModal(false)
        setEditingItem(null)
        setFormData({})
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Form submit error:', error)
      setError(error instanceof Error ? error.message : 'Erreur lors de la sauvegarde')
    } finally {
      setSubmitting(false)
    }
  }

  // Handle delete confirmation
  const handleDeleteConfirm = (id: number, type: string) => {
    setDeleteConfirm({show: true, id, type})
  }

  // Handle actual delete
  const handleDelete = async () => {
    if (!deleteConfirm.id || !deleteConfirm.type) return
    
    try {
      const token = localStorage.getItem('admin_token')
      let endpoint = ''
      
      switch(deleteConfirm.type) {
        case 'carousel':
          endpoint = `/api/carousel/${deleteConfirm.id}`
          break
        case 'news':
          endpoint = `/api/news/${deleteConfirm.id}`
          break
        default:
          throw new Error('Type non supporté')
      }

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        // Refresh data after successful delete
        await fetchContent()
        setDeleteConfirm({show: false, id: 0, type: ''})
      } else {
        throw new Error('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Delete error:', error)
      setError('Erreur lors de la suppression')
    }
  }

  // Handle newsletter campaign creation
  const handleCreateCampaign = () => {
    // For now, just show an alert. You can implement a full modal later
    alert('Fonctionnalité de création de campagne à venir!')
  }

  // Handle preinscription status change
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      
      const response = await fetch(`/api/preinscriptions/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statut: newStatus })
      })

      if (response.ok) {
        // Refresh data after successful update
        await fetchContent()
      } else {
        throw new Error('Erreur lors de la mise à jour du statut')
      }
    } catch (error) {
      console.error('Status update error:', error)
      setError('Erreur lors de la mise à jour du statut')
    }
  }

  // Handle view preinscription details
  const handleViewDetails = (preinscription: any) => {
    alert(`Détails de la pré-inscription:\n\nNom: ${preinscription.prenom} ${preinscription.nom}\nEmail: ${preinscription.email}\nTéléphone: ${preinscription.telephone}\nDomaine: ${preinscription.domaine}\nNiveau: ${preinscription.niveau}\nStatut: ${preinscription.statut}`)
  }

  // Common input styles
  const inputStyles = "w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  const textareaStyles = "w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

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

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="flex space-x-1 border-b">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-t w-32"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg border p-6 h-32"></div>
              ))}
            </div>
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
              onClick={() => fetchContent()}
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion du contenu</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez le carrousel, les actualités, la newsletter et les pré-inscriptions
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'carousel', name: 'Carrousel', count: data?.carousel_items.length },
              { id: 'news', name: 'Actualités', count: data?.recent_news.length },
              { id: 'newsletter', name: 'Newsletter', count: data?.newsletter_data.total_subscribers }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                {tab.name}
                {tab.count !== undefined && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {data && (
          <div className="space-y-6">
            {/* Carousel Tab */}
            {activeTab === 'carousel' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Items du carrousel</h2>
                  <button 
                    onClick={() => handleCreate('carousel')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ajouter un item
                  </button>
                </div>
                
                {data.carousel_items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg border p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.is_active ? 'Actif' : 'Inactif'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{item.subtitle}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>CTA: {item.cta_text}</span>
                          <span>Position: {item.order_position}</span>
                          <span>Mis à jour: {new Date(item.updated_at).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(item, 'carousel')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={() => handleDeleteConfirm(item.id, 'carousel')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* News Tab */}
            {activeTab === 'news' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Articles d'actualité</h2>
                  <button 
                    onClick={() => handleCreate('news')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Nouvel article
                  </button>
                </div>
                
                {data.recent_news.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg border p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            article.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {article.isPublished ? 'Publié' : 'Brouillon'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{article.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Catégorie: {article.category}</span>
                          {article.publishDate && (
                            <span>Publié: {new Date(article.publishDate).toLocaleDateString('fr-FR')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(article, 'news')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={() => handleDeleteConfirm(article.id, 'news')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Newsletter Tab */}
            {activeTab === 'newsletter' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="text-2xl font-bold text-gray-900">
                      {data.newsletter_data.total_subscribers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Total abonnés</div>
                  </div>
                  <div className="bg-white rounded-lg border p-6">
                    <div className="text-2xl font-bold text-green-600">
                      {data.newsletter_data.active_subscribers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Actifs</div>
                  </div>
                  <div className="bg-white rounded-lg border p-6">
                    <div className="text-2xl font-bold text-red-600">
                      {data.newsletter_data.unsubscribed.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Désabonnés</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Campagnes récentes</h2>
                    <button 
                      onClick={handleCreateCampaign}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Nouvelle campagne
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sujet</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destinataires</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taux d'ouverture</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taux de clic</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Envoyé le</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data.newsletter_data.recent_campaigns.map((campaign) => (
                          <tr key={campaign.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {campaign.subject}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {campaign.recipients.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {campaign.open_rate}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {campaign.click_rate}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(campaign.sent_at).toLocaleDateString('fr-FR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm({show: false, id: 0, type: ''})}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal Placeholder - You can implement these later */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Créer un nouvel élément
            </h3>
            <form onSubmit={handleFormSubmit}>
              {formData.category !== undefined ? (
                /* News Form */
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extrait
                    </label>
                    <textarea
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      className={textareaStyles}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu
                    </label>
                    <textarea
                      value={formData.content || ''}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className={textareaStyles}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isPublished || false}
                        onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                        className="mr-2"
                      />
                      Publié
                    </label>
                  </div>
                </>
              ) : (
                /* Carousel Form */
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className={textareaStyles}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Texte du bouton
                    </label>
                    <input
                      type="text"
                      value={formData.buttonText || ''}
                      onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lien du bouton
                    </label>
                    <input
                      type="text"
                      value={formData.buttonLink || ''}
                      onChange={(e) => setFormData({...formData, buttonLink: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ordre
                    </label>
                    <input
                      type="number"
                      value={formData.order || 0}
                      onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                      className={inputStyles}
                      min="0"
                    />
                  </div>
                   <div className="mb-4">
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Image
                     </label>
                     <input
                       type="file"
                       accept="image/*"
                       onChange={(e) => {
                         const file = e.target.files?.[0]
                         if (file) {
                           setFormData({...formData, imageFile: file})
                         }
                       }}
                       className={inputStyles}
                       required
                     />
                     {formData.imageFile && (
                       <p className="text-sm text-gray-500 mt-1">
                         Fichier sélectionné: {formData.imageFile.name}
                       </p>
                     )}
                   </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive || false}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="mr-2"
                      />
                      Actif
                    </label>
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {setShowCreateModal(false); setFormData({})}}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  disabled={submitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Création...' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Modifier l'élément
            </h3>
            <form onSubmit={handleFormSubmit}>
              {editingItem.type === 'news' ? (
                /* News Form */
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extrait
                    </label>
                    <textarea
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      className={textareaStyles}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu
                    </label>
                    <textarea
                      value={formData.content || ''}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className={textareaStyles}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isPublished || false}
                        onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                        className="mr-2"
                      />
                      Publié
                    </label>
                  </div>
                </>
              ) : (
                /* Carousel Form */
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.subtitle || formData.description || ''}
                      onChange={(e) => setFormData({...formData, subtitle: e.target.value, description: e.target.value})}
                      className={textareaStyles}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Texte du bouton
                    </label>
                    <input
                      type="text"
                      value={formData.cta_text || formData.buttonText || ''}
                      onChange={(e) => setFormData({...formData, cta_text: e.target.value, buttonText: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lien du bouton
                    </label>
                    <input
                      type="text"
                      value={formData.cta_link || formData.buttonLink || ''}
                      onChange={(e) => setFormData({...formData, cta_link: e.target.value, buttonLink: e.target.value})}
                      className={inputStyles}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ordre
                    </label>
                    <input
                      type="number"
                      value={formData.order_position || formData.order || 0}
                      onChange={(e) => setFormData({...formData, order_position: parseInt(e.target.value), order: parseInt(e.target.value)})}
                      className={inputStyles}
                      min="0"
                    />
                  </div>
                   <div className="mb-4">
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Image
                     </label>
                     <input
                       type="file"
                       accept="image/*"
                       onChange={(e) => {
                         const file = e.target.files?.[0]
                         if (file) {
                           setFormData({...formData, imageFile: file})
                         }
                       }}
                       className={inputStyles}
                     />
                     {formData.imageFile ? (
                       <p className="text-sm text-gray-500 mt-1">
                         Nouveau fichier: {formData.imageFile.name}
                       </p>
                     ) : (formData.image_url || formData.image) && (
                       <div className="mt-2">
                         <img 
                           src={formData.image_url || formData.image} 
                           alt="Current" 
                           className="w-20 h-20 object-cover rounded"
                         />
                         <p className="text-sm text-gray-500">Image actuelle</p>
                       </div>
                     )}
                   </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.is_active || formData.isActive || false}
                        onChange={(e) => setFormData({...formData, is_active: e.target.checked, isActive: e.target.checked})}
                        className="mr-2"
                      />
                      Actif
                    </label>
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {setShowEditModal(false); setEditingItem(null); setFormData({})}}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  disabled={submitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}