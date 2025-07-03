import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("error boundary caught an error:", error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <AlertTriangle size={24} color="#e74c3c" />
            <h2 style={{ margin: 0 }}>oops! terjadi kesalahan</h2>
          </div>

          <p style={{ marginBottom: "1rem" }}>
            aplikasi mengalami error yang tidak terduga. coba refresh halaman
            atau hubungi support jika masalah berlanjut.
          </p>

          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <button className="btn btn-primary" onClick={this.handleRetry}>
              <RefreshCw size={16} />
              coba lagi
            </button>
            <button
              className="btn btn-outline"
              onClick={() => window.location.reload()}
            >
              refresh halaman
            </button>
          </div>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <details style={{ marginTop: "2rem", textAlign: "left" }}>
              <summary
                style={{
                  cursor: "pointer",
                  color: "#e74c3c",
                  fontWeight: "500",
                }}
              >
                detail error (development only)
              </summary>
              <pre
                style={{
                  background: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  overflow: "auto",
                  marginTop: "1rem",
                }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
