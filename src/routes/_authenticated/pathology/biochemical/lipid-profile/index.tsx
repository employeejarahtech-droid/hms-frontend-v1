import LipidProfile from '@/features/pathology/biochemical/lipid-profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/pathology/biochemical/lipid-profile/',
)({
  component: LipidProfile,
})

