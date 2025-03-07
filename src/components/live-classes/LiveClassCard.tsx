import { formatDate } from '@/lib/utils/date';
import { LiveClass } from '@/types/live-class';

interface LiveClassCardProps {
  liveClass: LiveClass;
  onJoin?: () => void;
  onStart?: () => void;
  onEnd?: () => void;
  isTeacher?: boolean;
}

export function LiveClassCard({ 
  liveClass, 
  onJoin, 
  onStart, 
  onEnd, 
  isTeacher = false 
}: LiveClassCardProps) {
  const isLive = liveClass.status === 'live';
  const isScheduled = liveClass.status === 'scheduled';

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{liveClass.title}</h3>
      <p className="text-gray-600 mt-1">{liveClass.description}</p>
      <div className="mt-2 text-sm text-gray-500">
        <p>Starts: {formatDate(liveClass.startTime)}</p>
        {liveClass.endTime && <p>Ends: {formatDate(liveClass.endTime)}</p>}
      </div>
      <div className="mt-4 flex gap-2">
        {isTeacher ? (
          <>
            {isScheduled && onStart && (
              <button 
                onClick={onStart}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Start Class
              </button>
            )}
            {isLive && onEnd && (
              <button 
                onClick={onEnd}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                End Class
              </button>
            )}
          </>
        ) : (
          isLive && onJoin && (
            <button 
              onClick={onJoin}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Join Class
            </button>
          )
        )}
      </div>
    </div>
  );
}
