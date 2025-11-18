import AllReportsHematology from '@/features/pathology/hematology/all-reports'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute(
  '/_authenticated/pathology/hematology/reports/',
)({
  component: AllReportsHematology,
})

