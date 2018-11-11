/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2018/3/9.
 */

const { session } = require('electron')

function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function getUUID (prefix) {
  return ((prefix || '') + S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

const _getCookies = function (opts) {
  return new Promise((resolve, reject) => {
    let _queryOpts = {}
    if (opts) {
      let _url = opts.url || ''
      let _name = opts.name || ''
      if (_url !== '') {
        _queryOpts['url'] = _url
      }
      if (_name !== '') {
        _queryOpts['name'] = _name
      }
    }
    session.defaultSession.cookies.get(_queryOpts, (error, cookies) => {
      if (error) {
        reject(error)
      } else {
        console.log('....... get cookies: ', cookies)
        resolve(cookies)
      }
    })
  }).catch(error => {
    console.log('get cookie error: ', error.message)
    return error.message
  })
}

const _setCookies = function (opts) {
  return new Promise((resolve, reject) => {
    if (!opts) {
      reject(new Error('cookie不能为空'))
    } else {
      session.defaultSession.cookies.set(opts, error => {
        console.log('>>>>>>>>>>>', error)
        if (error) {
          reject(error)
        } else {
          resolve(true)
        }
      })
    }
  }).catch(error => {
    console.log('....error: ', error.message)
    return false
  })
}

let _cookies = {
  get: _getCookies,
  set: _setCookies
}

export default {
  cookies: _cookies,
  getUUID: getUUID
}
