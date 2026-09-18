import { Programs } from '@/models/programs'
import { ErdcReviewElements } from '@/models/erdcReviewElements'
import { TanfReviewElements } from '@/models/tanfReviewElements'
import { SnapReviewElements } from '@/models/snapReviewElements'
import { NonMagiReviewElements } from '@/models/nonMagiReviewElements'
import { MagiReviewElements } from '@/models/magiReviewElements'

export const programToReviewElements = {
    [Programs.ERDC]: ErdcReviewElements,
    [Programs.TANF]: TanfReviewElements,
    [Programs.SNAP]: SnapReviewElements,
    [Programs.NON_MAGI]: NonMagiReviewElements,
    [Programs.MAGI]: MagiReviewElements,
}
