import { useState, useEffect } from 'react'

// Custom hook for API data fetching with loading and error states
export function useApiData<T>(
  fetchFunction: () => Promise<T>,
  fallbackData: T,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T>(fallbackData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        console.error('API fetch error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
        setData(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error }
}

// Custom hook for form submission with loading and status management
export function useFormSubmission<T>() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const submitForm = async (
    submitFunction: (data: T) => Promise<any>,
    formData: T,
    onSuccess?: () => void
  ) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      await submitFunction(formData)
      setSubmitStatus('success')
      onSuccess?.()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue. Veuillez réessayer.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetStatus = () => {
    setSubmitStatus('idle')
    setErrorMessage('')
  }

  return {
    isSubmitting,
    submitStatus,
    errorMessage,
    submitForm,
    resetStatus
  }
}