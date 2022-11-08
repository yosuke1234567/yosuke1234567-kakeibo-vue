import { query, collection, getDocs, where, DocumentData } from "firebase/firestore"
import { auth, db } from '../firebase'

export const getMonthlyData = async (monthArg: string) => {
    const nextMonth = `${new Date(monthArg).getFullYear()}-${new Date(monthArg).getMonth() + 2}`
    const colRef = collection(db, auth.currentUser!.uid)
    const docs: DocumentData[] = []
    const q = query(colRef, where('date', '>=', `${monthArg}-01`), where('date', '<', `${nextMonth}-01`))
    const snap = await getDocs(q)
    snap.forEach(doc => docs.push(doc.data()))

    return docs
}