"use client"

export function AuthPage({isSignIn} : {
    isSignIn: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-6 m-2 bg-white rounded">
            <div>
                <input type="text" placeholder="Email"/>
            </div>
            <div>

            </div>
            <div className="pt-2">
                <input type="password" placeholder="password"/>
            </div>
            <div className="pt-2">
                <button 
                    className="bg-red-200 rounded p-2" 
                    title={isSignIn ? "Sign in" : "Sign up"}
                    onClick={() => {

                    }}
                >
                    {isSignIn ? "Sign in" : "Sign up"}
                </button>
            </div>
        </div>
    </div>
}