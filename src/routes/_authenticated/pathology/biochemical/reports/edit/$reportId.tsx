import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/pathology/biochemical/reports/edit/$reportId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_authenticated/pathology/biochemical/reports/edit/$reportId"!
    </div>
  )
}
