import { doc, getDoc, DocumentData } from 'firebase/firestore'
import { auth, db } from '../firebase';

export const getDoughnutValue = async (monthStr: string) => {
    const statsRef = doc(db, auth.currentUser!.uid, `stats-${monthStr}`)
    const statsData = (await getDoc(statsRef)).data()
    if (statsData) {
        const chartValue: number[] = await statsData.expense.map((e: DocumentData) => e.amount)
        console.log(chartValue)

        return chartValue
    } else {
        return []
    }
}