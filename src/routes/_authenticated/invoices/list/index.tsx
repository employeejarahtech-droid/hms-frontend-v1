import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/invoices/list/')({
  component: ListOfInvoices,
})


function ListOfInvoices() {
  return (
    <div>ListOfInvoices</div>
  )
}