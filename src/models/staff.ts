export interface Staff {
    id: string
    orNumber: string
    firstName: string
    lastName: string
    office: number
    createdBy: string
}

export interface PostStaff extends Omit<Staff, 'id'> {
    id?: string
}
