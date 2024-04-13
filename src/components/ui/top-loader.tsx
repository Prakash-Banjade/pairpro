'use client'

import { useTheme } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'

type Props = {}

export default function TopLoadingBar({ }: Props) {
    const { themes } = useTheme();
    console.log('theme: ', themes)
    return (
        <NextTopLoader color="#1E90FF" />
    )
}