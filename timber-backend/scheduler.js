const cron = require("node-cron");
const Invoice = require("./models/Invoice"); // Adjust path as needed

// Schedule a daily job at 2:00 AM
cron.schedule("0 2 * * *", async () => {
  try {
    const now = new Date();
    const overdue = await Invoice.updateMany(
      { status: { $nin: ["Paid"] }, dueDate: { $lt: now } }, // Find unpaid invoices with past due dates
      { status: "Overdue" } // Mark as "Overdue"
    );
    console.log(`Auto-overdue update: ${overdue.modifiedCount} invoices marked as Overdue`);
  } catch (err) {
    console.error("Error updating overdue invoices:", err);
  }
});

console.log("Invoice overdue job scheduled.");
