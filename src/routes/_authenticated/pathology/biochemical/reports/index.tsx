import AllReportsBiochemical from '@/features/pathology/biochemical/all-reports'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/pathology/biochemical/reports/',
)({
  component: AllReportsBiochemical,
})

