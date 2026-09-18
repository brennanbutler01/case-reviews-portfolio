import { isPortfolioDemo } from '@/demo/mode'
import { isLocalDemo, isVisitorDemo } from '@/auth/useAppAuth'
import React from 'react'
import { Alert, Container, AppShell, useMantineTheme } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import Header from '@/components/layout/header'

interface Props {
    children: React.ReactNode
    pageTitle: string
}

const Layout = ({ children, pageTitle }: Props) => {
    const theme = useMantineTheme()
    useDocumentTitle(pageTitle + ' | ' + 'Tofu.Reviews')
    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            header={
                <Header
                    links={[
                        { link: '/reviews', label: 'Reviews' },
                        { link: '/staff', label: 'Staff' },
                        { link: '/stats', label: 'Stats' },
                    ]}
                />
            }
        >
            {(isPortfolioDemo || isLocalDemo || isVisitorDemo) && (
                <Container size='lg'>
                    <Alert role='status' color='yellow' mb='md'>
                        {isVisitorDemo
                            ? 'Live demo: invented records only. Data is saved to the demo server, expires after one hour, and is deleted when you reset the demo.'
                            : isPortfolioDemo
                            ? 'Portfolio demo. Invented records only. Changes stay in this tab and reset on refresh. Case data is not sent to a server.'
                            : 'Local demo: synthetic records only. Logout switches between Alice and Bob.'}
                    </Alert>
                </Container>
            )}
            {children}
        </AppShell>
    )
}
export default Layout
