import { ArrowLeft } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { Alert, WashPanel } from '@menzies-mariesta-com/menzies-design-wash-ui'
import type { AppPage } from './nav'
import type { GettingStartedStack } from './data/getting-started-stacks'
import { StackBrandIcon } from './components/StackBrandIcon'

function GuideCode({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-box border border-ink-border bg-base-200/80 p-4 font-mono text-xs leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}

type DocsStackGuidePageProps = {
  stack: GettingStartedStack
  onNavigate: (page: AppPage) => void
}

export function DocsStackGuidePage({ stack, onNavigate }: DocsStackGuidePageProps) {
  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          className="btn btn-ghost btn-sm mb-4 cursor-pointer gap-1 px-2"
          onClick={() => onNavigate('docs-start')}
        >
          <ArrowLeft className="size-4" strokeWidth={2} />
          All stacks
        </button>

        <div className="flex flex-wrap items-start gap-4">
          <div
            className={`flex size-14 items-center justify-center rounded-box ${stack.accentClass}`}
          >
            <StackBrandIcon stackId={stack.id} className="size-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="label-ink mb-1">Getting started</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              {stack.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
              {stack.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`badge badge-sm badge-soft ${stack.adapter === 'react' ? 'badge-info' : 'badge-ghost'}`}
              >
                {stack.adapter === 'react' ? 'React adapter' : 'Core API'}
              </span>
              <span className="badge badge-sm badge-soft badge-primary">6 steps</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {stack.steps.map((step, index) => (
          <WashPanel key={step.title} className="overflow-hidden">
            <div className="border-b border-ink-border/70 px-5 py-4">
              <p className="label-ink mb-1">Step {index + 1}</p>
              <h2 className="font-display text-xl font-semibold">{step.title}</h2>
              {step.body ? (
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              ) : null}
            </div>
            {step.code ? (
              <div className="p-5">
                <GuideCode>{step.code}</GuideCode>
              </div>
            ) : null}
          </WashPanel>
        ))}
      </div>

      {stack.notes?.length ? (
        <Alert tone="info" soft>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {stack.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Alert>
      ) : null}
    </div>
  )
}
