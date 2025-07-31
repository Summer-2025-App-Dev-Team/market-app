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
    // The ID of the expired items
    const expiredItems = [];

    // Get current time
    const now = Timestamp.now();

    // Get all items in allListings with the availableUntil property expired
    const allExpiredListingsSnapshot = await db
        .collection("allListings")
        .where("availableUntil", "<=", now)
        .get();

    const userStuffSnapshot = await db
        .collection("userStuff")
        .get();

    // If there is no item, return
    if (allExpiredListingsSnapshot.docs.length <= 0) {
        console.log("No item expired today!");
        return;
    }

    // This will update the allListings collection
    for (const doc of allExpiredListingsSnapshot.docs) {
        // Skip the old items
        if (doc.data().status !== "available") continue;

        // Automatically delete the item if it has been expired for more than a week
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
        if (now.toDate() - doc.data().availableUntil.toDate() >= oneWeekInMillis) {
            await doc.ref.delete();
            console.log(`Deleted expired item after 1 week: ${doc.id}`);
            continue;
        }

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
    for (const doc of userStuffSnapshot.docs) {
        const data = doc.data();
        let updated = false;

        const updatedListings = data.listings.map((listing) => {
            if (expiredItems.includes(listing.id) && listing.status === "available") {
                // If the item has expired
                updated = true;
                return {
                    ...listing,
                    status: "unavailable"
                }
            }

            // Return the original listing if it doesn't need to be updated
            return listing;
        });

        if (updated) {
            await doc.ref.update({ listings: updatedListings });
            console.log(`Updated listings for user ${doc.id}`);
        }
    }
});
