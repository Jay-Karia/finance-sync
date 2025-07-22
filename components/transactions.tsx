import { Group } from "@/types/group";

export default function Transactions({ group }: { group: Group }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-2">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Transactions
      </h2>
      <div className="space-y-4">
        {group.transactions && group.transactions.length > 0 ? (
          group.transactions.map((exp) => (
            <div
              key={exp.id}
              className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {exp.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Paid by: {exp.paidBy.join(", ")} on{" "}
                  <time dateTime={exp.date}>{exp.date}</time>
                </p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {exp.amount.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No transactions yet.
          </p>
        )}
      </div>
    </div>
  );
}
