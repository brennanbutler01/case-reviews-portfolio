import { render, screen } from '@testing-library/react'
import ReviewForm from '@/components/reviewForm/index'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

vi.mock('use-resize-observer', () => {
    return vi.importActual('use-resize-observer/polyfilled')
})
describe('ReviewForm', () => {
    it('should render a form', () => {
        render(<ReviewForm />)
        expect(screen.getByRole('form')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Create' }),
        ).toBeInTheDocument()
    })

    it('should have all of our inputs', () => {
        render(<ReviewForm />)
        expect(
            screen.getByRole('searchbox', { name: 'Reviewed Program' }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('searchbox', { name: 'Staff Reviewed' }),
        ).toBeInTheDocument()
        expect(screen.getByPlaceholderText('4018009901')).toBeInTheDocument()
        expect(
            screen.getByRole('checkbox', { name: 'Is Targeted' }),
        ).toBeInTheDocument()
        // we should have reporting system because we are doing SNAP by default currently
        expect(screen.getByRole('radio', { name: 'SRS' })).toBeInTheDocument()
        expect(
            screen.getByRole('textbox', { name: 'Comments' }),
        ).toBeInTheDocument()
        expect(
            screen.getByLabelText('Select review elements'),
        ).toBeInTheDocument()
    })

    it('should start with an alert to select review elements', () => {
        render(<ReviewForm />)
        expect(screen.getByText('Add Review Elements')).toBeInTheDocument()
        expect(
            screen.getByText('Select at least one element to review.'),
        ).toBeInTheDocument()
    })

    it('changing the selected program should get rid of reporting sytstems and change to magi or non magi sub programs or nothing at all', async () => {
        const user = await userEvent.setup()
        render(<ReviewForm />)

        //since we start w/ snap we should see our reporting system here
        expect(screen.getByRole('radio', { name: 'SRS' })).toBeInTheDocument()

        await user.click(screen.getByLabelText('Reviewed Program'))
        await user.click(screen.getByRole('option', { name: 'ERDC' }))

        expect(
            screen.queryByLabelText('Reporting System'),
        ).not.toBeInTheDocument()

        await user.click(screen.getByLabelText('Reviewed Program'))
        await user.click(screen.getByRole('option', { name: 'TANF' }))

        expect(
            screen.queryByLabelText('Reporting System'),
        ).not.toBeInTheDocument()

        await user.click(screen.getByLabelText('Reviewed Program'))
        await user.click(screen.getByRole('option', { name: 'NON_MAGI' }))

        expect(screen.getByRole('radio', { name: 'OSIPM' })).toBeInTheDocument()

        await user.click(screen.getByLabelText('Reviewed Program'))
        await user.click(screen.getByRole('option', { name: 'MAGI' }))

        expect(screen.getByRole('radio', { name: 'OHP' })).toBeInTheDocument()

        await expect(
            screen.getByText('Review Magi Eligibles'),
        ).toBeInTheDocument()
    })

    it('should let us select and add review elements', async () => {
        const user = userEvent.setup()
        render(<ReviewForm />)
        await user.click(screen.getByRole('button', { name: 'Select All' }))
    })

    it('should allow us to render magi eligibles if we are on magi', async () => {
        const user = userEvent.setup()
        render(<ReviewForm />)
        await user.click(screen.getByLabelText('Reviewed Program'))
        await user.click(screen.getByRole('option', { name: 'MAGI' }))
        expect(
            screen.getByRole('button', { name: 'Eligibles' }),
        ).toBeInTheDocument()
        await user.click(screen.getByRole('button', { name: 'Eligibles' }))

        await expect(
            screen.getByLabelText('Adults Eligible Coded'),
        ).toBeInTheDocument()
        await expect(
            screen.getByLabelText('Adults Eligible Actual'),
        ).toBeInTheDocument()
        await expect(
            screen.getByLabelText('Adults Not Eligible Coded'),
        ).toBeInTheDocument()
        await expect(
            screen.getByLabelText('Adults Not Eligible Actual'),
        ).toBeInTheDocument()
        await expect(
            screen.getByLabelText('Children Eligible Coded'),
        ).toBeInTheDocument()
        await expect(
            screen.getByLabelText('Children Eligible Actual'),
        ).toBeInTheDocument()
        await expect(
            screen.getByLabelText('Children Not Eligible Coded'),
        ).toBeInTheDocument()
        await expect(
            screen.getByLabelText('Children Not Eligible Actual'),
        ).toBeInTheDocument()
        await expect(
            screen.getByRole('alert', { name: 'Review Magi Eligibles' }),
        ).toBeInTheDocument()
        await user.type(
            screen.getByLabelText('Adults Not Eligible Actual'),
            '1',
        )

        await expect(
            screen.queryByRole('alert', { name: 'Review Magi Eligbles' }),
        ).not.toBeInTheDocument()
    })

    it('should handle the addition and removal of review elements properly', async () => {
        const user = userEvent.setup()
        render(<ReviewForm />)
        expect(
            screen.getByRole('alert', { name: 'Add Review Elements' }),
        ).toBeInTheDocument()
        await user.click(
            screen.getByRole('button', { name: 'HOUSEHOLD_COMPOSITION' }),
        )
        expect(
            screen.queryByRole('alert', { name: 'Add Review Elements' }),
        ).not.toBeInTheDocument()
        expect(
            screen.getByRole('button', {
                name: 'HOUSEHOLD_COMPOSITION Incomplete',
            }),
        )
        await user.click(
            screen.getAllByRole('button', { name: 'HOUSEHOLD_COMPOSITION' })[0],
        )
        expect(
            screen.queryByRole('alert', { name: 'Add Review Elements' }),
        ).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'All' }))

        await expect(
            screen.getByRole('button', {
                name: 'HOUSEHOLD_COMPOSITION Incomplete',
            }),
        ).toBeInTheDocument()
        await expect(
            screen.getByRole('button', { name: 'EARNED_INCOME Incomplete' }),
        ).toBeInTheDocument()
        await expect(
            screen.getByRole('button', { name: 'STUDENT_STATUS Incomplete' }),
        ).toBeInTheDocument()
        await expect(
            screen.getByRole('button', { name: 'SELF_EMPLOYMENT Incomplete' }),
        ).toBeInTheDocument()
        await expect(
            screen.getByRole('button', { name: 'UTILITIES Incomplete' }),
        ).toBeInTheDocument()
        await expect(
            screen.getByRole('button', { name: 'CASE_NOTE Incomplete' }),
        ).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'CASE_NOTE' }))
        expect(
            screen.queryByRole('button', {
                name: 'HOUSEHOLD_COMPOSITION Incomplete',
            }),
        ).not.toBeInTheDocument()
    })
})
