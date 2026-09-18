import { Programs } from '@/models/programs'
import { SnapReportingSystems } from '@/models/snapReportingSystems'
import { NonMagiSubPrograms } from '@/models/nonMagiSubPrograms'
import { MagiSubPrograms } from '@/models/magiSubPrograms'
import React from 'react'
import { UseFormReturnType } from '@mantine/form/lib/types'
import { PostReview, Review } from '@/models/review'
import { Group, Radio } from '@mantine/core'
import { useReviewFormContext } from '@/components/reviewForm/context'

interface Props {
    readOnly?: boolean
}
const mapFields = (fields: string[]) =>
    fields.map((system, index) => ({
        label: system,
        value: String(index),
    }))
const config = (form: UseFormReturnType<Review | PostReview>) =>
    ({
        [Programs.SNAP]: {
            label: 'Reporting System',
            name: 'reportingSystem',
            inputProps: form.getInputProps('reportingSystem'),
            fields: () => mapFields(Object.keys(SnapReportingSystems)),
        },
        [Programs.MAGI]: {
            label: 'Medical Sub Program',
            name: 'magiSubProgram',
            inputProps: form.getInputProps('magiSubProgram'),
            fields: () => mapFields(Object.keys(MagiSubPrograms)),
        },
        [Programs.NON_MAGI]: {
            label: 'Medical Sub Program',
            name: 'nonMagiSubProgram',
            inputProps: form.getInputProps('nonMagiSubProgram'),
            fields: () => mapFields(Object.keys(NonMagiSubPrograms)),
        },
    }[form.values.program])

const RadioForPrograms = ({ readOnly }: Props) => {
    const form = useReviewFormContext()
    const { fields, inputProps, ...rest } = config(form)

    return (
        <Radio.Group
            withAsterisk
            {...inputProps}
            value={String(inputProps.value ?? 0)}
            onChange={value => inputProps.onChange(+value)}
            {...rest}
        >
            <Group mt={'xs'}>
                {fields().map(field => (
                    <Radio
                        readOnly={readOnly}
                        label={field.label}
                        value={field.value}
                        key={field.value}
                    />
                ))}
            </Group>
        </Radio.Group>
    )
}
export default RadioForPrograms
