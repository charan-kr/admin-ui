import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { ROLES } from "../utils/constants";

function ProtectedRoutes({
  Component,
  isAuthenticated,
  userRoles,
  allowedRole,
  ...rest
}) {
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated) {
            if (
              userRoles
                ?.map((ele) => allowedRole?.some((role) => role === ele))
                .some((ele) => ele) ||
              allowedRole?.some((ele) => ele === ROLES.user)
            ) {
              return <Component />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/unauthorized",
                    state: { from: props.location },
                  }}
                />
              );
            }
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/auth/login",
                  state: { from: props.location },
                }}
              />
            );
          }
        }}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state?.user?.loggedIn,
  userRoles: state?.user?.roles,
});

export default connect(mapStateToProps, null)(ProtectedRoutes);
