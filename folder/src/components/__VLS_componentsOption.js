/* __placeholder__ */
//   import { auth, googleProvider } from "../firebase"; // Підключення Firebase
export default (await import('vue')).defineComponent({
name: 'LoginPage',
data() {
return {
form: {
username: '',
password: ''
}
};
},
// methods: {
//   handleSubmit() {
//     // Обробка звичайного входу через форму
//     console.log('Form submitted:', this.form);
//   },
//   signInWithGoogle() {
//     // Вхід через Google
//     auth.signInWithPopup(googleProvider)
//       .then((result) => {
//         console.log("User signed in: ", result.user);
//         // Додайте сюди редірект після успішного входу, якщо необхідно
//       })
//       .catch((error) => {
//         console.error("Error signing in with Google: ", error);
//       });
//   }
// }
});
const __VLS_componentsOption = {};
const __VLS_name = 'LoginPage' as const;
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {} &
{ 'google-login-button'?: boolean; } &
{ 'google-login-button'?: boolean; };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'RouterLink', typeof __VLS_localComponents, "RouterLink", "RouterLink", "RouterLink">;
__VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
__VLS_components.RouterLink; __VLS_components.RouterLink;
// @ts-ignore
[RouterLink, RouterLink,];
__VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1;
__VLS_intrinsicElements.form; __VLS_intrinsicElements.form;
__VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label; __VLS_intrinsicElements.label;
__VLS_intrinsicElements.input; __VLS_intrinsicElements.input;
__VLS_intrinsicElements.button; __VLS_intrinsicElements.button; __VLS_intrinsicElements.button; __VLS_intrinsicElements.button;
{
const __VLS_0 = __VLS_intrinsicElements["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{}, class: ("login-page"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("login-page"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = __VLS_intrinsicElements["div"];
const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
const __VLS_7 = __VLS_6({ ...{}, class: ("battonBack"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, class: ("battonBack"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = ({} as 'RouterLink' extends keyof typeof __VLS_ctx ? { 'RouterLink': typeof __VLS_ctx.RouterLink; } : typeof __VLS_resolvedLocalAndGlobalComponents).RouterLink;
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({ ...{}, to: ("/"), class: ("Accept"), }));
({} as { RouterLink: typeof __VLS_10; }).RouterLink;
({} as { RouterLink: typeof __VLS_10; }).RouterLink;
const __VLS_12 = __VLS_11({ ...{}, to: ("/"), class: ("Accept"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, to: ("/"), class: ("Accept"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
(__VLS_ctx.$t('back'));
(__VLS_13.slots!).default;
}
(__VLS_8.slots!).default;
}
{
const __VLS_15 = __VLS_intrinsicElements["h1"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
const __VLS_17 = __VLS_16({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
(__VLS_ctx.$t('login'));
(__VLS_18.slots!).default;
}
{
const __VLS_20 = __VLS_intrinsicElements["form"];
const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
const __VLS_22 = __VLS_21({ ...{ onSubmit: {} as any, }, class: ("login-form"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{ onSubmit: {} as any, }, class: ("login-form"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
let __VLS_25 = { 'submit': __VLS_pickEvent(__VLS_24['submit'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_21, typeof __VLS_22>).onSubmit) };
__VLS_25 = { submit: (__VLS_ctx.handleSubmit) };
{
const __VLS_26 = __VLS_intrinsicElements["div"];
const __VLS_27 = __VLS_elementAsFunctionalComponent(__VLS_26);
const __VLS_28 = __VLS_27({ ...{}, class: ("form-group"), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_26, typeof __VLS_28> & Record<string, unknown>) => void)({ ...{}, class: ("form-group"), });
const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28)!;
let __VLS_30!: __VLS_NormalizeEmits<typeof __VLS_29.emit>;
{
const __VLS_31 = __VLS_intrinsicElements["label"];
const __VLS_32 = __VLS_elementAsFunctionalComponent(__VLS_31);
const __VLS_33 = __VLS_32({ ...{}, for: ("username"), }, ...__VLS_functionalComponentArgsRest(__VLS_32));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_31, typeof __VLS_33> & Record<string, unknown>) => void)({ ...{}, for: ("username"), });
const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33)!;
let __VLS_35!: __VLS_NormalizeEmits<typeof __VLS_34.emit>;
(__VLS_ctx.$t('username'));
(__VLS_34.slots!).default;
}
{
const __VLS_36 = __VLS_intrinsicElements["input"];
const __VLS_37 = __VLS_elementAsFunctionalComponent(__VLS_36);
const __VLS_38 = __VLS_37({ ...{}, type: ("text"), id: ("username"), value: ((__VLS_ctx.form.username)), required: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_36, typeof __VLS_38> & Record<string, unknown>) => void)({ ...{}, type: ("text"), id: ("username"), value: ((__VLS_ctx.form.username)), required: (true), });
const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38)!;
let __VLS_40!: __VLS_NormalizeEmits<typeof __VLS_39.emit>;
}
(__VLS_29.slots!).default;
}
{
const __VLS_41 = __VLS_intrinsicElements["div"];
const __VLS_42 = __VLS_elementAsFunctionalComponent(__VLS_41);
const __VLS_43 = __VLS_42({ ...{}, class: ("form-group"), }, ...__VLS_functionalComponentArgsRest(__VLS_42));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_41, typeof __VLS_43> & Record<string, unknown>) => void)({ ...{}, class: ("form-group"), });
const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43)!;
let __VLS_45!: __VLS_NormalizeEmits<typeof __VLS_44.emit>;
{
const __VLS_46 = __VLS_intrinsicElements["label"];
const __VLS_47 = __VLS_elementAsFunctionalComponent(__VLS_46);
const __VLS_48 = __VLS_47({ ...{}, for: ("password"), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_46, typeof __VLS_48> & Record<string, unknown>) => void)({ ...{}, for: ("password"), });
const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48)!;
let __VLS_50!: __VLS_NormalizeEmits<typeof __VLS_49.emit>;
(__VLS_ctx.$t('password'));
(__VLS_49.slots!).default;
}
{
const __VLS_51 = __VLS_intrinsicElements["input"];
const __VLS_52 = __VLS_elementAsFunctionalComponent(__VLS_51);
const __VLS_53 = __VLS_52({ ...{}, type: ("password"), id: ("password"), required: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_51, typeof __VLS_53> & Record<string, unknown>) => void)({ ...{}, type: ("password"), id: ("password"), required: (true), });
const __VLS_54 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53)!;
let __VLS_55!: __VLS_NormalizeEmits<typeof __VLS_54.emit>;
(__VLS_ctx.form.password);
}
(__VLS_44.slots!).default;
}
{
const __VLS_56 = __VLS_intrinsicElements["button"];
const __VLS_57 = __VLS_elementAsFunctionalComponent(__VLS_56);
const __VLS_58 = __VLS_57({ ...{}, type: ("submit"), class: ("submit-button"), }, ...__VLS_functionalComponentArgsRest(__VLS_57));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_56, typeof __VLS_58> & Record<string, unknown>) => void)({ ...{}, type: ("submit"), class: ("submit-button"), });
const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58)!;
let __VLS_60!: __VLS_NormalizeEmits<typeof __VLS_59.emit>;
(__VLS_ctx.$t('login'));
(__VLS_59.slots!).default;
}
(__VLS_23.slots!).default;
}
{
const __VLS_61 = __VLS_intrinsicElements["button"];
const __VLS_62 = __VLS_elementAsFunctionalComponent(__VLS_61);
const __VLS_63 = __VLS_62({ ...{ onClick: {} as any, }, class: ("google-login-button"), }, ...__VLS_functionalComponentArgsRest(__VLS_62));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_61, typeof __VLS_63> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, class: ("google-login-button"), });
const __VLS_64 = __VLS_pickFunctionalComponentCtx(__VLS_61, __VLS_63)!;
let __VLS_65!: __VLS_NormalizeEmits<typeof __VLS_64.emit>;
let __VLS_66 = { 'click': __VLS_pickEvent(__VLS_65['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_62, typeof __VLS_63>).onClick) };
__VLS_66 = { click: (__VLS_ctx.signInWithGoogle) };
(__VLS_64.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["login-page"];
__VLS_styleScopedClasses["battonBack"];
__VLS_styleScopedClasses["Accept"];
__VLS_styleScopedClasses["login-form"];
__VLS_styleScopedClasses["form-group"];
__VLS_styleScopedClasses["form-group"];
__VLS_styleScopedClasses["submit-button"];
__VLS_styleScopedClasses["google-login-button"];
}
var __VLS_slots!: {};
// @ts-ignore
[$t, $t, handleSubmit, $t, form, form, $t, form, $t, signInWithGoogle,];
return __VLS_slots;
}
let __VLS_internalComponent!: typeof import('./LoginPage.vue')['default'];
