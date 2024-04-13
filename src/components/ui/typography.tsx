import { cn } from "@/lib/utils"

type Props = {
    children: React.ReactNode,
    className?: string
}

export const H1 = ({ children, className }: Props) => (
    <h1 className={cn("scroll-m-20 mb-10 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
        {children}
    </h1>
)

export const H2 = ({ children, className }: Props) => (
    <h2 className={cn("scroll-m-20 mb-7 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0", className)}>
        {children}
    </h2>
)

export const H3 = ({ children, className }: Props) => (
    <h3 className={cn("scroll-m-20 mb-4 pb-2 text-2xl font-semibold tracking-tight", className)}>
        {children}
    </h3>
)

export const H4 = ({ children, className }: Props) => (
    <h4 className={cn("scroll-m-20 mb-2 pb-2 text-xl font-semibold tracking-tight", className)}>
        {children}
    </h4>
)