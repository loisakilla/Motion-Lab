import React from "react";

export class ErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean }>{
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = { hasError: false};
    }

    static getDerivedStateFromError() { return { hasError: true};}
    componentDidCatch(error: unknown, info: unknown) { console.error("App error:", error, info); }
    render() {
        if (this.state.hasError) {
            return (
                <div className="mx-auto max-w-2xl p-6">
                    <h2 className="text-2xl font-semibold">Something went wrong</h2>
                    <p className="mt-2 text-white/70">Try reloading this page.</p>
                </div>
            );
        }
        return this.props.children;
    }
}