import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';

initializeApp();
const db = getFirestore();

export const scheduledDeleteExpiredDocs = onSchedule("every day 08:00", async () => {
    const now = Timestamp.now();

    const snapshot = await db
        .collection("allListings")
        .where("availableUntil", "<=", now)
        .get();

    const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
    console.log(`Deleted ${deletePromises.length} expired documents.`);
    await Promise.all(deletePromises);
});
