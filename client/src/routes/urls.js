const BASE_URL = "http://localhost:3000/"

const SIGN_UP_URL = BASE_URL + "user/signup";
const LOGIN_URL = BASE_URL + "user/login"
const LOGOUT_URL = BASE_URL + "user/logout"
const CHECK_CONNECTION_URL = BASE_URL + "user/checkConnection"
const SHOW_ALL_CONNECTIONS_URL = BASE_URL + "user/showAllConnections"
const END_CONNECTION_URL = BASE_URL + "user/endConnection"
const END_ALL_CONNECTION_URL = BASE_URL + "user/endAllConnections"


export {
    BASE_URL as default,
    SIGN_UP_URL,
    LOGIN_URL,
    LOGOUT_URL,
    CHECK_CONNECTION_URL,
    SHOW_ALL_CONNECTIONS_URL,
    END_CONNECTION_URL,
    END_ALL_CONNECTION_URL
}

