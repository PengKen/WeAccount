import {API_URL, DEVICE_INFO} from "./constant";
import Toast from 'react-native-root-toast';
import {SmallClose} from "../icons/common";
import { Text } from 'react-native';
import React from 'react'
import Loading from "../components/Loading";
// Add a Toast on screen.

export default class HttpUtil {
    static fetch(url,method='GET',data) {
        var options = {

            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'Authorization': DEVICE_INFO.UniqueID, //将uniqueID作为认证token
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Ip-Address': DEVICE_INFO.IPAddress,
                'Device-System': DEVICE_INFO.PhoneBrand + " " + DEVICE_INFO.SystemVersion //品牌和系统版本
            },
            method , // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        }

        /**
         * POST、DELETE、PUT请求要添加body
         */

        if(method != 'GET'){
            options.body =  JSON.stringify(data) // must match 'Content-Type' header
        }
        let toast = Toast.show(<Loading showLoading={true} />, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            shadowColor:'#2C2424',
        });
        return new Promise((resolve, reject) => {
            /**
             * 一个Promise中只能有一个resolve或者一个reject，
             * 所以要么10s后超时，要么10s内请求到数据(超时)
             */
            setTimeout(function () {
                resolve({errorMessage:'请求超时'})
            },100000)
            fetch(API_URL + url, options)
                .then(response => {
                    /**
                     * 只要status不是200，response.ok 就是false，但是无论ok是false还是true，到下一个then的时候
                     * 都不会跳到reject去，所以当response.ok 不是true 的时候我们要手动处理请求异常的信息
                     */

                    return response.json()

                })
                .then(json => {
                    if(json.errorMessage){
                        let toast = Toast.show(json.errorMessage, {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        resolve()
                    }
                    else
                    resolve(json)
                })
                .catch(error => {
                    /**
                     * 一般到这里的error都是因为网络的问题
                     */
                    let toast = Toast.show(<Text>网络异常，请检查网络后重试检查后仍无效，请联系管理员</Text>, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                        shadowColor:'#2C2424',
                    });

                    console.warn('There has been a problem with your fetch operation: ');
                })
        })

    }
}