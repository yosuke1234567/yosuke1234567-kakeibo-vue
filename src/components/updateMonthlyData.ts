import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from '../firebase'
import { getMonthlyData } from "./getMonthlyData"

export const updateMonthlyData = async (monthArg: number) => {

    // 一月分のデータを取得
    const docs = await getMonthlyData(monthArg)

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

    const thisMonthStats: Stats[] = [] // 一月分の集計を格納する変数
    categories!.forEach((e: CategoryDocElm) => thisMonthStats.push({
        amount: 0,
        category: e.type
    }))
    console.log(docs)

    for (let i=0; i<docs.length; i++) {
        for (let j=0; j<thisMonthStats.length; j++) {
            if (docs[i].category === thisMonthStats[j].category) {
                thisMonthStats[j].amount += docs[i].amount
            }
        }
    }

    const year = new Date(monthArg).getFullYear()
    const month = (new Date(monthArg).getMonth() + 1).toString().padStart(2, '0')

    // firestoreに更新
    const statsRef = doc(db, auth.currentUser!.uid, `stats-${year}-${month}`)
    await setDoc(statsRef, {
        expense: thisMonthStats,
        statsMonth: `${year}-${month}`
    })
}