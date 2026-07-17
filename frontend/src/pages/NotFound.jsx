import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-teal-800 flex items-center justify-center font-mono">
            <div className="text-center text-amber-50 space-y-6">

                <p className="text-8xl font-bold text-teal-400 drop-shadow-lg">Error</p>

                <h1 className="text-3xl font-bold">Page Not Found</h1>

                <p className="text-gray-300 text-sm max-w-xs mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 bg-teal-700 hover:bg-teal-600
                                   rounded font-bold transition-all
                                   hover:shadow-lg hover:shadow-teal-500/40"
                    >
                        ← Go Back
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="px-5 py-2 border border-teal-500 hover:bg-teal-700
                                   rounded font-bold transition-all
                                   hover:shadow-lg hover:shadow-teal-500/40"
                    >
                        Login
                    </button>
                </div>

            </div>
        </div>
    );
}
