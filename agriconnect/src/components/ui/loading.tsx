import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "line" | "circle" | "text" | "title";
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "line",
  width,
  height,
}) => {
  const baseClass = "loading-skeleton";
  const variantClasses = {
    line: "skeleton-line",
    circle: "skeleton-circle",
    text: "skeleton-text",
    title: "skeleton-title",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn(baseClass, variantClasses[variant], className)}
      style={style}
    />
  );
};

interface CardSkeletonProps {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showActions?: boolean;
  lines?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showImage = true,
  showTitle = true,
  showDescription = true,
  showActions = true,
  lines = 3,
}) => {
  return (
    <div className="card">
      {showImage && <Skeleton className="mb-4" width="100%" height="200px" />}
      {showTitle && <Skeleton variant="title" width="80%" />}
      {showDescription && (
        <div className="mb-4">
          {Array.from({ length: lines }, (_, i) => (
            <Skeleton
              key={i}
              variant="text"
              width={i === lines - 1 ? "60%" : "100%"}
            />
          ))}
        </div>
      )}
      {showActions && (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Skeleton width="100px" height="40px" />
          <Skeleton width="120px" height="40px" />
        </div>
      )}
    </div>
  );
};

interface ListSkeletonProps {
  count?: number;
  showAvatar?: boolean;
  showContent?: boolean;
  showActions?: boolean;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  count = 3,
  showAvatar = true,
  showContent = true,
  showActions = true,
}) => {
  return (
    <div>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="card"
          style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        >
          {showAvatar && (
            <Skeleton variant="circle" width="48px" height="48px" />
          )}
          {showContent && (
            <div style={{ flex: 1 }}>
              <Skeleton variant="title" width="70%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="50%" />
            </div>
          )}
          {showActions && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Skeleton width="80px" height="32px" />
              <Skeleton width="80px" height="32px" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "var(--primary-green)",
  className,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn("loading-spinner", sizeClasses[size], className)}
      style={{
        borderColor: `${color}20`,
        borderTopColor: color,
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        display: "inline-block",
      }}
    />
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  message = "memuat...",
}) => {
  return (
    <div style={{ position: "relative" }}>
      {children}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <LoadingSpinner size="lg" />
          <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Skeleton;
