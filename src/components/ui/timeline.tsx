import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

// Horizontal timeline component
// A linear representation of a sequence of events over time.
// The events are displayed as points on a horizontal line, with optional labels and descriptions.

const timelineVariants = cva('relative flex items-center', {
    variants: {
        variant: {
            default: 'gap-0',
            spaced: 'gap-4',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const timelineItemVariants = cva('relative flex flex-col items-center', {
    variants: {
        variant: {
            default: 'min-w-[120px]',
            compact: 'min-w-[100px]',
            expanded: 'min-w-[160px]',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const timelineDotVariants = cva(
    'z-10 flex items-center justify-center rounded-full border-2 bg-white transition-all duration-200',
    {
        variants: {
            variant: {
                default: 'h-3 w-3 border-mhfd-dark-blue',
                active: 'h-4 w-4 border-mhfd-yellow bg-mhfd-yellow',
                completed: 'h-3 w-3 border-deep-green bg-deep-green',
                pending: 'h-3 w-3 border-gray-300 bg-gray-100',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const timelineLineVariants = cva('absolute h-0.5 top-1/2 -translate-y-1/2', {
    variants: {
        variant: {
            default: 'bg-mhfd-dark-blue',
            completed: 'bg-deep-green',
            pending: 'bg-gray-300',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export type TimelineProps = HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof timelineVariants>;

export type TimelineItemProps = HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof timelineItemVariants> & {
    date?: string;
    label: string;
    dotVariant?: VariantProps<typeof timelineDotVariants>['variant'];
    isLast?: boolean;
    lineVariant?: VariantProps<typeof timelineLineVariants>['variant'];
}

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
    ({ className, variant, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(timelineVariants({ variant }), className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Timeline.displayName = 'Timeline';

const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
    (
        {
            className,
            variant,
            date,
            label,
            dotVariant = 'default',
            isLast = false,
            lineVariant = 'default',
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(timelineItemVariants({ variant }), 'shrink-0', className)}
                {...props}
            >
                {/* Date label above */}
                {date && (
                    <div className="mb-2 text-xs font-semibold text-mhfd-dark-blue whitespace-nowrap">
                        {date}
                    </div>
                )}

                {/* Dot and line container */}
                <div className="relative flex items-center w-full">
                    {/* Connecting line (before dot) */}
                    {!isLast && (
                        <div
                            className={cn(
                                timelineLineVariants({ variant: lineVariant }),
                                'left-1/2 w-full'
                            )}
                        />
                    )}

                    {/* Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <div className={cn(timelineDotVariants({ variant: dotVariant }))} />
                    </div>
                </div>

                {/* Event label below */}
                <div className="mt-2 text-xs text-center text-gray-700 max-w-[140px] leading-tight">
                    {label}
                </div>
            </div>
        );
    }
);
TimelineItem.displayName = 'TimelineItem';

export { Timeline, TimelineItem, timelineVariants, timelineItemVariants, timelineDotVariants };