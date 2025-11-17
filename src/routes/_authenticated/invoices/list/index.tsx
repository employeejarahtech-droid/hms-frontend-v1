import ListOfInvoices from '@/features/invoices'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/invoices/list/')({
  component: ListOfInvoices,
})
