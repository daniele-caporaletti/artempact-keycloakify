import { Suspense, lazy, useMemo } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import Login from "./pages/Login";
import LoginResetPassword from "./pages/LoginResetPassword";
import LoginVerifyEmail from "./pages/LoginVerifyEmail";
import LogoutConfirm from "./pages/LogoutConfirm";
import Register from "./pages/Register";
const UserProfileFormFields = lazy(
    () => import("./UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    useCustomStyles(kcContext);

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <LoginResetPassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-verify-email.ftl":
                        return (
                            <LoginVerifyEmail
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "logout-confirm.ftl":
                        return (
                            <LogoutConfirm
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "register.ftl":
                        return (
                            <Register
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={true}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

function useCustomStyles(kcContext: KcContext) {
    return useMemo(() => {
        
        // Your stylesheet that applies to all pages.
        import("./main.css");
        let classes: { [key in ClassKey]?: string } = {
            // Classes that apply to all pages
        };

        switch (kcContext.pageId) {
            case "login.ftl":
                // A login page-specific stylesheet.
                import("./pages/login.css");
                classes = {
                    ...classes,
                    // Classes that apply only to the login page
                };
                break;
            case "login-reset-password.ftl":
                import("./pages/loginResetPassword.css");
                classes = {
                    ...classes,
                };
                break;
            case "login-verify-email.ftl":
                import("./pages/loginVerifyEmail.css");
                classes = {
                    ...classes,
                };
                break;
            case "logout-confirm.ftl":
                import("./pages/logoutConfirm.css");
                classes = {
                    ...classes,
                };
                break;
            case "register.ftl":
                // A register page-specific stylesheet.
                import("./pages/register.css");
                classes = {
                    ...classes,
                    // Classes that apply only to the register page
                };
                break;
        }

        return classes;

    }, []);
}

const classes = {} satisfies { [key in ClassKey]?: string };
