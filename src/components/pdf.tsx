import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { Review } from '@/models/review'
import { Programs } from '@/models/programs'
import React from 'react'
import dayjs from '@/dayjs'
import { Staff } from '@/models/staff'
import { ProgramReviewElements } from '@/models/programReviewElements'
import { SnapReportingSystems } from '@/models/snapReportingSystems'
import { MagiSubPrograms } from '@/models/magiSubPrograms'
import { NonMagiSubPrograms } from '@/models/nonMagiSubPrograms'
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#F0EAD6',
    },
    alternateBg: {
        backgroundColor: '#f8f6f1',
    },
    section: {
        marginTop: '10px',
        padding: '16px',
        marginBottom: '12px',
    },
    border: {
        border: '1px solid black',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'black',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        borderBottom: '1px solid grey',
    },
    valueCollection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        width: '100%',
        flexWrap: 'wrap',
    },
    keyValueContainer: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 16,
    },
    verticalKeyValueContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    key: {
        fontSize: 18,
        fontWeight: 700,
    },
    value: {
        fontSize: 14,
        fontWeight: 300,
    },
})

interface Props {
    review: Review & { staff: Staff }
}

// Create Document Component
const ReviewDocument = ({ review }: Props) => {
    return (
        <Document
            title={`${review.id}-${review.staffId}-${review.reviewDate}`}
            author={review.reviewedBy}
            subject={Object.keys(Programs)[review.program] + ' review'}
            language={'en'}
        >
            {/*render a single page*/}
            <Page size='A4' style={styles.page}>
                <View>
                    {/*<Text>Hello</Text>*/}
                    <View style={[styles.section, styles.border]}>
                        <Text style={styles.title}>Review # {review.id}</Text>
                        <View
                            style={[
                                styles.keyValueContainer,
                                { marginTop: 12, marginBottom: 8 },
                            ]}
                        >
                            <Text style={styles.key}>Case #:</Text>
                            <Text style={styles.value}>
                                {review.caseNumber}
                            </Text>
                        </View>
                        <Text
                            style={{
                                marginTop: 16,
                                fontSize: 16,
                                fontWeight: 100,
                            }}
                        >
                            Created on{' '}
                            {dayjs(review.reviewDate).format(
                                'MM/DD/YYYY hh:mm A',
                            )}
                        </Text>
                    </View>
                    <View style={[styles.section, styles.alternateBg]}>
                        <Text style={styles.sectionTitle}>Review Info</Text>
                        <View style={styles.valueCollection}>
                            <View style={styles.keyValueContainer}>
                                <Text style={styles.key}>
                                    Program Reviewed:
                                </Text>
                                <Text style={styles.value}>
                                    {Object.keys(Programs)[review.program]}
                                </Text>
                            </View>
                            <View style={styles.keyValueContainer}>
                                <Text style={styles.key}>User Reviewed:</Text>
                                <Text style={styles.value}>
                                    {review.staff.firstName +
                                        ' ' +
                                        review.staff.lastName}
                                </Text>
                            </View>
                            <View style={styles.keyValueContainer}>
                                <Text style={styles.key}># Errors:</Text>
                                <Text style={styles.value}>
                                    {review.reviewElements.reduce(
                                        (acc, e) => (e.isError ? acc + 1 : acc),
                                        0,
                                    )}
                                </Text>
                            </View>

                            <View style={styles.keyValueContainer}>
                                <Text style={styles.key}>Is complete?</Text>
                                <Text style={styles.value}>
                                    {review.reviewElements.every(
                                        e => e.isReviewed,
                                    )
                                        ? 'Completed'
                                        : 'In Progress'}
                                </Text>
                            </View>
                            {[Programs.ERDC, Programs.TANF].includes(
                                review.program,
                            ) ? null : (
                                <View
                                    style={[
                                        styles.keyValueContainer,
                                        { width: '100%' },
                                    ]}
                                >
                                    <Text style={styles.key}>
                                        {review.program === Programs.SNAP
                                            ? 'SNAP Reporting System'
                                            : review.program === Programs.MAGI
                                            ? 'MAGI Sub-Program'
                                            : review.program ===
                                              Programs.NON_MAGI
                                            ? 'Non Magi Sub-Program'
                                            : ''}
                                    </Text>
                                    <Text style={styles.value}>
                                        {review.program === Programs.SNAP
                                            ? Object.keys(SnapReportingSystems)[
                                                  review.reportingSystem ?? -1
                                              ]
                                            : review.program === Programs.MAGI
                                            ? Object.keys(MagiSubPrograms)[
                                                  review.magiSubProgram ?? -1
                                              ]
                                            : Object.keys(NonMagiSubPrograms)[
                                                  review.nonMagiSubProgram ?? -1
                                              ]}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={[styles.section, styles.alternateBg]}>
                        <Text style={styles.sectionTitle}>
                            Reviewed Elements
                        </Text>
                        {review.reviewElements.map((reviewedElement, index) => (
                            <View
                                key={reviewedElement.id}
                                style={[
                                    styles.verticalKeyValueContainer,
                                    styles.border,
                                ]}
                            >
                                <Text style={{ marginBottom: 12 }}>
                                    Element {index + 1}
                                </Text>
                                <View style={styles.keyValueContainer}>
                                    <Text style={styles.key}>
                                        Reviewed Element{' '}
                                        {
                                            Object.keys(ProgramReviewElements)[
                                                reviewedElement.reviewedElement
                                            ]
                                        }
                                    </Text>
                                </View>
                                <View style={styles.keyValueContainer}>
                                    <Text style={styles.key}>
                                        Has Been Reviewed?
                                    </Text>
                                    <Text style={styles.value}>
                                        {reviewedElement.isReviewed
                                            ? 'Reviewed'
                                            : 'Not Reviewed Yet'}
                                    </Text>
                                </View>
                                {reviewedElement.isReviewed ? (
                                    <View>
                                        <View style={styles.keyValueContainer}>
                                            <Text style={styles.key}>
                                                Has Action?
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.value,
                                                    {
                                                        color: reviewedElement.hasAction
                                                            ? '#FFA500'
                                                            : '#000000',
                                                    },
                                                ]}
                                            >
                                                {reviewedElement.hasAction
                                                    ? 'Yes'
                                                    : 'No'}
                                            </Text>
                                        </View>

                                        <View style={styles.keyValueContainer}>
                                            <Text style={styles.key}>
                                                Has Error?
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.value,
                                                    {
                                                        color: reviewedElement.isError
                                                            ? '#ff0000'
                                                            : '#000000',
                                                    },
                                                ]}
                                            >
                                                {reviewedElement.isError
                                                    ? 'Yes'
                                                    : 'No'}
                                            </Text>
                                        </View>

                                        <View style={styles.keyValueContainer}>
                                            <Text style={styles.key}>
                                                Comments
                                            </Text>
                                            <Text style={styles.value}>
                                                {reviewedElement.comments}
                                            </Text>
                                        </View>
                                    </View>
                                ) : null}
                            </View>
                        ))}
                    </View>

                    {review.program === Programs.MAGI &&
                    review.magiEligibles ? (
                        <View style={[styles.section, styles.alternateBg]}>
                            <Text style={styles.sectionTitle}>
                                Magi Eligibles
                            </Text>
                            {Object.entries(review.magiEligibles).map(r => {
                                if (r[0] == 'id' || r[0] == 'reviewId') {
                                    return null
                                }

                                return (
                                    <View
                                        key={r[0]}
                                        style={styles.keyValueContainer}
                                    >
                                        <Text style={styles.key}>{r[0]}</Text>
                                        <Text style={styles.value}>{r[1]}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    ) : null}

                    <View style={styles.section}>
                        <View style={styles.verticalKeyValueContainer}>
                            <Text style={styles.sectionTitle}>Comments</Text>
                            <Text style={styles.value}>
                                {review.otherComments}
                            </Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
export default ReviewDocument
