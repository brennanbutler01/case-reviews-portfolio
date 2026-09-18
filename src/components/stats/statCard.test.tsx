import { render, screen } from '@testing-library/react'
import StatCard from '@/components/stats/statCard'

describe('stat card', () => {
    it('should show title and integer stat', () => {
        render(<StatCard title={'test-title'} integerStat={'15%'} />)
        expect(screen.getByText('test-title')).toBeInTheDocument()
        expect(screen.getByText('15%')).toBeInTheDocument()
    })

    it('should show show percentage stat if we have it', () => {
        render(<StatCard title={'test-title'} integerStat={'10 mews'} />)
        expect(screen.getByText('test-title')).toBeInTheDocument()
        expect(screen.getByText('10 mews')).toBeInTheDocument()
    })
})
