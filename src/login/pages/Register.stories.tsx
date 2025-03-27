import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";
import type { Attribute } from "keycloakify/login";

const { KcPageStory } = createKcPageStory({ pageId: "register.ftl" });

const meta = {
    title: "login/register.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/* --------------------------------------------------------------------------------
 *  DEFAULT
 * -------------------------------------------------------------------------------- */
export const Default: Story = {
    render: () => <KcPageStory
        kcContext={{
            realm: {
                registrationEmailAsUsername: true
            },
            locale: {
                currentLanguageTag: "it"
            },
            profile: {
                attributesByName: {
                    username: undefined,
                    firstName: undefined,
                    lastName: undefined,
                    dob: {
                        name: "dob",
                        displayName: "${profile.attributes.dob}",
                        required: true,
                        readOnly: false,
                        validators: {}, 
                        // Se vuoi un valore iniziale (che magari genera l'errore in preview)
                        // value: "2020-05-10",
                        annotations: {
                            inputType: "text"
                        }
                    }
                }
            },
            "x-keycloakify": {
                messages: {
                    "profile.attributes.dob": "Data di Nascita"
                }
            }
        }}
    />
};

/* --------------------------------------------------------------------------------
 *  WITH EMAIL ALREADY EXISTS
 * -------------------------------------------------------------------------------- */
export const WithEmailAlreadyExists: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationEmailAsUsername: true
                },
                locale: {
                    currentLanguageTag: "it"
                },
                profile: {
                    attributesByName: {
                        // Rimuoviamo username, teniamo solo email
                        username: undefined,
                        email: {
                            value: "john.doe@gmail.com"
                        },
                        firstName: undefined,
                        lastName: undefined,
                        dob: {
                            name: "dob",
                            displayName: "${profile.attributes.dob}",
                            required: true,
                            readOnly: false,
                            validators: {}, 
                            // Se vuoi un valore iniziale (che magari genera l'errore in preview)
                            // value: "2020-05-10",
                            annotations: {
                                inputType: "text"
                            }
                        }
                    }
                },
                messagesPerField: {
                    existsError: (fieldName: string) =>
                        fieldName === "email",
                    get: (fieldName: string) =>
                        fieldName === "email"
                            ? "Email already exists."
                            : undefined
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.dob": "Data di Nascita"
                    }
                }
            }}
        />
    )
};

/* --------------------------------------------------------------------------------
 *  WITH PASSWORD MIN LENGTH = 8
 * -------------------------------------------------------------------------------- */
export const WithPasswordMinLength8: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationEmailAsUsername: true
                },
                locale: {
                    currentLanguageTag: "it"
                },
                profile: {
                    attributesByName: {
                        username: undefined,
                        firstName: undefined,
                        lastName: undefined,
                        dob: {
                            name: "dob",
                            displayName: "${profile.attributes.dob}",
                            required: true,
                            readOnly: false,
                            validators: {}, 
                            // Se vuoi un valore iniziale (che magari genera l'errore in preview)
                            // value: "2020-05-10",
                            annotations: {
                                inputType: "text"
                            }
                        }
                    }
                },
                passwordPolicies: {
                    length: 8
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.dob": "Data di Nascita"
                    }
                }
            }}
        />
    )
};

/* --------------------------------------------------------------------------------
 *  WITH FIELD ERRORS
 * -------------------------------------------------------------------------------- */
export const WithFieldErrors: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationEmailAsUsername: true
                },
                locale: {
                    currentLanguageTag: "it"
                },
                profile: {
                    attributesByName: {
                        username: undefined,
                        firstName: undefined,
                        lastName: undefined,
                        // Qui simuliamo errori su email
                        email: { value: "invalid-email" },
                        dob: {
                            name: "dob",
                            displayName: "${profile.attributes.dob}",
                            required: true,
                            readOnly: false,
                            validators: {}, 
                            // Se vuoi un valore iniziale (che magari genera l'errore in preview)
                            // value: "2020-05-10",
                            annotations: {
                                inputType: "text"
                            }
                        }
                    }
                },
                messagesPerField: {
                    existsError: (fieldName: string) =>
                        ["email"].includes(fieldName),
                    get: (fieldName: string) => {
                        if (fieldName === "email") {
                            return "Invalid email format.";
                        }
                        return undefined;
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.dob": "Data di Nascita"
                    }
                }
            }}
        />
    )
};

/* --------------------------------------------------------------------------------
 *  WITH TERMS
 * -------------------------------------------------------------------------------- */
export const WithTermsAcceptance: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationEmailAsUsername: true
                },
                locale: {
                    currentLanguageTag: "it"
                },
                profile: {
                    attributesByName: {
                        username: undefined,
                        firstName: undefined,
                        lastName: undefined,
                        dob: {
                            name: "dob",
                            displayName: "${profile.attributes.dob}",
                            required: true,
                            readOnly: false,
                            validators: {}, 
                            // Se vuoi un valore iniziale (che magari genera l'errore in preview)
                            // value: "2020-05-10",
                            annotations: {
                                inputType: "text"
                            }
                        }
                    }
                },
                termsAcceptanceRequired: true,
                "x-keycloakify": {
                    messages: {
                        termsText: "<a href='https://example.com/terms'>Service Terms of Use</a>",
                        "profile.attributes.dob": "Data di Nascita"
                    }
                }
            }}
        />
    )
};

export const WithTermsNotAccepted: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationEmailAsUsername: true
                },
                locale: {
                    currentLanguageTag: "it"
                },
                profile: {
                    attributesByName: {
                        username: undefined,
                        firstName: undefined,
                        lastName: undefined,
                        dob: {
                            name: "dob",
                            displayName: "${profile.attributes.dob}",
                            required: true,
                            readOnly: false,
                            validators: {}, 
                            // Se vuoi un valore iniziale (che magari genera l'errore in preview)
                            // value: "2020-05-10",
                            annotations: {
                                inputType: "text"
                            }
                        }
                    }
                },
                termsAcceptanceRequired: true,
                messagesPerField: {
                    existsError: (fieldName: string) =>
                        fieldName === "termsAccepted",
                    get: (fieldName: string) =>
                        fieldName === "termsAccepted"
                            ? "You must accept the terms."
                            : undefined
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.dob": "Data di Nascita"
                    }
                }
            }}
        />
    )
};

/*
export const WithFavoritePet: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationEmailAsUsername: true
                },
                locale: {
                    currentLanguageTag: "it"
                },
                profile: {
                    attributesByName: {
                        username: undefined,
                        firstName: undefined,
                        lastName: undefined,
                        favoritePet: {
                            name: "favorite-pet",
                            displayName: "${profile.attributes.favoritePet}",
                            validators: {
                                options: {
                                    options: ["cat", "dog", "fish"]
                                }
                            },
                            annotations: {
                                inputOptionLabelsI18nPrefix:
                                    "profile.attributes.favoritePet.options"
                            },
                            required: false,
                            readOnly: false
                        } satisfies Attribute
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.favoritePet": "Favorite Pet",
                        "profile.attributes.favoritePet.options.cat": "Fluffy Cat",
                        "profile.attributes.favoritePet.options.dog": "Loyal Dog",
                        "profile.attributes.favoritePet.options.fish": "Peaceful Fish"
                    }
                }
            }}
        />
    )
};
*/

/*
export const WithRecaptcha: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationEmailAsUsername: true
                },
                profile: {
                    attributesByName: {
                        username: undefined,
                        firstName: undefined,
                        lastName: undefined,
                    }
                },
                scripts: ["https://www.google.com/recaptcha/api.js?hl=en"],
                recaptchaRequired: true,
                recaptchaSiteKey: "6LfQHvApAAAAAE73SYTd5vS0lB1Xr7zdiQ-6iBVa"
            }}
        />
    )
};
*/

/*
export const WithRestrictedToMITStudents: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        email: {
                            validators: {
                                pattern: {
                                    pattern: "^[^@]+@([^.]+\\.)*((mit\\.edu)|(berkeley\\.edu))$",
                                    "error-message": "${profile.attributes.email.pattern.error}"
                                }
                            },
                            annotations: {
                                inputHelperTextBefore: "${profile.attributes.email.inputHelperTextBefore}"
                            }
                        }
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.email.inputHelperTextBefore": "Please use your MIT or Berkeley email.",
                        "profile.attributes.email.pattern.error":
                            "This is not an MIT (<strong>@mit.edu</strong>) nor a Berkeley (<strong>@berkeley.edu</strong>) email."
                    }
                }
            }}
        />
    )
};
*/

/*
export const WithNewsletter: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        newsletter: {
                            name: "newsletter",
                            displayName: "Sign up to the newsletter",
                            validators: {
                                options: {
                                    options: ["yes"]
                                }
                            },
                            annotations: {
                                inputOptionLabels: {
                                    yes: "I want my email inbox filled with spam"
                                },
                                inputType: "multiselect-checkboxes"
                            },
                            required: false,
                            readOnly: false
                        } satisfies Attribute
                    }
                }
            }}
        />
    )
};
*/

/*
export const WithEmailAsUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationEmailAsUsername: true
                },
                profile: {
                    attributesByName: {
                        username: undefined
                    }
                }
            }}
        />
    )
};
*/

/*
export const WithRecaptchaFrench: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                locale: {
                    currentLanguageTag: "fr"
                },
                scripts: ["https://www.google.com/recaptcha/api.js?hl=fr"],
                recaptchaRequired: true,
                recaptchaSiteKey: "6LfQHvApAAAAAE73SYTd5vS0lB1Xr7zdiQ-6iBVa"
            }}
        />
    )
};
*/

/*
export const WithReadOnlyFields: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: { value: "johndoe", readOnly: true },
                        email: { value: "jhon.doe@gmail.com", readOnly: false }
                    }
                }
            }}
        />
    )
};
*/

/*
export const WithAutoGeneratedUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: { value: "autogenerated_username" }
                    }
                }
            }}
        />
    )
};
*/
