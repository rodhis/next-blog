'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import styles from '@/styles/delete-account.module.css'

export default function DeleteAccount() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm('Tem certeza que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita!')
        
        if (!confirmation) return

        setIsLoading(true)
        setMessage(null)

        try {
            const response = await fetch('/api/delete-account', {
                method: 'DELETE'
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Falha ao excluir conta')
            }

            setMessage({ type: 'success', text: data.message })
            setTimeout(() => signOut({ callbackUrl: '/' }), 2000)
        } catch (error) {
            console.error('Erro ao excluir conta:', error)
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Falha ao excluir conta'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.form}>
            <h2>Excluir Conta</h2>
            
            <div className={styles.control}>
                <p className={styles.warningText}>
                    Aviso: Esta ação removerá permanentemente sua conta e todos os dados associados.
                </p>
            </div>

            {message && (
                <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                    {message.text}
                </div>
            )}

            <div className={styles.action}>
                <button 
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className={styles.destructiveButton}
                >
                    {isLoading ? 'Excluindo...' : 'Excluir Conta Permanentemente'}
                </button>
            </div>
        </div>
    )
}