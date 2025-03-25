import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ObjectId } from 'mongodb'

import mongodbConnect from '@/lib/mongodb-connect'
import { authOptions } from '@/lib/auth'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = params
  let client

  try {
    client = await mongodbConnect()
    if (!client) {
      return NextResponse.json({ error: 'Erro de conexão' }, { status: 500 })
    }

    const db = client.db('next1')
    const result = await db.collection('next-blog-messages')
      .deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Mensagem não encontrada' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Mensagem excluída com sucesso' })
  } catch (error) {
    console.error("Erro na API de exclusão:", error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  } finally {
    if (client) await client.close()
  }
}