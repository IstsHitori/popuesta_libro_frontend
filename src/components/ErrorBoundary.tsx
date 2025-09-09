import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 max-w-lg w-full text-center">
            <div className="text-6xl mb-4">😅</div>
            <h1 className="text-white text-2xl font-bold mb-4">
              ¡Oops! Algo salió mal
            </h1>
            <p className="text-white/80 mb-6 leading-relaxed">
              No te preocupes, esto puede pasar. Estamos trabajando para solucionarlo.
              Puedes intentar recargar la página o volver al inicio.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <summary className="cursor-pointer text-red-300 font-medium mb-2">
                  Detalles del error (modo desarrollo)
                </summary>
                <div className="text-red-200 text-sm font-mono overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap text-xs mt-1">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                🔄 Recargar página
              </button>
              <button
                onClick={this.handleGoHome}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                🏠 Ir al inicio
              </button>
            </div>

            <div className="mt-6 text-white/60 text-sm">
              Si el problema persiste, por favor contacta al soporte técnico.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
