import BloodForTcdc from '@/features/pathology/hematology/blood-for-tcdc'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/pathology/hematology/blood-for-tcdc/',
)({
  component: BloodForTcdc,
})

