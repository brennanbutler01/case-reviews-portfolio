import { Code, Footer as MantineFooter, rem } from '@mantine/core'

const Footer = () => {
    return (
        <MantineFooter
            height={50}
            p={'md'}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
            }}
        >
            <Code style={{ fontSize: rem(16) }}>
                Created for Clackamas County ODHS in 2023 by Brennan Butler
            </Code>
        </MantineFooter>
    )
}

export default Footer
