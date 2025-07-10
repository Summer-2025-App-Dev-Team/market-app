import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { onSchedule } from 'firebase-functions/v2/scheduler';

initializeApp();
const db = getFirestore();

// This is going to run everyday at 08:00
export const scheduledDeleteExpiredDocs = onSchedule({
    schedule: "every day 08:00",
    timeZone: "Asia/Singapore"
}, async () => {
    // Get current time
    const now = Timestamp.now();

    // Get all items in allListings with the availableUntil property expired
    const snapshot = await db
        .collection("allListings")
        .where("availableUntil", "<=", now)
        .get();

    // If there is no item, return
    if (snapshot.docs.length <= 0) {
        console.log("No item expired today!");
        return;
    }

    for (const doc of snapshot.docs) {
        console.log("Expired item:", doc);

        await doc.ref.set({
            status: "unavailable"
        });

        try {
            const userRecord = await getAuth().getUser(doc.data().user);
            const emailDoc = {
                to: userRecord.email,
                message: {
                    subject: "Your item has expired!",
                    html: `Your listed item, ${doc.data().name}, which is available until ${doc.data().availableUntil.toDate().toLocaleDateString()}, has expired.`
                }
            };
            await db.collection("mail").add(emailDoc);
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
});
