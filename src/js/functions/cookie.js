import Cookies from "js-cookie"
import * as TF from "./functions.js"

function setCookie(name, value) {
   Cookies.set(name, value, { expires: 7 })
   TF.logger('Cookie set', 'success')
}

function getCookie(name) {
   const cookieValue = Cookies.get(name)
   TF.logger(`Cookie get ${cookieValue}`, 'success')
}

function removeCookie(name) {
   Cookies.remove(name)
   TF.logger(`Cookie removed ${name}`, 'success')
}

setCookie('TestCookieKey', 'TestCookieValue')
