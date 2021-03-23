/**
 * global constants
 */
window.CurrentUser = {
    userId: '',
    email: '',
    ethAddress: '',
    token: ''
};

window.constants = {
    LANGUAGE_EN: "EN",
    LANGUAGE_CN: "CN",
    LANGUAGE_KEY: "languageKey",
    CURRENT_USER: "CurrentWebUser",
    PUBLISH_KEY: "pk_live_AW415Ndh9ZSP3wN5Uhqf1vp3008fvaIYhP"
};

window.downloads = {
    Android: 'https://www.callpanda.net/releases/squirrel-release-1.0.0-108.apk',
    TestFlight: 'https://testflight.apple.com/join/OwwczVyR',
    AppStore: 'https://apps.apple.com/us/app/squirrelvpn/id1480069733',
    Windows: 'https://www.callpanda.net/releases/SquirrelVPN-Win-1.0.0-109-x64-release.exe',
    MacOS: 'https://www.callpanda.net/releases/SquirrelVPN-Mac-1.0.0-109-x64-release.dmg',
    Linux: 'https://www.callpanda.net/releases/SquirrelVPN-Linux-1.0.0-109-x64-release.AppImage'
};

window.products = {
    month: {
        key: "month",
        id: 10001,
        days: 30,
        month: 1,
        monthText: "1 Month",
        monthTextCN: "购买1个月",
        price: 6.99,
        amount: 6.99
    },
    half_year: {
        key: "half_year",
        id: 10002,
        days: 180,
        month: 6,
        monthText: "6 Months",
        monthTextCN: "购买6个月",
        price: 5.99,
        amount: 35.99
    },
    year: {
        key: "year",
        id: 10003,
        days: 365,
        month: 12,
        monthText: "12 Months",
        monthTextCN: "购买12个月",
        price: 4.99,
        amount: 59.99
    }
};
