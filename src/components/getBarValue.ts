import { collection, query, orderBy, getDocs, DocumentData } from 'firebase/firestore'
import { auth, db } from '../firebase';

export const getBarValue = async (chartLabels: string[]) => {
    const colRef = collection(db, auth.currentUser!.uid)
    const q = query(colRef, orderBy('statsMonth'))
    const snap = await getDocs(q)
    const docsData: DocumentData[] = []
    snap.forEach(doc => docsData.push(doc.data()))
    console.log(docsData)

    const data: { amount: number; category?: string }[][] = []
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < docsData.length; j++) {
            if (chartLabels[i] === docsData[j].statsMonth) {
                data[i] = docsData[j].expense
                break
            } else {
                data[i] = [{ amount: 0 }]
            }
        }
    }
    console.log(data)

    const chartValue: number[] = []

    for (let i = 0; i < 6; i++) {
        let oneMonthAmount = 0
        for (let j = 0; j < data[i].length; j++) {
            oneMonthAmount += data[i][j].amount
        }
        chartValue.push(oneMonthAmount)
    }
    console.log(chartValue)

    return chartValue
}