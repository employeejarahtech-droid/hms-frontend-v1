import DueCollection from '@/features/due-collection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/due-collection/')({
  component: DueCollection,
})

