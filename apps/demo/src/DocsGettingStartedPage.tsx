import { ArrowRight } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import type { AppPage } from './nav'
import { gettingStartedStacks } from './data/getting-started-stacks'
import { StackBrandIcon } from './components/StackBrandIcon'

type DocsGettingStartedPageProps = {
  onNavigate: (page: AppPage) => void
}

export function DocsGettingStartedPage({ onNavigate }: DocsGettingStartedPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="label-ink mb-2">Documentation</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Getting started
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
          Pick your web stack for a step-by-step setup guide. Every path installs{' '}
          <code className="font-mono text-xs">@menzies-mariesta-com/menzies-design-wash-ui</code>,
          imports the stylesheet, boots theme and brush behavior, and renders a first
          component.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {gettingStartedStacks.map((stack, index) => (
          <button
            key={stack.id}
            type="button"
            className={`wash-panel paper-grain soak-in cursor-pointer text-left transition-colors hover:border-primary/40 ${index % 4 === 1 ? 'soak-delay-2' : index % 4 === 2 ? 'soak-delay-3' : index % 4 === 3 ? 'soak-delay-4' : ''}`}
            onClick={() => onNavigate(stack.page)}
          >
            <div className="flex h-full flex-col p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-box ${stack.accentClass}`}
                >
                  <StackBrandIcon stackId={stack.id} className="size-6" />
                </div>
                <span
                  className={`badge badge-sm badge-soft ${stack.adapter === 'react' ? 'badge-info' : 'badge-ghost'}`}
                >
                  {stack.adapter === 'react' ? 'React adapter' : 'Core API'}
                </span>
              </div>
              <h2 className="font-display text-lg font-semibold">{stack.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {stack.description}
              </p>
              <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                Open guide
                <ArrowRight className="size-3.5" strokeWidth={2} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
