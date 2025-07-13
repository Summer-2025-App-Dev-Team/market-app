import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';
import { onSchedule } from 'firebase-functions/v2/scheduler';

initializeApp();
const db = getFirestore();

// This is going to run everyday at 08:00
export const scheduledDeleteExpiredDocs = onSchedule({
    schedule: "every day 08:00",
    timeZone: "Asia/Singapore"
}, async () => {
    // The ID of the expired items
    const expiredItems = [];

    // Get current time
    const now = Timestamp.now();

    // Get all items in allListings with the availableUntil property expired
    const allListingsSnapshot = await db
        .collection("allListings")
        .where("availableUntil", "<=", now)
        .get();

    const userStuffSnapshot = await db
        .collection("userStuff")
        .get();

    // If there is no item, return
    if (allListingsSnapshot.docs.length <= 0) {
        console.log("No item expired today!");
        return;
    }

    // This will update the allListings collection
    for (const doc of allListingsSnapshot.docs) {
        console.log("Expired item:", doc);

        // Update the status property
        await doc.ref.update({
            status: "unavailable"
        });

        // Add the ID of the expired item to the array
        expiredItems.push(doc.data().id);

        // Send email to user
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

    // This will update the userStuff collections
    let updated = false;
    for (const doc of userStuffSnapshot.docs) {
        const data = doc.data();
        const updatedListings = data.listings.map((listing) => {
            if (expiredItems.includes(listing.id) && listing.status !== "unavailable") {
                // If the item has expired
                updated = true;
                return {
                    ...listing,
                    status: "unavailable"
                }
            }
        });

        if (updated) {
            await doc.ref.update({ listings: updatedListings });
            console.log(`Updated listings for user ${doc.id}`);
        }
    }
});
