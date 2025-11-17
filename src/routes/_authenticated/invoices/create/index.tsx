import CreateInvoice from '@/features/invoices/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/invoices/create/')({
  component: CreateInvoice,
})
