export default function AuthErrorMessage({
    message,
  }) {
    return (
      <div className="mt-1 mb-1">
        {message && <p className="text-sm text-red-500">{message}</p>}
      </div>
    );
  }