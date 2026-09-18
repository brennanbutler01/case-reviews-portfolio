import Layout from '@/components/layout'
import Breadcrumbs from '@/components/breadcrumbs'
import {
    Alert,
    Button,
    Container,
    Flex,
    Group,
    Select,
    Stack,
    Tabs,
    Text,
    Title,
} from '@mantine/core'
import {
    IconBuilding,
    IconExclamationMark,
    IconGraph,
    IconUser,
} from '@tabler/icons-react'
import { Offices } from '@/models/offices'
import { useStaffSWR } from '@/services/staff'
import Stats from '@/components/stats'
import { useState } from 'react'
import { DatePickerInput } from '@mantine/dates'
import { Programs } from '@/models/programs'

const StatsPage = () => {
    const { staff } = useStaffSWR()
    const [tab, setTab] = useState<string | null>('all')
    const [selectedStaff, setSelectedStaff] = useState<string>()
    const [selectedOffice, setSelectedOffice] = useState<number | null>()
    const [dates, setDates] = useState<[Date | null, Date | null]>([null, null])
    const [program, setProgram] = useState<null | number>()

    return (
        <Layout pageTitle={'Stats'}>
            <Container>
                <Stack w='100%'>
                    <Breadcrumbs />
                    <Flex direction={'column'}>
                        <Title>Stats</Title>
                        <Text c={'dimmed'}>
                            View metrics on reviews completed - Percentage of
                            actions and errors by office and by staff reviewed
                        </Text>
                    </Flex>
                    <Tabs defaultValue={'all'} value={tab} onTabChange={setTab}>
                        <Tabs.List>
                            <Tabs.Tab value={'all'} icon={<IconGraph />}>
                                All
                            </Tabs.Tab>
                            <Tabs.Tab value={'staff'} icon={<IconUser />}>
                                Staff{' '}
                            </Tabs.Tab>
                            <Tabs.Tab value={'office'} icon={<IconBuilding />}>
                                Office
                            </Tabs.Tab>
                        </Tabs.List>
                        <Group pt={'xs'} spacing={'lg'}>
                            <Group spacing={'xl'} w={'100%'}>
                                <DatePickerInput
                                    clearable
                                    clearButtonProps={{
                                        'aria-label': 'Clear dates',
                                    }}
                                    ariaLabels={{
                                        nextDecade: 'Next decade',
                                        previousDecade: 'Previous decade',
                                        nextYear: 'Next year',
                                        previousYear: 'Previous year',
                                        nextMonth: 'Next month',
                                        previousMonth: 'Previous month',
                                        yearLevelControl:
                                            'Change to decade view',
                                        monthLevelControl:
                                            'Change to year view',
                                    }}
                                    maxDate={new Date()}
                                    type='range'
                                    label='Pick dates range'
                                    inputWrapperOrder={[
                                        'label',
                                        'input',
                                        'error',
                                        'description',
                                    ]}
                                    description={
                                        'Add a range of dates to search if you would like to view stats just for a certain time period else we will search for all time periods.'
                                    }
                                    value={dates}
                                    onChange={setDates}
                                    maw={300}
                                />
                                <Select
                                    value={
                                        program == null ? null : String(program)
                                    }
                                    onChange={value =>
                                        setProgram(
                                            value === null
                                                ? null
                                                : Number(value),
                                        )
                                    }
                                    searchable
                                    label={'Program'}
                                    placeholder={'Program'}
                                    data={Object.keys(Programs).map(
                                        (program, index) => ({
                                            label: program,
                                            value: String(index),
                                        }),
                                    )}
                                    maw={250}
                                    clearable
                                    clearButtonProps={{
                                        'aria-label': 'Clear program selection',
                                    }}
                                    inputWrapperOrder={[
                                        'label',
                                        'input',
                                        'error',
                                        'description',
                                    ]}
                                    description={
                                        'Add a program to filter if you would like to view stats just for a certain program else we will search for all.'
                                    }
                                />
                            </Group>
                            <Tabs.Panel value={'all'} pt={'xs'}>
                                <Stats program={program} dates={dates} />
                            </Tabs.Panel>
                            <Tabs.Panel value={'staff'} pt={'xs'}>
                                <Stack>
                                    <Select
                                        value={selectedStaff}
                                        onChange={val =>
                                            val && setSelectedStaff(val)
                                        }
                                        placeholder={'Select a staff member'}
                                        searchable
                                        label={'Staff'}
                                        data={staff.map(staff => ({
                                            label:
                                                staff.firstName +
                                                ' ' +
                                                staff.lastName,
                                            value: staff.id,
                                        }))}
                                    />
                                    {selectedStaff ? (
                                        <Stats
                                            program={program}
                                            staffId={selectedStaff}
                                            dates={dates}
                                        />
                                    ) : (
                                        <Alert
                                            icon={<IconExclamationMark />}
                                            title={'No Staff Selected'}
                                            children={
                                                <Group position={'apart'}>
                                                    <Text>
                                                        Select a staff member to
                                                        view their reviews or
                                                        view all stats
                                                    </Text>
                                                    <Button
                                                        compact
                                                        variant={'outline'}
                                                        onClick={() =>
                                                            setTab('all')
                                                        }
                                                    >
                                                        View all
                                                    </Button>
                                                </Group>
                                            }
                                        />
                                    )}
                                </Stack>
                            </Tabs.Panel>
                            <Tabs.Panel value={'office'} pt={'xs'}>
                                <Stack>
                                    <Select
                                        value={
                                            selectedOffice == null
                                                ? null
                                                : String(selectedOffice)
                                        }
                                        onChange={val =>
                                            setSelectedOffice(
                                                val !== null ? +val : val,
                                            )
                                        }
                                        placeholder={'Select an office'}
                                        searchable
                                        label={'Office'}
                                        data={Object.keys(Offices).map(
                                            (office, index) => ({
                                                label: office,
                                                value: String(index),
                                            }),
                                        )}
                                    />
                                    {parseInt(
                                        selectedOffice?.toString() || '-1',
                                    ) >= 0 ? (
                                        <Stats
                                            program={program}
                                            office={selectedOffice}
                                            dates={dates}
                                        />
                                    ) : (
                                        <Alert
                                            title={'No Office Selected'}
                                            icon={<IconExclamationMark />}
                                            children={
                                                <Group position={'apart'}>
                                                    <Text>
                                                        Select an ofice to view
                                                        their reviews or view
                                                        all stats
                                                    </Text>
                                                    <Button
                                                        compact
                                                        variant={'outline'}
                                                        onClick={() =>
                                                            setTab('all')
                                                        }
                                                    >
                                                        View all
                                                    </Button>
                                                </Group>
                                            }
                                        />
                                    )}
                                </Stack>
                            </Tabs.Panel>
                        </Group>
                    </Tabs>
                </Stack>
            </Container>
        </Layout>
    )
}
export default StatsPage
