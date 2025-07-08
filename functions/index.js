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

    // For email
    const emailDoc = {
        to: "yianxie52@gmail.com", // TODO: this should be changed to the seller's email later
        message: {
            subject: "Some item has expired!",
            text: "This is the plain text part of the email",
            html: `<p>Successfully deleted <b>${deletePromises.length}</b> expired documents</p>`
        }
    }

    await db.collection("mail").add(emailDoc);
});
