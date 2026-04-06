"use client";

const withProtectedRoute = (WrappedComponent) => {
  const NoAuthWrapper = (props) => {
    return <WrappedComponent {...props} />;
  };

  NoAuthWrapper.displayName = `WithProtectedRoute(${
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Component"
  })`;

  return NoAuthWrapper;
};

export default withProtectedRoute;
