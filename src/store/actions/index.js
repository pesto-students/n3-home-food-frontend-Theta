export const setAsAdminLoggedIn = () => ({
    type: 'ADMIN_LOGGED',
    value: true
});
export const setAsAdminLoggedOut = () => ({
    type: 'ADMIN_LOGGED',
    value: false
});
export const setLogInAdminInfo = (value) => ({
    type: 'ADMIN_LOGIN',
    value
});

