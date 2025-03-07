import { formatDate } from '@/lib/utils/date';
import { Assignment } from '@/types/assignment';

interface AssignmentCardProps {
  assignment: Assignment;
  onSubmit?: () => void;
  onGrade?: () => void;
  isTeacher?: boolean;
}

export function AssignmentCard({
  assignment,
  onSubmit,
  onGrade,
  isTeacher = false
}: AssignmentCardProps) {
  const isPending = assignment.status === 'pending';
  const isSubmitted = assignment.status === 'submitted';

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{assignment.title}</h3>
      <p className="text-gray-600 mt-1">{assignment.description}</p>
      <div className="mt-2 text-sm text-gray-500">
        <p>Due: {formatDate(assignment.dueDate)}</p>
        <p>Status: {assignment.status}</p>
        {assignment.grade && <p>Grade: {assignment.grade}</p>}
        {assignment.feedback && (
          <p className="mt-2 italic">{assignment.feedback}</p>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        {isTeacher ? (
          isSubmitted && onGrade && (
            <button
              onClick={onGrade}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Grade Assignment
            </button>
          )
        ) : (
          isPending && onSubmit && (
            <button
              onClick={onSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit Assignment
            </button>
          )
        )}
      </div>
    </div>
  );
}
