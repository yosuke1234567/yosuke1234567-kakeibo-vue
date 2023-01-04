import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase';

export const getDoughnutValue = async (monthStr: string) => {
    interface Stats {
        amount: number
        category: string
    }
    const statsRef = doc(db, auth.currentUser!.uid, `stats-${monthStr}`)
    const statsData = (await getDoc(statsRef)).data()
    if (statsData) {
        const statsExp: Stats[] = statsData.expense

        let sum = 0
        for (let i = 0; i < statsExp.length; i++) {
            sum += statsExp[i].amount
        }

        if (sum > 0 && auth.currentUser) {
            interface CategoryDocElm {
                color: string
                type: string
            }
            const categoryRef = doc(db, auth.currentUser.uid, 'data')
            const categorySnap = await getDoc(categoryRef)
            const categories: CategoryDocElm[] = categorySnap.data()!.category

            const chartValue: number[] = []
            for (let i = 0; i < categories.length; i++) {
                chartValue.push(0)
            }
            for (let i = 0; i < categories.length; i++) {
                for (let j = 0; j < statsExp.length; j++) {
                    if (categories[i].type === statsExp[j].category) {
                        chartValue[i] = statsExp[j].amount
                    }
                }
            }
            console.log(chartValue)
            return chartValue
        } else {
            return []
        }
        
    } else {
        return []
    }
}