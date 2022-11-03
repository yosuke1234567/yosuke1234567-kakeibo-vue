import { query, collection, doc, getDoc, getDocs, setDoc, where, DocumentData } from "firebase/firestore"
import { auth, db } from '../firebase'

export const updateMonthData = async () => {
    const colRef = collection(db, auth.currentUser!.uid)
    const date = new Date()
    const thisMonth = `${date.getFullYear()}-${date.getMonth() + 1}` // YYYY-MM

    // 今月分のデータを取得
    const thisMonthDocs: DocumentData[] = []
    const tmq = query(colRef, where('date', '>=', `${thisMonth}-01`))
    const tmSnap = await getDocs(tmq)
    tmSnap.forEach(doc => thisMonthDocs.push(doc.data()))

    
    // ユーザーが設定したカテゴリーを取得
    const categoryRef = doc(db, auth.currentUser!.uid, 'data')
    const categorySnap = await getDoc(categoryRef)
    const categories = categorySnap.data()!.category

    interface Stats {
        amount: number
        category: any
    }
    interface CategoryDocElm {
        color: String
        type: String
    }

    const thisMonthStats: Stats[] = [] // 今月分の集計を格納する変数
    categories!.forEach((e: CategoryDocElm) => thisMonthStats.push({
        amount: 0,
        category: e.type
    }))
    console.log(thisMonthDocs)

    for (let i=0; i<thisMonthDocs.length; i++) {
        for (let j=0; j<thisMonthStats.length; j++) {
            if (thisMonthDocs[i].category === thisMonthStats[j].category) {
                thisMonthStats[j].amount += thisMonthDocs[i].amount
            }
        }
    }

    // firestoreに更新
    const statsRef = doc(db, auth.currentUser!.uid, `stats-${thisMonth}`)
    await setDoc(statsRef, {
        expense: thisMonthStats
    })
}